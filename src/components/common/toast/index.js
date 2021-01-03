import Toast from "./Toast";

// 插件注册后会自动执行插件的install方法
export default {
  install(Vue) {
    // 创建组件构造器
    const toastConstructor = Vue.extend(Toast)
    // 使用组件构造器创建一个组件对象
    const toast = new toastConstructor()
    toast.$mount(document.createElement('div'))
    document.body.appendChild(toast.$el)
    Vue.prototype.$toast = toast
  }
}
