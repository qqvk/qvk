const merge = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  devtool: "source-map",
  devServer: {
    proxy: {
      '*': 'http://127.0.0.1:8900'
    },
    watchContentBase: true,
    port: 9090,
    host: 'localhost'
  }
});
