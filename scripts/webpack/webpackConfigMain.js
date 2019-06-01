require('dotenv').config()

const path = require('path')
const webpack = require('webpack')
const LodashPlugin = require('lodash-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const nodeExternals = require('webpack-node-externals')

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
    NODE_ENV: env.isDev ? 'development' : 'production',
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    DEBUG_PROD: process.env.DEBUG_PROD || false,
    START_MINIMIZED: process.env.START_MINIMIZED || false
  }),
  new BundleAnalyzerPlugin({
    analyzerMode:
      process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
    openAnalyzer: process.env.OPEN_ANALYZER === 'true'
  }),
  new webpack.NamedModulesPlugin()
)

const webpackConfig = {
  externals: [nodeExternals()],
  mode: env.isDev ? 'development' : 'production',
  target: 'electron-main',
  devtool: env.isDev ? 'inline-source-map' : 'source-map',
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
      paths.rootPath,
      paths.mainPath
    ],
    alias: {
      shared: paths.sharedPath
    }
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
