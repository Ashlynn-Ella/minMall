
import vueRouter from 'vue-router'
import Home from './pages/home.vue'
import Index from './pages/index.vue'
import Detail from './pages/detail'
import Order from './pages/order'
import OrderConfirm from './pages/orderConfirm'
import Cart from './pages/cart'
import OrderList from './pages/orderList'
import Product from './pages/product'
import Login from './pages/login'


var router = new vueRouter({
    routes: [
        { path: '/', redirect: '/index' },
        {
            path: '/',
            component: Home,
            children: [
                { path: 'index', component: Index },
                { path:'/product/:id', component: Product },
                { path: 'detail', component: Detail }
            ]
        },
        { 
            path: '/order', 
            component: Order,
            children:[
                { path: 'confirm', component: OrderConfirm },
                { path: 'list', component: OrderList },
            ]
        },       
        { path:'/cart', component: Cart },
        { path:'/login', component: Login }
    ]
})

export default router