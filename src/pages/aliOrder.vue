<template>
    <div class="ali-order">
        <order-header title="支付订单">
            <template v-slot:cart-point>
                <span>请谨防钓鱼链接或诈骗电话，了解更多></span>    
            </template>       
        </order-header>
        <div class="form" v-html="content"></div>
        <Loading v-if="showLaoding"></Loading>
    </div>
</template>

<script>
import Loading from '../components/Loading'
import OrderHeader from '../components/OrderHeader'
export default {
    components:{
        Loading,
        OrderHeader
    },
    data(){
        return{
            showLaoding:true,
            orderId:this.$route.query.orderNo,
            content:''
        }
    },
    mounted(){
        this.submitPay()
    },
    methods:{
        submitPay(){
            this.axios.post('/pay',{
                orderId:this.orderId,
                orderName:'vue高仿小米商城',
                amount:0.01,
                payType:1
            }).then((res)=>{
                this.content = res.content
                setTimeout(()=>{
                    document.forms[0].submit()
                },100)
            })
        }
    }
}
</script>

<style lang="scss">

</style>