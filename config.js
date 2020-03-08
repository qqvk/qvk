const fs = require('fs')
const glob = require('glob')
const spaControllers = []
glob('./client/src/spa_*', (err, matchs) => {
  if(!err) {
    const spaControllers = matchs.map(path => {
      return path.split('spa_')[1]
    })
    const json = `module.exports = ${JSON.stringify(spaControllers)}`
    fs.writeFileSync(__dirname + '/server/src/config/spaControllers.js', json)
  }
})