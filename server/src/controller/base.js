const headlessControllers = ["api", "apple-touch-icon.png"];
const spaControllers = ["scene"];

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
    if (spaControllers.indexOf(controller) > -1) {
      return this.display(`${controller}_spa`);
    }
  }
};
