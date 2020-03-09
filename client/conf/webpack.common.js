const fs = require('fs')
const os = require('os')
const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProvidePlugin = require('webpack/lib/ProvidePlugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')

const entry = {}
const chunks = []
const HtmlTemplates = []

const { SPA, SSR } = require('../src/webpack_entries.js')

// 处理SPA
SPA.forEach(({ entry: entryName = '' }) => {
  let entryFile = `./src/${entryName}/${entryName}.js`
  if (!fs.existsSync(entryFile)) entryFile = `./src/${entryName}/index.js`
  if (!fs.existsSync(entryFile)) entryFile = `./src/${entryName}/main.js`
  if (!fs.existsSync(entryFile)) entryFile = `./src/${entryName}/app.js`
  if (!fs.existsSync(entryFile)) entryFile = `./src/${entryName}/entry.js`
  if (!fs.existsSync(entryFile)) 
    throw new Error(`No entry file found in './src/${entryName}', that's could be either '${entryName}.js', 'index.js', 'main.js', 'app.js' or just 'entry.js'. `)

  entry[entryName] = entryFile
  const templatePath = entryName
  let templateFile = `./src/${templatePath}/${entryName}.njk`
  // 没有模板则使用默认模板
  if (!fs.existsSync(templateFile)) templateFile = `./src/templates/default.njk`

  HtmlTemplates.push(new HtmlWebpackPlugin({
    title: entryName,
    template: `html-loader!${templateFile}`,
    filename: `../../view/spa_${entryName}.html`,
    chunks: [entryName],
    chunksSortMode: 'dependency',
    alwaysWriteToDisk: true
  }))
})
// 处理SSR
SSR.forEach(({ entry: entryName = '', dependencies = {} }) => {
  // 仅对SSR入口提取公共JS和CSS代码
  chunks.push(entryName)
  let entryConfig
  const hasNoDependence = Object.keys(dependencies).length === 0
  // 没有依赖
  if (hasNoDependence) {
    // Webpack entry不支持空字符串，只支持文件，因此临时创建空文件
    const tempFile = `${os.tmpdir()}/${entryName}.js`
    fs.writeFileSync(tempFile, '')
    entryConfig = tempFile
  } else {
    entryConfig = Object.keys(dependencies).reduce((pre, type) => {
      const files = dependencies[type].map(file => `STATIC/${type}/${file}`)
      pre = pre.concat(files)
      return pre
    }, [])
  }
  entry[entryName] = entryConfig

  const templatePath = 'templates'
  let templateFile = `./src/${templatePath}/${entryName}.njk`
  // 没有模板则使用默认模板
  if (!fs.existsSync(templateFile)) templateFile = `./src/templates/default.njk`

  HtmlTemplates.push(new HtmlWebpackPlugin({
    title: entryName,
    template: `html-loader!${templateFile}`, 
    filename: `../../view/${entryName}.html`, 
    chunks: ['commons', entryName],
    chunksSortMode: 'dependency',
    alwaysWriteToDisk: true
  }))
})

console.log(entry)

const HtmlTemplatesIncs = []
// 仅生成模板包含文件
glob.sync('./src/templates/**/*.html').forEach(path => {
  path = path.slice(path.indexOf('templates/') + 10)
  const unresolvedPath = path.split('/')
  let subdir
  let filename
  // 如果包含文件目录分两级
  if (unresolvedPath.length > 2) {
    subdir = unresolvedPath[0] + '/' + unresolvedPath[1]
    filename = unresolvedPath[2].split('.')[0]
  } else {
    subdir = unresolvedPath[0]
    filename = unresolvedPath[1].split('.')[0]
  }

  HtmlTemplatesIncs.push(new HtmlWebpackPlugin({
    template: `html-loader!./src/templates/${subdir}/${filename}.html`, // current-config-file-path(conf)-based
    filename: `../../view/${subdir}/${filename}.html`,  // current-config-file-path(conf)-based
    inject: false,
    chunks: [],
    alwaysWriteToDisk: true
  }))
})

// console.log(entry)

// console.log(HtmlTemplatesIncs)
module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true,
          transformToRequire: {
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: './assit/cache'
        }
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name]_[hash:4].[ext]'
          // name (file) {
          //   // if (env === 'development') {
          //   //   return 'img/[path][name].[ext]'
          //   // }
          //   console.log('**********', file, path)

          //   return 'img/[hash].[ext]'
          // }
        }
      },
      // {
      //   test: /\.(png|gif|jpe?g|svg)$/,
      //   loader: 'url-loader',
      //   options: {

      //   }
      // },
      {
        test: /\.(otf|eot|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
        options: {
          name: 'font/[name]_[hash:4].[ext]'
        }
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader', // translate css into CommonJS modules
            {
              loader: 'postcss-loader',
              options: {
                // postcss plugins config have moved to .postcssrc.js
              }
            }, // Run post css actions
            {
              loader: 'sass-loader',
              options: {
                // current-config-file-path(conf)-based
                // includePaths: [
                //   path.resolve(__dirname, '../node_modules/'),
                //   path.resolve(__dirname, '../node_modules/bootstrap/scss/')
                // ] 
              }
            } // compile SASS to CSS
          ],
          fallback: 'style-loader' // fallback: write css to html, in case ExtractTextPlugin fails
        })
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'stylus-loader'],
          fallback: 'style-loader' // fallback: write css to html, in case ExtractTextPlugin fails
        })
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '../../server/www/static'),
    filename: 'js/[name]_[chunkhash:4].js',
    chunkFilename: 'js/[name]_[chunkhash:4].js',
    publicPath: '/static/'
  },
  plugins: [
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      // Popper: ['popper.js', 'default']
    }),
    // used in conjunction with HTMLWebpackPlugin's option "alwaysWriteToDisk: true"
    // to ensure the changes to templates always could be reflected on page reloading
    new HtmlWebpackHarddiskPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name]_[chunkhash:4].css',
      // disable:true
    }), // 提取CSS文件
    new CommonsChunkPlugin({
      name: "commons",
      chunks,
      minChunks: 3,
      // minChunks: chunks.length
    }), // 提取公共的JS和CSS
    // new CommonsChunkPlugin({
    //     name: "vender"
    // }), // 提取vender对应的第三方库
    ...HtmlTemplates, // 把CSS和JS写入模板文件
    ...HtmlTemplatesIncs, // 生成模板包含文件
  ],
  resolve: {
    extensions: ['.js', '.json', '.vue', '.css', '.scss', '.njk'],
    alias: {
      STATIC: path.resolve(__dirname, '../src/_static'),
      ASSETS: path.resolve(__dirname, '../src/_assets')
    }
  },
  externals: {
    jquery: 'jQuery',
    vue: 'Vue',
    vuex: 'Vuex',
    vuetify: 'Vuetify',
    uikit: 'UIkit'
  }
}
