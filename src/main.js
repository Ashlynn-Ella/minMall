
import { createApp } from 'vue';
import axios from 'axios'
import router from './router.js'
import App from './App.vue'
import store from './store'
import Antd, { message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'


// import env from './env'

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000
// axios.defaults.baseURL = env.baseURL
axios.interceptors.response.use(function (response) {
  const res = response.data
  if (res.status === 0) {
    return res.data
  } else if (res.status === 10) {
    if (location.hash !== '#/index') {
      window.location.href = '/#/login'
      return Promise.reject()
    }
  } else {
    message.error(res.msg)
    return Promise.reject() //抛出异常
  }
}, (error) => {
  let res = error.response
  message.error(res.data.message)
  return Promise.reject()
})
const app = createApp(App)

app.config.globalProperties.$axios = axios
app.use(router).use(Antd).use(store).mount('#app')
