<template>
    <div class="detail">
        <product-param :title="productInfo.name">
            <template v-slot:buy>
            </template>
        </product-param>
        <div class="product-detail">
            <div class="container">
                <div class="detail-swiper">
                    <swiper :options="swiperOption" ref="mySwiper">
                        <!-- slides -->
                        <swiper-slide><img src="/imgs/detail/phone-1.jpg" /></swiper-slide>
                        <swiper-slide><img src="/imgs/detail/phone-2.jpg" /></swiper-slide>
                        <swiper-slide><img src="/imgs/detail/phone-3.jpg" /></swiper-slide>
                        <swiper-slide><img src="/imgs/detail/phone-4.jpg" /></swiper-slide>
                        <div class="swiper-pagination"  slot="pagination"></div>
                    </swiper>
                    
                </div>
                <div class="product-info">
                    <div class="header-box">
                        <h2>{{productInfo.name}}</h2>
                        <p>相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红
                        外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏</p>
                        <div class="price-box">
                            <p>小米自营</p>
                            <span class="new">{{productInfo.price}}元</span>
                            <span class="old">1999元</span>
                        </div>
                        <div class="map">
                            <p class="map-info">
                                <span class="icon-map"></span>
                                <span>北京 北京市 朝阳区 安定门街道</span>
                                <a href="javascript:;">修改</a>
                            </p>
                            <p>有现货</p>
                        </div>
                        <div class="select-box">
                            <div class="select-item">
                                <h3>选择版本</h3>
                                <div class="select-group">
                                    <a href="javascript:;" class="btn btn-select" :class="{'checked':version==1}" @click="version=1">6GB+64GB 全网通</a>
                                    <a href="javascript:;" class="btn btn-select" :class="{'checked':version==2}" @click="version=2">4GB+64GB 移动4G</a>
                                </div>
                            </div>
                            <div class="select-item">
                                <h3>选择颜色</h3>
                                <div class="select-group">
                                    <a href="javascript:;" class="btn btn-select checked" :class="{'checked':color==1}" @click="color=1">
                                    <span class="icon-color"></span>
                                    深空灰
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="config-box">
                            <div class="config-item">
                                <p>
                                    <span class="config-info">{{productInfo.name}}{{version==1?' 6GB+64GB 全网通':' 4GB+64GB 移动4G'}}</span>
                                    <span class="count">总计: {{productInfo.price}}元</span>
                                </p>
                            </div>
                            <a href="javascript:;" class="btn btn-huge" @click="addCart">加入购物车</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="desc">
            <div class="container">
                <h1>价格说明</h1>
                <img src="/imgs/detail/item-price.jpeg" alt="">
            </div>
        </div> 
    </div>
</template>

<script>
import ProductParam from '../components/ProductParam.vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    components:{
        ProductParam,
        swiper,
        swiperSlide
    },
    data(){
        return{
            swiperOption:{
                autoplay: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable :true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },
            id:this.$route.params.id,
            productInfo:{},
            version:1,
            color:1
        }
    },
    created(){
        this.getProductInfo()
    },
    methods:{
        getProductInfo(){
            this.axios.get(`/products/${this.id}`).then((res)=>{
                this.productInfo = res
            })
        },
        addCart(){
            this.axios.post('/carts',{
                productId:this.id,
                selected: true
            }).then((res={cartProductVoList:0})=>{
                this.$router.push('/cart')
                this.$store.dispatch('getCartCount', res.cartTotalQuantity)    
            })
        }
    }
}
</script>

<style lang="scss">
@import "../assets/scss/config.scss";
@import "../assets/scss/mixin.scss";
    .product-detail{
        .container{
            display: flex;
            justify-content: space-between;
            .detail-swiper{
                width: 535px;
                height: 564px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .product-info{
                margin-left: 77px;
                .header-box{
                    h2{
                        font-size: 28px;
                        color: $colorB;
                        margin-bottom: 10px;
                    }
                    p{
                        font-size: 14px;
                        color: $colorD;
                        line-height: 1.5;
                    }
                    .price-box{
                        margin-top: 20px;
                        padding-bottom: 20px;
                        border-bottom: 1px solid $colorH;
                        p{
                            font-size: 16px;
                            color: $colorA;
                            margin-bottom: 10px;
                        }
                        .new{
                            color: $colorA;
                            font-size: 20px;
                            margin-right: 10px;
                        }
                        .old{
                            text-decoration: line-through;
                            font-size: 14px;
                            color: $colorD;
                        }
                    }
                }
                .map{
                    margin-top: 28px;
                    height: 108px;
                    border:1px solid $colorH;
                    padding-top: 27px;
                    padding-left: 34px;
                    background:#FAFAFA;
                    p{    
                        &:last-child{
                            color: $colorA;
                            font-size: 14px;
                            padding-top: 15px;
                            padding-left: 30px;
                        }
                    }
                    .map-info{
                        display: flex;
                        font-size: 14px;
                        ;
                        span{
                            color: $colorC;
                            margin-right: 10px;
                        }
                        .icon-map{
                            @include bgImg(20px,20px,'/imgs/detail/icon-loc.png')
                        }
                        a{
                            margin-right: 10px;
                            color: $colorA;
                        }
                        
                    }
                }
                .select-box{                   
                    .select-item{
                        width: 100%;
                        margin-top: 30px;
                        h3{
                            font-size: 18px;
                            margin-bottom: 20px;
                        }
                        .select-group{
                            @include flex();
                            .checked{
                                color: $colorA;
                                border-color: $colorA;
                            }
                            .btn{
                                width: 49%; 
                                .icon-color{
                                    display: inline-block;
                                    width: 14px;
                                    height: 16px;
                                    background-color: $colorC;
                                    vertical-align: middle;
                                }
                            }
                        }
                    }
                }
                .config-box{
                    margin: 50px 0 50px;
                    .config-item{
                        height: 108px;
                        background:#FAFAFA;
                        margin-bottom: 30px;
                        padding-top: 24px;
                        padding-left: 30px;
                        font-size: 14px;
                        p{
                            color: $colorB;
                            .count{
                                font-size: 24px;
                                color: $colorA;
                                display: block;
                                margin-top: 15px;
                            }
                        }
                    }
                }
            }
        }
        
    }
    .desc{
            width: 100%;
            height: 340px;
            padding-bottom: 60px;
            background:rgba(243,243,243,1);
            h1{
                font-size: 24px;
                padding:38px 0 30px;
                img{
                    display: block;
                    width: 100%;
                    height: 189px;
                }
            }
        }
</style>