/**
 * Created by meathill on 2017/7/18.
 */

const config = require('./webpack.config');

config.devtool = config.watch = false;

module.exports = config;