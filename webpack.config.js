/**
 * Created by meathill on 2017/7/18.
 */

const path = require('path');

module.exports = {
  context: path.resolve(__dirname, './app'),
  entry: {
    'main': './main.js'
  },
  output: {
    path: path.resolve(__dirname, './js'),
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    poll: 1000,
    ignored: /node_modules|styl|docs|css|img/
  }
};