<template>
    <div>
        <order-header :title="title">
            <template v-slot:cart-point>
            {{tip}}    
            </template>       
        </order-header>
        <router-view></router-view>
        <service-bar></service-bar>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader'
import NavFooter from '../components/NavFooter'
import ServiceBar from '../components/ServiceBar'
export default {
    data(){
        return {
            title:'',
            tip:''
        }
    },
    components:{       
        NavFooter,
        ServiceBar,
        OrderHeader
    },   
    mounted(){
        let path = this.$route.path
        if(path == '/order/confirm'){
            this.title = "确认订单"
            this.tip = "请认真填写收货地址"
        } else if(path == '/order/list'){
            this.title = "订单列表"
            this.tip = "请谨防钓鱼链接或诈骗电话，了解更多>"
        } else if(path == '/order/pay'){
            this.title = "支付订单"
            this.tip = "请谨防钓鱼链接或诈骗电话，了解更多>"
        }
    }

}
</script>

<style lang="scss">
    
</style>