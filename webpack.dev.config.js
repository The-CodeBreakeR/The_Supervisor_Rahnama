var webpack = require('webpack')
var config = require('./webpack.base.config')
var BundleTracker = require('webpack-bundle-tracker')

config.entry = [
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server',
].concat(config.entry)

config.output.publicPath = 'http://localhost:3000/client/bundles/'

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new BundleTracker({filename: './webpack-stats.json'}),
])

config.module.rules[0].use = [{ loader: 'react-hot-loader' }].concat(
  config.module.rules[0].use
)

config.devServer = {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  compress: true,
  historyApiFallback: true,
  disableHostCheck: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
  }
}

module.exports = config
