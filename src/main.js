import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vueRouter from 'vue-router'
import router from './router.js'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
// import env from './env'

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000
// axios.defaults.baseURL = env.baseURL
axios.interceptors.response.use(function (response) {
  const res = response.data
  if(res.status === 0){
    return res.data
  } else if (res.status === 10){
    window.location.href = '/#/login'
  } else {
    alert('res.msg')
  }
})
//过滤器
Vue.filter('currency',function(vul) {
  if(!vul) return '0.00'
      return `￥${vul.toFixed(2)}元`
})

Vue.use(vueRouter)
Vue.use(VueAxios,axios)
Vue.use(VueLazyload,{
  loading: '/imgs/loading-svg/loading-bubbles.svg'
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
