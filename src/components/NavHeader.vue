<template>
  <div>
    <div class="header">
      <div class="nav-topbar">
        <div class="container">
          <div class="topbar-menu">
            <a href="javascript:;">小米商城</a>
            <a href="javascript:;">MUI</a>
            <a href="javascript:;">云服务</a>
            <a href="javascript:;">协议规则</a>
          </div>
          <div class="topbar-user">
            <a href="/#/login" v-if="username">{{ username }}</a>
            <a href="/#/login" v-if="!username">登录</a>
            <a href="/#/order" v-if="username">我的订单</a>
            <a href="/#/cart" class="my-cart">
              <span class="icon-cart"></span>
              购物车({{cartCount}})
            </a>
          </div>
        </div>
      </div>
      <div class="nav-header">
        <div class="container">
          <div class="header-logo">
            <a href="/#/index"></a>
          </div>
          <div class="header-menu">
            <div class="item-menu">
              <span>小米手机</span>
              <div class="children">
                <ul>
                  <li v-for="item in productList" :key="item.id">
                    <a :href="'/#/products'+item.id">
                      <img v-lazy="item.mainImage" alt />
                      <h4>{{item.name}}</h4>
                      <span class="price">{{ item.price | currency }}</span>
                    </a>
                  </li>
                  
                </ul>
              </div>
            </div>
            <div class="item-menu">
              <span>REDMi红米</span>
              <div class="children">
                <ul>
                  <li>
                    <a href="javascript:;">
                      <img src="/imgs/nav-img/nav-1.png" alt />
                      <h4>小米9</h4>
                      <span class="price">￥1799.00元</span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <img src="/imgs/nav-img/nav-1.png" alt />
                      <h4>小米9</h4>
                      <span class="price">￥1799.00元</span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <img src="/imgs/nav-img/nav-1.png" alt />
                      <h4>小米9</h4>
                      <span class="price">￥1799.00元</span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <img src="/imgs/nav-img/nav-1.png" alt />
                      <h4>小米9</h4>
                      <span class="price">￥1799.00元</span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <img src="/imgs/nav-img/nav-1.png" alt />
                      <h4>小米9</h4>
                      <span class="price">￥1799.00元</span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <img src="/imgs/nav-img/nav-1.png" alt />
                      <h4>小米9</h4>
                      <span class="price">￥1799.00元</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="item-menu">
              <span>电视</span>
              <div class="children">
                <ul>
                  <li>
                    <a href="javascript:;">
                      <img src="/imgs/nav-img/nav-3-6.png" alt />
                      <h4>小米9</h4>
                      <span class="price">￥1799.00元</span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <img src="/imgs/nav-img/nav-3-1.jpg" alt />
                      <h4>小米9</h4>
                      <span class="price">￥1799.00元</span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <img src="/imgs/nav-img/nav-3-2.jpg" alt />
                      <h4>小米9</h4>
                      <span class="price">￥1799.00元</span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <img src="/imgs/nav-img/nav-3-3.png" alt />
                      <h4>小米9</h4>
                      <span class="price">￥1799.00元</span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <img src="/imgs/nav-img/nav-3-4.jpg" alt />
                      <h4>小米9</h4>
                      <span class="price">￥1799.00元</span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <img src="/imgs/nav-img/nav-3-5.jpg" alt />
                      <h4>小米9</h4>
                      <span class="price">￥1799.00元</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="header-search">
            <input type="text" />
            <a href="javascript:;" class="icon-search"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productList:[]
    }
  },
  computed:{
    username(){
      return this.$store.state.username
    },
    cartCount(){
      return this.$store.state.cartCount
    }
  },
  mounted() {
    this.getProductList();
  },
  methods: {
    getProductList() {
      this.axios.get('/products', {
        params:{
          categoryId:100012
        }
      }).then(res=>{
        if(res.list.length > 6){
          this.productList = res.list.slice(0,6)
        }
      })
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.header {
  width: 100%;
  .nav-topbar {
    background-color: #333;
    height: 39px;
    line-height: 39px;
    .container {
      @include flex();
      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
      }
      .my-cart {
        width: 110px;
        background-color: #ff6600;
        text-align: center;
        color: #fff;
        margin-right: 0;
        .icon-cart {
          @include bgImg(16px, 12px, "/imgs/icon-cart-checked.png", contain);
        }
      }
    }
  }
  .nav-header {
    height: 112px;
    .container {
      height: 112px;
      @include flex();
      position: relative;
      .header-logo {
        width: 55px;
        height: 55px;
        background-color: #ff6600;
        a {
          width: 110px;
          height: 55px;
          display: inline-block;

          &:before {
            content: "";
            @include bgImg(55px, 55px, "/imgs/mi-logo.png", contain);

            transition: margin 0.2s;
          }
          &:after {
            content: "";
            @include bgImg(55px, 55px, "/imgs/mi-home.png", contain);
          }
          &:hover:before {
            margin-left: -55px;
            transition: margin 0.2s;
          }
        }
      }
      .header-menu {
        width: 643px;
        padding-left: 209px;
        .item-menu {
          display: inline-block;
          margin-right: 20px;
          span {
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
          }
          &:hover {
            color: #ff6600;
            .children {
              background-color: #fff;
              height: 220px;
              opacity: 1;
            }
          }
          .children {
            position: absolute;
            top: 112px;
            left: 0;
            width: 1226px;
            height: 0px;
            opacity: 0;
            overflow: hidden;
            border-top: 1px solid #e0e0e0;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            z-index: 99;
            transition: all 0.5s;
            ul {
              display: flex;
              width: 100%;
              margin-top: 26px;
              li {
                width: 16.6%;
                position: relative;
                text-align: center;
                img {
                  width: auto;
                  height: 111px;
                  display: inline-block;
                }
                h4 {
                  // font-size: 12px;
                  margin-top: 19px;
                  margin-bottom: 8px;
                  color: $colorB;
                }
                .price {
                  font-size: 12px;
                  color: $colorA;
                  font-weight: 700;
                }
                &:after {
                  content: "";
                  width: 1px;
                  height: 99px;
                  background-color: $colorF;
                  position: absolute;
                  top: 2px;
                  right: 0;
                }
                &:last-child:after {
                  display: none;
                }
              }
            }
          }
        }
      }
      .header-search {
        @include flex();
        border: 1px solid #e0e0e0;
        input {
          width: 264px;
          height: 50px;
          border: none;
          padding-left: 12px;
        }
        .icon-search {
          @include bgImg(55px, 50px, "/imgs/icon-search.png", 18px);
          border-left: 1px solid #e0e0e0;
        }
      }
    }
  }
}
</style>