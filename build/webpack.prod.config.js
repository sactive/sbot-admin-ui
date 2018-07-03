const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');

// clean up plugins
webpackBaseConfig.plugins = [];

const publicPath = process.env.NODE_ENV === 'production' ? "/sbot/config/dist/" : "./";

module.exports = merge(webpackBaseConfig, {
  output: {
    publicPath: publicPath,
    filename: '[name].[hash].bundle.js'
  },
  plugins: [
    new UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[hash].bundle.css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new HtmlWebpackPlugin({
      filename: './index_prod.html',
      template: './index.ejs',
      inject: false
    })
  ]
});