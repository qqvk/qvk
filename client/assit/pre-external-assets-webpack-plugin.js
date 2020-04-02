module.exports = class InjectExternalsPlugin {

  constructor(externals, spalib) {
    this.externals = externals
    this.spalib = spalib
  }

  apply(compiler) {
    // console.log(compiler.options)

    compiler.plugin('compilation', compilation => {
      // 修改注入模板的script和link标签,
      compilation.plugin('html-webpack-plugin-alter-asset-tags', async (data, cb) => {

        // console.log(2222, data.plugin)

        const templateName = data.plugin.childCompilationOutputName
        // 排除特殊模板（如：editor_simplemde_ssr）
        const exception = this.externals.exception

        for (let i = 0; i < exception.length; i++) {
          if (templateName.indexOf(exception[i]) > -1) {
            cb(null, data)
            return
          }
        }

        // 共有资源
        const share = this.externals.share
        // SPA或SSR专有资源
        const proprietary = this.externals.proprietary
        const specifics = []
        proprietary.forEach(item => {
          // 排除非SSR和SPA模板，命名要约束
          if (item.match.test(templateName)){
            let assets = []
            const libsObj = item.libs

            // console.log(444, libsObj, item, templateName)
            if(libsObj) {
              const libsArray = Object.keys(libsObj)
              assets = libsObj[libsArray.find(lib => templateName.indexOf(lib) > 0)].assets
            } else {
              assets = item.assets
            }
            specifics.push(...assets)
          }
        })
        let assets = [...share, ...specifics]

        const injectObj = this.createAssetTags(assets)

        // inject externals always be put on the top
        data.head = injectObj.head.concat(data.head)
        // console.log(data.body)
        data.body = injectObj.body.concat(data.body)
        // console.log(data.body)
        cb(null, data)
      })
    })
  }

  createAssetTags(assets) {
    const head = []
    const body = []

    assets.forEach(url => {

      if (/\.js$/.test(url))
        body.push({
          tagName: 'script',
          closeTag: true,
          attributes: {
            type: 'text/javascript',
            src: url
          }
        })
      if (/\.css$/.test(url))
        head.push({
          tagName: 'link',
          selfClosingTag: false,
          attributes: {
            href: url,
            rel: 'stylesheet'
          }
        })
    })

    return { head, body }
  }
}
