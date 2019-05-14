const Base = require("./base.js");

module.exports = class extends Base {
 
  async indexAction() {
    return this.display()
  }
  pixelAction() {
    return this.display('pixel_demo')
  }
};