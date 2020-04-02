const { SPA } = require('../../../client/src/webpack_entries.js')
const spaControllers = SPA.map(item => `${item.lib}_${item.entry}`)

module.exports = class extends think.Controller {
  isDev() {
    return think.env === 'development'; 
  }

  async __before() {
    this.ctx.set({'Access-Control-Allow-Origin': '*','Access-Control-Allow-Headers': 'Content-Type'})
    if(this.ctx.method ==='OPTIONS') this.ctx.status = 204
    // this.session()
  }

  __after() {
    return this.display('error/404')
    this.ctx.throw(404);
  }

  // 当解析后的URL对应的控制器存在，但Action不存在时调用
  async __call() {
    const controller = this.ctx.url.split("/")[1];
    
    const validController = spaControllers.find(item => {
      // item === svelte_appname/vue_appname
      return item.split('_')[1] === controller
    })
    // console.log(validController)
    if (validController) {
      return this.display(`spa_${validController}`);
    }
  }
};
