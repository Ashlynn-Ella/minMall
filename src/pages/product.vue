<template>
    <div class="product">
        <product-param :title="detail.name">
            <template v-slot:buy>
                <button class="btn" @click="buy">立即购买</button>
            </template>
        </product-param>
        <div class="content">
            <div class="item-bg">
                <h2>{{detail.name}}</h2>
                <h3>{{detail.subtitle}}</h3>
                <p>
                  <a href="" id="">全球首款双频 GP</a>
                  <span>|</span>
                  <a href="" id="">骁龙845</a>
                  <span>|</span>
                  <a href="" id="">AI 变焦双摄</a>
                  <span>|</span>
                  <a href="" id="">红外人脸识别</a>
                </p>
                <div class="price">
                  <span>￥<em>{{detail.price}}</em></span>
                </div>
            </div>
            <div class="item-bg-2"></div>
            <div class="item-bg-3"></div>
            <div class="product-swiper">
                <swiper :options="swiperOption" ref="mySwiper">
                    <!-- slides -->
                    <swiper-slide><img src="/imgs/product/gallery-2.png" /></swiper-slide>
                    <swiper-slide><img src="/imgs/product/gallery-3.png" /></swiper-slide>
                    <swiper-slide><img src="/imgs/product/gallery-4.png" /></swiper-slide>
                    <swiper-slide><img src="/imgs/product/gallery-5.jpg" /></swiper-slide>
                    <swiper-slide><img src="/imgs/product/gallery-6.jpg" /></swiper-slide>
                    <div class="swiper-pagination"  slot="pagination"></div>
                </swiper>
                <p class="desc">小米8 AI变焦双摄拍摄</p>
            </div>
            <div class="item-video">
              <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
              <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br/>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
              <div class="video-bg" @click="showSlide=true"></div>
              <div class="video-box" v-show="showSlide">
                <div class="overlay"></div>
                  <div class="video" :class="{'slide':showSlide}">
                    <span class="icon-close" @click="showSlide=false"></span>
                    <video src="/imgs/product/video.mp4" controls autoplay muted></video>
                  </div>
              </div>    
            </div>
        </div>
    </div>
</template>

<script>
import ProductParam from '../components/ProductParam.vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    data(){
        return {
            id:this.$route.params.id,
            detail:{},
            swiperOption:{
                autoplay: true,
                loop:true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable:true
                },
                freeMode : true,
                slidesPerView:3,
                spaceBetween: 30
            },
            showSlide:false
        }
    },
    components:{
        ProductParam,
        swiper,
        swiperSlide
    },
    created(){
        this.getProductDetail()
    },
    methods:{
        getProductDetail(){
            this.axios.get('/products/'+ this.id).then(res=>{
                this.detail = res
            })
        },
        buy(){
          this.$router.push(`/detail/${this.id}`)
        }      
    }
}
</script>

<style lang="scss">
@import "../assets/scss/config.scss";
@import "../assets/scss/mixin.scss";
    .product{
        button {
            margin-left: 11px;
        }
        .content{
            .item-bg{
                background:url('/imgs/product/product-bg-1.png') no-repeat center;
                height:718px;
                text-align:center;
                h2{
                  font-size:80px;
                  padding-top:55px;
                }
                h3{
                  font-size:24px;
                  letter-spacing: 10px;
                }
                p{
                  margin-top:21px;
                  margin-bottom:40px;
                  a{
                    font-size:16px;
                    color:#333333;
                  }
                  span{
                    margin:0 15px;
                  }
                }
                .price{
                  font-size:30px;
                  color:#333333;
                  em{
                    font-style:normal;
                    font-size:38px;
                  }
                }
            }
            .item-bg-2{
              background:url('/imgs/product/product-bg-2.png') no-repeat center;
              height:480px;
              background-size:1226px 397px;
            }
            .item-bg-3{
              background:url('/imgs/product/product-bg-3.png') no-repeat center;
              height:638px;
              background-size:cover;
            }
            .product-swiper{
                margin:36px 0 52px;
                img{
                    width:100%;
                    height:100%;
                }
                .desc{
                    font-size:18px;
                    text-align:center;
                }
            }
            .item-video{
                height:1044px;
                background-color:#070708;
                margin-bottom:76px;
                color:#FFFFFF;
                text-align:center;
                h2{
                  font-size:60px;
                  padding-top:82px;
                  margin-bottom:47px;
                }
                p{
                  font-size:24px;
                  margin-bottom:58px;
                }
                .video-bg{
                  background:url('/imgs/product/gallery-1.png') no-repeat center;
                  background-size:cover;
                  width:1226px;
                  height:540px;
                  margin:0 auto 120px;
                  cursor:pointer;  
                }
                .video-box{
                  position:relative;
                 .overlay{
                   @include position(fixed);
                   background-color: rgba(0,0,0,.4);
                   z-index: 11;
                  }
                  .video{
                    @include position(fixed,-50%,50%,1000px,536px);
                    transform: translate(-50%,-50%);
                    z-index: 11;
                    transition: all 0.6s;
                    &.slide{
                      top:50%;
                    }
                    video{
                      width: 100%;
                      height: 100%;
                      object-fit: cover;
                      outline: none;
                    }
                  }
                  .icon-close{
                    @include positionImg(20px,20px,absolute,20px,20px,'/imgs/icon-close.png');
                    z-index:12;
                    cursor:pointer;
                  }
                }
            }
        }
    }
</style>