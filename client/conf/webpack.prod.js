const path = require('path');
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin')
// const DefinePlugin = require('webpack/lib/DefinePlugin')

module.exports = merge(common, {
  plugins: [
    new CleanWebpackPlugin(
      [
        'www/static/*',
        'view/*'
      ],
      {
        root: path.resolve(__dirname,'../../server'),
        // exclude: ['base', 'error'],
        verbose: true,
        dry: false
      }
    ), // 删除重新生成
    new UglifyJSPlugin({
      compress: {
        warnings: false
      }
    }), // 如果有CDN压缩，可禁止Webpack本地压缩JS
    new HashedModuleIdsPlugin(), // keep bundle hash no change
  ]
})
