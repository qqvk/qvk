const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProvidePlugin = require('webpack/lib/ProvidePlugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')

// const OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin')

// const entry = {
//   vender: ['lodash','jquery']
// }
const entry = {}
const chunks = []
const HtmlTemplates = []

// 根据js文件自动生成entry、chunks及HtmlWebpackPlugins
// package.json-path-based
// glob.sync('./src/editor_index.js').forEach(path=>{
glob.sync('./src/*.js').forEach(path=>{
// glob.sync('./src/article_list_ssr.js').forEach(path=>{
// glob.sync('./src/*detail_ssr.js').forEach(path=>{
  const filename = path.split('/src/')[1].split('.js')[0]
  const ifSSR = filename.indexOf('spa') < 0
  
  // 仅对SSR入口提取公共JS和CSS代码
  if (ifSSR) chunks.push(filename)
  
  // fill out entry object
  entry[filename] = `./src/${filename}.js` //  package.json-path-based
  
  // 如果模板不是Vue模板，而是ThinkJS服务端渲染的模板
  const templatePath = ifSSR ? '_templates_ssr' : filename

  // console.log(filename, templatePath)
  // create multiple instances of HtmlWebpackPlugin
  HtmlTemplates.push(new HtmlWebpackPlugin({
    title: filename,
    template: `html-loader!./src/${templatePath}/${filename}.njk`, // current-config-file-path(conf)-based
    filename: `../../view/${filename}.html`,  // current-config-file-path(conf)-based
    // chunks: ['vender','base',filename],
    // 仅对SSR页面注入公共JS和CSS代码
    chunks: ifSSR ? ['commons', filename] : [filename],
    // chunks: [filename],
    // hash: true,
    // favicon: './src/_assets/favicon.png',  // package.json-path-based 
    chunksSortMode: 'dependency',
    alwaysWriteToDisk: true
  }))
})

const HtmlTemplatesIncs = []
// 仅生成模板包含文件
// glob.sync('./src/_templates_ssr/base/article_channels.html').forEach(path=>{
glob.sync('./src/_templates_ssr/**/*.html').forEach(path=>{
  // path = path.slice(path.indexOf('_ssr/')+5)
  // const subdir = path.split('/')[0]
  // const filename = path.split('/')[1].split('.html')[0]
  path = path.slice(path.indexOf('_ssr/')+5)
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
    template: `html-loader!./src/_templates_ssr/${subdir}/${filename}.html`, // current-config-file-path(conf)-based
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
              options: {}
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
    extensions: ['.js','.json','.vue','.css','.scss','.njk'],
    // alias: {
    //   vue: 'vue/dist/vue.js'
    // }
  },
  externals: {
    jquery: 'jQuery',
    vue: 'Vue',
    vuex: 'Vuex',
    vuetify: 'Vuetify',
    uikit: 'UIkit'
  }
}
