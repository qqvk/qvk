const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = merge(common, {
  devServer: {
    proxy: {
      '*': 'http://127.0.0.1:8900'
    },
    watchContentBase: true,
    port: 9090,
    host: 'localhost'
  }
});
