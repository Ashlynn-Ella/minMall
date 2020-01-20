import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vueRouter from 'vue-router'
import vueCookie from 'vue-cookie'
import router from './router.js'
import App from './App.vue'
import store from './store'
import VueLazyload from 'vue-lazyload'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' 
// import env from './env'

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000
// axios.defaults.baseURL = env.baseURL
axios.interceptors.response.use(function (response) {
  const res = response.data
  if(res.status === 0){
    return res.data
  } else if (res.status === 10){
    if(location.hash !== '#/index'){
      window.location.href = '/#/login'
      return Promise.reject()
    } 
  } else {
    this.$message.error(res.msg)
    return Promise.reject() //抛出异常
  }
})
//过滤器
Vue.filter('currency',function(vul) {
  if(!vul) return '0.00'
      return `￥${vul.toFixed(2)}元`
})

Vue.prototype.$message = Message
Vue.use(vueRouter)
Vue.use(vueCookie)
Vue.use(VueAxios,axios)
Vue.use(VueLazyload,{
  loading: '/imgs/loading-svg/loading-bubbles.svg'
})
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
