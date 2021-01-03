import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

// 导入toast插件
import toast from "components/common/toast";
// 插件用来解决移动端300ms延迟
import Fastclick from 'fastclick'
// 图片懒加载
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
// 注册toast插件
Vue.use(toast)
// 注册懒加载图片 第二个参数是一个对象可以设置图片占位图
Vue.use(VueLazyload)

Fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

