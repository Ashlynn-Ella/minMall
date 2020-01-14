<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <swiper :options="swiperOption">
          <!-- slides -->
          <swiper-slide v-for="item in swiperList" :key="item.id">
            <a :href="'/#/products' + item.id">
              <img :src="item.img" />
            </a>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <ul v-for="(item,index) in productList" :key="index">
                  <li class="phone-item" v-for="sub in item" :key="sub.id">
                    <a :href="sub.id?'/#/products/'+sub.id:'/#/products/45'">
                      <img :src="sub.mainImage?sub.mainImage:''" />
                      <span class="phone-name">{{sub.name?sub.name:''}}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">耳机 音响</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="ads-box">
        <a :href="'/#/products/'+item.id" v-for="item in adsList" :key="item.id">
          <img v-lazy="item.img" />
        </a>
        
      </div>
      <div class="banner">
        <a href="javascript:;">
          <img v-lazy="'/imgs/banner-1.png'" alt />
        </a>
      </div>
    </div>
    <div class="product-box">
      <div class="container">
        <h3 class="product-title">手机</h3>
        <div class="product-info">
          <div class="info-left">
            <a href="/#/product/35">
              <img v-lazy="'/imgs/mix-alpha.jpg'" alt />
            </a>
          </div>
          <ul class="info-right">
            <li v-for="(item,index) in menuList" :key="index">
              <span :class="index%2?'news':'seckill'">{{index%2?'新品':'秒杀'}}</span>
              <a href="javascript:;">
                <div class="item-img"><img v-lazy="item.mainImage" alt=""></div>
                <h4 class="title">{{item.name}}</h4>
                <p>{{item.subtitle}}</p>
                <div class="price">{{item.price | currency}}<span class="icon-cart" @click="addCart(item.id)"></span></div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <Modal 
      title="提示"
      sureText="查看购物车"
      btnType="1"
      :modalShow="modalShow"
      @submit="goToCart"
      @cancel="modalShow=false"
    >
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </Modal>
  </div>
</template>

<script>
import ServiceBar from "../components/ServiceBar";
import Modal from "../components/Modal";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  components: {
    swiper,
    swiperSlide,
    ServiceBar,
    Modal
  },
  data() {
    return {
      swiperOption: {
        effect: "cube",
        autoplay: true,
        loop: true,
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      swiperList: [
        { id: 42, img: "/imgs/slider/slide-1.jpg" },
        { id: 45, img: "/imgs/slider/slide-2.jpg" },
        { id: 46, img: "/imgs/slider/slide-3.jpg" },
        { id: 42, img: "/imgs/slider/slide-4.jpg" },
        { id: 42, img: "/imgs/slider/slide-5.jpg" }
      ],
      adsList:[
        { id: 35, img: "/imgs/ads/ads-1.png" },
        { id: 36, img: "/imgs/ads/ads-2.jpg" },
        { id: 37, img: "/imgs/ads/ads-3.png" },
        { id: 38, img: "/imgs/ads/ads-4.jpg" }
      ],
      productList: [],
      menuList:[],
      modalShow:false
    };
  },
  mounted() {
    this.getProductList();
  },
  methods: {
    getProductList() {
      this.axios
        .get("/products", {
          params: {
            pageSize: 24,
            categoryId: 100012
          }
        })
        .then(res => {
          this.menuList = res.list.slice(6,14);
          for (let i = 0; i < 6; i++) {
            let key = (i + 1) * 4;
            this.productList[i] = res.list.slice(i * 4, key);
          }
        });
    },
    addCart() { 
      this.modalShow = true 
      // this.axios.post('/carts',{
      //   productId:id,
      //   selected: true
      // }).then(() => {
      //   this.modalShow = true
      // })
    },
    goToCart() {
      this.$router.push('/cart')
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/config.scss";
@import "../assets/scss/mixin.scss";
.index {
  .swiper-box {
    height: 451px;
    position: relative;
    img {
      width: 100%;
      height: 451px;
    }
    .swiper-button-prev {
      left: 274px;
    }
    .nav-menu {
      width: 264px;
      height: 451px;
      background: rgba(85, 88, 90, 0.5);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9;
      .menu-wrap {
        padding-top: 26px;
        .menu-item {
          height: 50px;
          position: relative;
          a {
            display: inline-block;
            padding-left: 30px;
            line-height: 50px;
            color: #fff;
            font-size: 16px;
          }
          &:hover {
            background-color: $colorA;
            .children {
              width: 964px;
              opacity: 1;
            }
          }
          &:after {
            content: " ";
            @include bgImg(10px, 15px, "/imgs/icon-arrow.png", 10px);
            position: absolute;
            right: 30px;
            top: 17.5px;
            cursor: pointer;
          }
          .children {
            width: 0px;
            height: 451px;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            top: -26px;
            left: 264px;
            background-color: #fff;
            border-top: 1px solid #e5e5e5;
            border-right: 1px solid #e5e5e5;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            ul {
              width: 100%;
              height: 75px;
              display: flex;
              justify-content: space-between;
              .phone-item {
                flex: 1;
                height: 75px;
                line-height: 75px;
                a {
                  font-size: 14px;
                  color: #333;
                  padding-left: 23px;
                  img {
                    width: 42px;
                    height: 35px;
                    margin-right: 10px;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .ads-box {
    margin-top: 14px;
    margin-bottom: 31px;
    height: 167px;
    @include flex();
    a {
      width: 296px;
      height: 167px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .banner {
    margin-bottom: 50px;
    img {
      width: 100%;
      height: 130px;
    }
  }
  .product-box {
    height: 740px;
    background-color: $colorJ;
    color: $colorB;
    display: flex;
    .product-title {
      font-size: 22px;
      padding: 30px 0 20px;
    }
    .product-info {
      display: flex;
      .info-left {
        width: 224px;
        height: 619px;
        margin-right: 2px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info-right {
        height: 619px;
        width: 1000px;
        @include flex();
        flex-wrap: wrap;
        // background-color: red;
        li{
          box-sizing: border-box;
          width: 236px;
          height: 302px;
          background-color: #fff;
          margin-left: 14px;
          margin-bottom: 14px;
          padding: 0 24px;
          text-align: center;
          span{
            display: inline-block;
            width: 67px;
            height: 24px;
            line-height: 24px;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            &.seckill{
              background-color: #E82626;  
            }
            &.news{
              background-color: #7ECF68;
            }
          }
          .item-img{
            img{
            display: inline-block;
            height: 195px;
            }
          }
          .title{
            font-size: 14px;
            color: $colorB;
          }
          p{
            font-size: 12px;
            color: #999;
            padding: 3px 0 13px;
          }
          .price{
            color: #F20A0A;
            .icon-cart{
              @include bgImg(16px,12px,'/imgs/icon-cart-hover.png');
              vertical-align: middle;
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
}
</style>