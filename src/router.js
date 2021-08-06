
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './pages/home.vue'
import Index from './pages/index.vue'
// import Detail from './pages/detail'
// import Order from './pages/order'
// import OrderConfirm from './pages/orderConfirm'
// import Cart from './pages/cart'
// import OrderList from './pages/orderList'
// import OrderPay from './pages/orderPay'
// import Product from './pages/product'
import Login from './pages/login'
// import AliOrder from './pages/aliOrder'


var router = createRouter({
    history: createWebHashHistory(),

    routes: [
        // { path: '/', redirect: '/index' },
        {
            path: '/',
            component: Home,
            children: [
                { path: 'index', name:'index', component: Index },
            //     { path:'/products/:id', component: Product },
            //     { path: 'detail/:id', component: Detail }
            ]
        },
        // { 
        //     path: '/order',
        //     name: 'order', 
        //     component: Order,
        //     children:[
        //         { path: 'confirm', component: OrderConfirm },
        //         { path: 'list', component: OrderList },
        //         { path: 'pay', component: OrderPay },
        //         { path: 'alipay', component: AliOrder }
        //     ]
        // },       
        // { path:'/cart', component: Cart },
        { path:'/login', component: Login }
    ]
})

export default router