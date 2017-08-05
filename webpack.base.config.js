var path = require('path')
var webpack = require('webpack')
var CopyPlugin = require('copy-webpack-plugin')
var LessPluginAutoPrefix = require('less-plugin-autoprefix')

module.exports = {
  context: __dirname,
  entry: [
    './client/src/index'
  ],

  output: {
    filename: '[name]-[hash].js',
  },

  plugins: [
    new CopyPlugin([
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react'],
            }
          }
        ],
      },
      {
        test: /(\.css)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ]
      },
      {
        test: /(\.less)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' } ,
          {
            loader: 'less-loader',
            options: {
              plugins: [
                new LessPluginAutoPrefix()
              ],
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg|gif)$/,
        use: {
          loader: 'url-loader',
          query: {
            publicPath: '/',
            limit: 1000,
            name: '[hash].[ext]',
          },
        },
      },
    ],
  },

  resolve: {
    alias: {
      '../../theme.config': path.resolve('./client/semantic-ui/theme.config'),
    },
  },
}
