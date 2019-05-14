module.exports = {
  "plugins": {
    "precss": {},
    "autoprefixer": {},
    "postcss-px-to-viewport": {
      viewportWidth: 750,
      viewportHeight: 1334,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.usepixel'],
      minPixelValue: 1,
      mediaQuery: false
    }
  }
}