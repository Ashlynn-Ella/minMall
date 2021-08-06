<template>
    <div class="order-pay">
			<order-header title="支付订单">
        <template v-slot:cart-point>
          <span>请认真填写收货地址</span>    
        </template>       
      </order-header>
      <div class="order-box">
        <div class="container">
            <div class="info-box">               
                <div class="info-item clearfix">
                    <div class="icon-succ"></div>
                    <div class="order-info">
                        <h2>订单提交成功！去付款咯～</h2>
                        <p>请在 <span style="color:#FF6600">30分</span> 内完成支付, 超时后将取消订单</p>
                        <p>收货信息：{{address.receiverName}} {{address.receiverMobile}} {{address.receiverProvince}} 
                            {{address.receiverCity}} {{address.receiverDistrict}} {{address.receiverAddress}}</p>
                    </div>
                    <div class="order-total">
                        <p>应付总额：<span>{{payment}}</span>元</p>
                        <p>订单详情 <span class="icon-down" :class="{'up':isShow}" @click="isShow=!isShow"></span></p>
                    </div>
                </div>
                <div class="info-children" v-show="isShow">
                    <p>订单号：<span>{{orderNo}}</span></p>
                    <p>收货信息：<span>{{address.receiverName}} {{address.receiverMobile}} {{address.receiverProvince}} 
                            {{address.receiverCity}} {{address.receiverDistrict}} {{address.receiverAddress}}</span></p>
                    <p class="goods">商品名称：<span v-for="(item,index) in products" :key="index"><img v-lazy="item.productImage"> {{item.productName}}</span></p>
                    <p>发票信息：<span>电子发票 个人</span></p>
                </div>
            </div>
            <div class="pay-box">
                <h2>选择以下支付方式付款</h2>
                <div class="payment">
                    <p>支付平台</p>
                    <div class="pay-ali" :class="{'checked':payType==1}" @click="submitPay(1)">
                        <img src="/imgs/pay/icon-ali.png">
                    </div>
                    <div class="pay-wechat" :class="{'checked':payType==2}" @click="submitPay(2)">
                        <img src="/imgs/pay/icon-wechat.png">
                    </div>
                </div>
            </div>
        </div> 
        <scan-pay 
        :showScan="showScan"
        :payImg="payImg"
        @close="closeScan"
        ></scan-pay> 
        <Modal 
          title="支付确认"
          sureText="查看订单"
          cancelText="未支付"
          btnType="3"
          :modalShow="showModal"
          @cancel="showModal=false"
          @submit="goOrderList"
        >
        <template v-slot:body>
            <p>您确认是否完成支付？</p>
        </template>
        </Modal>  
    </div>
    </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader'
import ScanPay from '../components/ScanPayCode'
import Modal from '../components/Modal'
import QRCode from 'qrcode'
export default {
    data(){
        return{
            orderNo: this.$route.query.orderNo,
            payment:'',
            isShow:false,
            address:{},
            products:[],
            showScan:false,
            showModal:false,
            payType:'',
            payImg:'',
            T:''
        }
    },
    components:{
        ScanPay,
        Modal,
        OrderHeader
    },
    mounted(){
        this.getOrderDetail()
    },
    methods:{
        getOrderDetail(){
            this.axios.get(`/orders/${this.orderNo}`).then(res=>{
                this.payment = res.payment
                this.address = res.shippingVo
                this.products = res.orderItemVoList
            })
        },
        submitPay(payType){
            if(payType == 1){
                window.open('/#/order/alipay?orderNo='+this.orderNo,'_blank')
            } else {
                
                this.axios.post('/pay',{
                    orderId:this.orderNo,
                    orderName:'vue高仿小米商城',
                    amount:0.01,
                    payType:2
                }).then((res)=>{
                    // this.payImg = res.content
                    this.showScan = true
                    QRCode.toDataURL(res.content)
                    .then(url => {
                        this.payImg = url
                        this.loopOrderState()
                    })
                    .catch(() => {
                      this.$message.error('生成二维码失败')
                    })
                })
            }
        },
        loopOrderState(){
            this.T=setInterval(()=>{
                this.axios.get(`/orders/${this.orderNo}`).then((res)=>{
                    if(res.status == 20){
                        clearInterval(this.T)
                        this.goOrderList()
                    }
                })
            },1000)
        },
        closeScan(){
            this.showScan = false
            this.showModal = true
            clearInterval(this.T)
        },
        goOrderList(){
            this.$router.push('/order/list')
        }
    }
}
</script>

<style lang="scss">
@import "../assets/scss/config.scss";
@import "../assets/scss/mixin.scss";
    .order-pay{
			.order-box{
				background-color: #f5f5f5;
        padding: 30px 0 130px;
			} 
        .info-box{
            margin-bottom: 30px;
            background-color: #fff;
            padding: 62px 52px 0;
            .info-item{
                padding-bottom:45px;
                .icon-succ{
                    float: left;
                    width: 90px;
                    height: 90px;
                    background: url('/imgs/icon-gou.png') #80c58a no-repeat center; 
                    background-size: 40px;
                    border-radius: 50%;
                    margin-right: 40px;
                }
                .order-info{
                    float: left;
                    h2{
                        font-size: 24px;
                        color: $colorB;
                        margin-bottom: 20px;
                        
                    }
                    p{
                       font-size: 14px;
                       color: $colorC;
                       font-weight: 500;
                    }
                }
                .order-total{
                    float: right;
                    font-size: 14px;
                    color: $colorC;
                    p{
                        span{
                        color: $colorA;
                        font-size: 24px;
                        }
                        &:first-child{
                            margin-bottom: 24px;
                        }
                    }     
                    .icon-down{
                        @include bgImg(14px,10px,'/imgs/icon-down.png');
                        margin-left: 5px;
                        cursor: pointer;
                        transition: transform .5s;
                        &.up{
                            transform: rotate(180deg);
                        }
                    }
                }
                
            }
            .info-children{
                padding-top:47px;
                padding-left:130px;
                border-top:1px solid $colorF;
                padding-bottom:34px;
                p{
                    margin-bottom:19px;
                    font-size:14px;
                    color:$colorB; 
                    
                } 
                .goods{
                        span{
                            display:block;
                            margin-top:5px;
                            img{
                            display:inline-block;
                            width:30px;
                            vertical-align:middle;
                            // margin-right:5px;
                            }
                        }
                        
                    }
            }            
        }
        .pay-box{
            background-color: #fff;
            padding: 0 52px 72px;
            h2{
                line-height:70px;
                font-size:20px;
                border-bottom:1px solid $colorF;
            }
            .payment{
                padding-top:26px;
                p{
                    font-size:18px;
                    color:$colorB;
                    margin-bottom:19px;
                }
                .pay-ali,.pay-wechat{
                    display:inline-block;
                    width:188px;
                    height:64px;
                    text-align:center;
                    border:1px solid $colorF;
                    margin-right:20px;
                    cursor:pointer;
                    img{
                        margin-top:13px;
                        display:inline-block;
                        width:103px;
                        height:38px;
                    }
                    &.checked{
                        border:1px solid $colorA; 
                    }
                }
            }
        }
    }
</style>