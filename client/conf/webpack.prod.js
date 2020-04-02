const path = require('path');
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
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
    new HashedModuleIdsPlugin(), // keep bundle hash no change
  ]
})
