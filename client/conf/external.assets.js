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
        assets: [
          "//lib.baomitu.com/vue/2.5.13/vue.js",
          "//lib.baomitu.com/vuex/3.1.2/vuex.js"
        ]
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
        assets: [
          "//lib.baomitu.com/vue/2.5.13/vue.min.js",
          "//lib.baomitu.com/vuex/3.1.2/vuex.min.js"
        ]
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
