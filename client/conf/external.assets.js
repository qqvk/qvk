const SSR = /^((?!spa).)*$/;
const SPA = /spa/;
const EXCEPTION = ["editor_simplemde_ssr", "editor_index"];

const assets = {
  development: {
    exception: EXCEPTION,
    share: ["//lib.baomitu.com/jquery/3.3.0/jquery.min.js"],
    proprietary: [
      {
        match: SPA,
        libs: {
          vue: {
            assets: [
              "//lib.baomitu.com/vue/2.5.13/vue.js",
              "//lib.baomitu.com/vuex/3.1.2/vuex.js"
            ]
          },
          svelte: {
            assets: []
          },
          react: {
            assets: [
              "https://lib.baomitu.com/react/16.12.0/umd/react.development.js",
              "https://lib.baomitu.com/react-dom/16.11.0/umd/react-dom.development.js"
            ]
          }
        }
      },
      {
        match: SSR,
        assets: [
          // '//lib.baomitu.com/webfont/1.6.28/webfontloader.js'
        ]
      }
    ]
  },
  production: {
    exception: EXCEPTION,
    share: ["//lib.baomitu.com/jquery/3.3.0/jquery.min.js"],
    proprietary: [
      {
        match: SPA,
        libs: {
          vue: {
            assets: [
              "//lib.baomitu.com/vue/2.5.13/vue.min.js",
              "//lib.baomitu.com/vuex/3.1.2/vuex.min.js"
            ]
          },
          svelte: {
            assets: []
          },
          react: {
            assets: [
              "https://lib.baomitu.com/react/16.12.0/umd/react.production.min.js",
              "https://lib.baomitu.com/react-dom/16.11.0/umd/react-dom.production.min.js"
            ]
          }
        }
      },
      {
        match: SSR,
        assets: [
          // '//lib.baomitu.com/webfont/1.6.28/webfontloader.js'
        ]
      }
    ]
  }
};
module.exports = assets;
