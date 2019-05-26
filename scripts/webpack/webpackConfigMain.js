const path = require('path')
const webpack = require('webpack')
const LodashPlugin = require('lodash-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const paths = require('../utils/paths')
const env = require('../utils/env')

const rules = []

// babel
rules.push({
  test: /\.js/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  query: {
    cacheDirectory: env.isDev
  }
})

rules.push({
  test: /\.node$/,
  use: 'node-loader'
})

const plugins = []

plugins.push(
  new LodashPlugin(),
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'production',
    DEBUG_PROD: false,
    START_MINIMIZED: false
  }),
  new BundleAnalyzerPlugin({
    analyzerMode:
      process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
    openAnalyzer: process.env.OPEN_ANALYZER === 'true'
  }),
  new webpack.NamedModulesPlugin()
)

const webpackConfig = {
  target: 'electron-main',
  mode: 'production',
  devtool: 'source-map',
  context: paths.rootPath,
  output: {
    path: paths.buildPath,
    filename: 'main.js'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
        cache: true
      })
    ]
  },
  entry: path.resolve(paths.mainPath, 'index.js'),
  plugins,
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

module.exports = webpackConfig
