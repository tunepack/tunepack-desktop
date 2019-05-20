const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const LodashPlugin = require('lodash-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const SpritePlugin = require('svg-sprite-loader/plugin')
const { spawn } = require('child_process')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { injectGetFunction } = require('./utils/sassLoader')

const paths = require('../utils/paths')
const env = require('../utils/env')

const port = process.env.PORT || 1212
const config = require('../../src/main/config')

const rules = []

const getStyleLoaders = loaders => {
  return [
    env.isDev ? 'style-loader' : MiniCssExtractPlugin.loader
  ].concat(loaders)
}

// babel
rules.push({
  test: /\.js/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  query: {
    cacheDirectory: env.isDev
  }
})

// scss files (only in src)
rules.push({
  test: /\.scss/,
  include: paths.rendererPath,
  use: getStyleLoaders([
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        sourceMap: env.isDev,
        modules: true,
        localIdentName: env.isDev
          ? '[name]-[local]-[hash:base64:5]'
          : '[hash:base64:5]'
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: env.isDev,
        includePaths: [
          path.resolve(paths.rendererPath, 'styles')
        ],
        functions: injectGetFunction(config.stylingVariables)
      }
    }
  ])
})

// css files
rules.push({
  test: /\.css/,
  use: getStyleLoaders([
    {
      loader: 'css-loader',
      options: {
        sourceMap: env.isDev
      }
    }
  ])
})

// images
rules.push({
  test: /\.(ico|jpg|jpeg|png|gif)(\?.*)?$/,
  use: [
    {
      loader: 'file-loader',
      query: {
        name: env.isDev ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]'
      }
    }
  ]
})

// svgs
rules.push({
  test: /\.(svg)(\?.*)?$/,
  exclude: paths.iconsPath,
  use: [
    {
      loader: 'file-loader',
      query: {
        name: env.isDev ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]'
      }
    },
    {
      loader: 'svgo-loader',
      options: {
        plugins: [
          { removeTitle: true },
          { convertPathData: false },
          { removeUselessStrokeAndFill: true }
        ]
      }
    }
  ]
})

// svg icons
rules.push({
  test: /\.svg$/,
  include: paths.iconsPath,
  use: [
    {
      loader: 'svg-sprite-loader',
      options: {
        extract: true,
        spriteFilename: 'sprite-[hash:6].svg'
      }
    }
  ]
})

let plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(paths.rendererPath, 'index.html'),
    inject: true,
    minify: env.isProd ? {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true
    } : false
  }),
  new LodashPlugin(),
  new SpritePlugin(),
  new BundleAnalyzerPlugin({
    analyzerMode:
      process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
    openAnalyzer: process.env.OPEN_ANALYZER === 'true'
  })
]

if (env.isDev) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  )
}

if (env.isProd) {
  plugins.push(
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  )
}

const output = env.isDev ? {
  filename: 'renderer.js'
} : {
  path: paths.buildPath,
  publicPath: './',
  filename: 'renderer.js'
}

const entry = env.isDev ? [
  'react-hot-loader/patch',
  `webpack-dev-server/client?http://localhost:${port}/`,
  'webpack/hot/only-dev-server',
  require.resolve('../../src/renderer/index')
] : path.resolve(paths.rendererPath, 'index')

const webpackConfig = {
  mode: env.isDev ? 'development' : 'production',
  context: paths.rootPath,
  target: 'electron-renderer',
  devtool: env.isDev ? 'inline-source-map' : 'source-map',
  output,
  plugins,
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
        cache: true
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true
          }
        }
      })
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      paths.rendererPath
    ],
    descriptionFiles: [
      'package.json'
    ],
    extensions: [
      '.js',
      '.json'
    ]
  },
  entry,
  module: {
    rules
  },
  cache: env.isDev,
  stats: 'minimal',
  node: {
    __dirname: false,
    __filename: false
  }
}

if (env.isDev) {
  webpackConfig.devServer = {
    port: port,
    historyApiFallback: {
      verbose: true,
      disableDotRule: false
    },
    compress: true,
    hot: true,
    open: false,
    inline: true,
    lazy: false,
    stats: 'minimal',
    contentBase: paths.buildPath,
    before: () => {
      spawn('npm', [
        'run',
        'dev:main'
      ], {
        shell: true,
        env: process.env,
        stdio: 'inherit'
      })
        .on('close', code => {
          return process.exit(code)
        })
        .on('error', spawnError => {
          // eslint-disable-next-line no-console
          return console.error(spawnError)
        })
    }
  }
}

module.exports = webpackConfig
