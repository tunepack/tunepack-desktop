require('dotenv').config()

const path = require('path')
const webpack = require('webpack')
const LodashPlugin = require('lodash-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const nodeExternals = require('webpack-node-externals')
const Dotenv = require('dotenv-webpack')

const paths = require('../utils/paths')
const env = require('../utils/env')

const rules = []

// babel
rules.push({
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  query: {
    cacheDirectory: env.isDev
  }
})

// .node
rules.push({
  test: /\.node$/,
  use: 'node-loader'
})

const plugins = []

plugins.push(
  new LodashPlugin(),
  new BundleAnalyzerPlugin({
    analyzerMode:
      process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
    openAnalyzer: process.env.OPEN_ANALYZER === 'true'
  }),
  new webpack.NamedModulesPlugin(),
  new Dotenv({
    safe: true,
    systemvars: true
  })
)

const webpackConfig = {
  externals: [nodeExternals()],
  mode: env.isDev ? 'development' : 'production',
  target: 'electron-main',
  devtool: 'source-map',
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
      paths.srcPath,
      paths.mainPath
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

export default webpackConfig
