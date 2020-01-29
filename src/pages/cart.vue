<template>
    <div class="cart">
        <OrderHeader title="我的购物车">
        <template v-slot:cart-point>
            <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>    
        </template>
        </OrderHeader>
        <div class="cart-list">
            <div class="container">
                <div class="table">
                    <ul class="table-title">
                        <li class="col-1">
                            <span class="checked-box" :class="{checked:allSelected}" @click="toggle"></span>
                            全选
                        </li>
                        <li class="col-3">商品名称</li>
                        <li class="col-1">单价</li>
                        <li class="col-2">数量</li>
                        <li class="col-1">小计</li>
                        <li class="col-1">操作</li>
                    </ul>
                    <ul class="table-title table-body" v-for="(item,index) in cartList" :key="index">
                        <li class="col-1">
                            <span class="checked-box" :class="{checked:item.productSelected}" @click="updateCart(item)"></span>
                        </li>
                        <li class="col-3 productInfo">
                            <img :src="item.productMainImage">
                            <span>{{item.productName}} , {{item.productSubtitle}}</span>
                        </li>
                        <li class="col-1">{{item.productPrice}}</li>
                        <li class="col-2">
                            <div class="num-box">
                                <a href="javascript:;" @click="updateCart(item,'-')">-</a>
                                <span>{{item.quantity}}</span>
                                <a href="javascript:;" @click="updateCart(item,'+')">+</a>
                            </div>
                        </li>
                        <li class="col-1 count">{{item.productTotalPrice}}</li>
                        <li class="col-1"><span class="icon-delete" @click="deleteCart(item.productId)"></span></li>
                    </ul>
                </div>
                <div class="cart-tip clearfix">
                    <div class="tip-item fl">
                        <a>继续购物</a>
                        <p>共件 <span>{{cartList.length}}</span> 商品，已选择 <span>{{selectedNum}} </span>件</p>
                    </div>
                    <div class="tip-item fr">
                        合计:<span class="allcount"> {{cartTotalPrice}} </span>元
                        <a href="javascript:;" class="btn btn-large" @click="order()">去结算</a>
                    </div>
                </div>
            </div>
        </div>
        <service-bar></service-bar>
        <NavFooter></NavFooter>
    </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader'
import NavFooter from '../components/NavFooter'
import ServiceBar from '../components/ServiceBar'

export default {
    components:{
        OrderHeader,
        NavFooter,
        ServiceBar
    },
    data(){
        return {
            cartList:[],
            allSelected:false,
            cartTotalPrice:0,
            selectedNum:0
        }
    },
    created(){
        this.getCartList()
    },
    methods:{
        getCartList(){
            this.axios.get('/carts').then((res)=>{             
                this.render(res)
            })
        },
        toggle(){
            let url = this.allSelected?'/carts/unSelectAll':'/carts/selectAll'
            this.axios.put(url).then((res)=>{             
                this.render(res)
            })
        },
        updateCart(item,type){
            let selected
            let quantity = item.quantity
            if(type == '-'){
                if(quantity <= 1){
                    this.$message.warning('至少选择一件商品')
                    return
                }
                quantity--        
            } else if(type == '+'){
                if(quantity > item.productStock){
                    this.$message.warning('没有更多商品')
                    return
                }
                quantity++           
            } else {
                selected = !item.productSelected
            }
            this.axios.put('/carts/'+item.productId,{
                quantity,
                selected
            }).then((res)=>{
                this.render(res)
            })
        },
        deleteCart(id){
            this.axios.delete(`/carts/${id}`).then(res=>{
                this.render(res)
                this.$message.success('删除成功')
            })
        },
        render(res){
            this.cartList = res.cartProductVoList || []
            this.allSelected = res.selectedAll
            this.cartTotalPrice = res.cartTotalPrice
            this.selectedNum = this.cartList.filter(item=>item.productSelected).length
        },
        order(){
            if(!this.selectedNum){
                this.$message.warning('至少需要一件商品')
                return
            }
            this.$router.push('/order/confirm')
        }

    }

}
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
    .cart{
        .cart-list{
            background-color: #F5F5F5;
            padding-top: 32px;
            padding-bottom: 114px;
            .table{    
                background-color: #fff;
                padding: 0 43px;                    
                .table-title{
                    height: 79px;
                    color: $colorC;
                    font-size: 14px;
                    @include flex(center);
                    border-bottom: 1px solid $colorH;
                    &:last-child{
                        border: none;
                    }    
                }               
                .table-body{
                    height: 125px;
                    font-size: 16px;
                    color: $colorB;
                    .count{
                        color:$colorA;
                    }
                    .num-box{
                        display:inline-flex;
                        width:150px;
                        border:1px solid $colorH;
                        font-size:14px;
                        span{
                            flex:1;
                            line-height:40px;
                            color:$colorB;
                        }
                        a{
                            flex:1;
                            line-height:40px;
                            color:$colorB;
                        }
                    }
                }
                li{
                    text-align:center;
                }
                .col-1{
                        flex:1;
                    }
                .col-2{
                    flex:2;
                }
                .col-3{
                    flex:3;
                }
                .checked-box{
                    display: inline-block;
                    width: 22px;
                    height: 22px;
                    border: 1px solid $colorH;
                    margin-right: 15px;
                    vertical-align: middle;
                    cursor: pointer;    
                }
                .checked{
                    background-color: $colorA;
                    background: url('/imgs/icon-gou.png') $colorA no-repeat center;
                    background-size: 16px 12px;
                }
                .productInfo{ 
                    display:flex;
                    font-size:18px;
                    align-items:center;                   
                    img{
                        width:80px;
                        height:80px;
                        margin-right:30px;
                    }
                }
                .icon-delete{
                    @include bgImg(14px,12px,'/imgs/icon-close.png');
                    cursor:pointer;
                }
            }
            .cart-tip{
                margin-top: 20px;
                line-height: 50px;
                .tip-item{
                    font-size: 14px;
                    span{
                        color: $colorA;
                   
                    }
                    .allcount{
                            font-size: 20px;
                        } 
                    .btn{
                        margin-left: 31px;
                        
                    }
                    p{
                        display: inline-block;
                        margin-left: 37px;
                    }
                }
            }
        }
    }
    
</style>