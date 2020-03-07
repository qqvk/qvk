const PreExternalScriptsWebpackPlugin = require('../assit/pre-external-assets-webpack-plugin')
const externals = require('./external.assets').development
const merge = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  devServer: {
    proxy: {
      '*': 'http://127.0.0.1:8900'
    },
    watchContentBase: true,
    port: 9090,
    host: 'localhost'
  },
  plugins: [
    new PreExternalScriptsWebpackPlugin(externals)
  ]
});
