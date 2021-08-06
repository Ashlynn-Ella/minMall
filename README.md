# mall

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

https://lanhuapp.com/url/J2iye-6tC8M 蓝湖设计稿

# 模仿小米商城

## 1、目录结构分析



## 2、插件

```
vue-lazyload 
element-ui
node-sass sass-loader
vue-awesome-swiper //轮播图插件
vue-axios
vue-cookie
qrcode //二维码生成插件
```

## 3、封装路由

#### 3.1 根据 需求 和设计稿分析

* 复习路由

```js
npm i vue-router
import Vue from 'vue'
import vueRouter from 'vue-router'
Vue.use(vueRouter)
//路由
var router = new vueRouter({
    routes:[
        { path: '', component:}
    ]
})
 export default  router    
```

## 4、接口错误拦截

* 统一报错
* 未登录统一拦截
* 请求值、返回值统一处理

```js
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000
axios.interceptors.response.use(function (response) {
  const res = response.data
  if(res.status === 0){
    return res.data
  } else if (res.status === 10){
    window.loaction.href = '/#/login'
  } else {
    alert('res.msg')
  }
)
```



