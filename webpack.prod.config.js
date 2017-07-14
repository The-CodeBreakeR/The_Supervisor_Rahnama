var path = require('path')
var webpack = require('webpack')
var config = require('./webpack.base.config')
var BundleTracker = require('webpack-bundle-tracker')

config.output.path = path.resolve('./client/dist')
config.plugins = config.plugins.concat([
  new BundleTracker({filename: './webpack-stats-prod.json'}),
])

module.exports = config
