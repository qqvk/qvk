// 给每个Vue实例添加一个共享的bus，用于跨组件通信（传数据）
export default {
  install: (Vue) => {
    if (!Vue.prototype.bus) Vue.prototype.bus = new Vue()
  }
}
