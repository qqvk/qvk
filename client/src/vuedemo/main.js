import Vue from 'vue'
// import store from './lib/store'
// import router from './lib/router'
import Entry from './Entry.vue'
import busPlugin from 'ASSETS/busPlugin'

// 通过插件为所有Vue组件添加实例属性bus
Vue.use(busPlugin)
Vue.config.productionTip = false

new Vue({
//   store,
//   router,
  render: h => h(Entry)
}).$mount('#app')
