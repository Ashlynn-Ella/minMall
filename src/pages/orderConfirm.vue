<template>
    <div class="confirm">
      <order-header title="支付订单">
        <template v-slot:cart-point>
          <span>请谨防钓鱼链接或诈骗电话，了解更多></span>    
        </template>       
      </order-header>       
        <div class="confirm-box">
            <div class="container">
                <div class="addr clearfix">                   
                    <h2>收货地址</h2>
                    <div class="addr-content" :class="{'checked':checkedIndex==index}" v-for="(item,index) in addrList" :key="index" @click="checkedIndex=index">
                        <div class="username">{{item.receiverName}}</div>
                        <div class="addr-info">
                            <p>{{item.receiverMobile}}</p>
                            <p>{{item.receiverProvince}} {{item.receiverCity}} {{item.receiverDistrict}} {{item.receiverAddress}}</p>
                        </div>
                        <div class="icon-box clearfix">
                            <a herf="javascript:;" class="fl" @click="delAddress(item)">
                                <i class="el-icon-delete"></i>
                            </a>
                            <a herf="javascript:;" class="fr" @click="editAddress(item)">
                                <i class="el-icon-edit"></i>
                            </a>
                        </div>
                    </div>
                    <div class="addr-add" @click="addAddress">
                        <div class="icon-add"></div>
                        <div>添加新地址</div>
                    </div>
                </div>
                <div class="item-good">
                    <h2>商品</h2>
                    <ul>
                      <li v-for="item in cartsList" :key="item.productId">
                        <div class="good-name">
                          <img v-lazy="item.productMainImage">
                          <span>{{item.productName}} {{item.productSubtitle}}</span>
                        </div>
                        <div class="good-price">{{item.productPrice}}元x{{item.quantity}}</div>
                        <div class="good-total">{{item.productTotalPrice}}元</div>
                      </li>
                    </ul>
                </div>
                <div class="item-shipping">
                  <h2>配送方式</h2>
                  <span>包邮</span>
                </div>
                <div class="item-invoice">
                  <h2>发票</h2>
                  <a href="javascript:;">电子发票</a>
                  <a href="javascript:;">个人</a>
                </div>
                <div class="detail">
                  <div class="item">
                    <span class="item-name">商品件数：</span>
                    <span class="item-val">{{cartsList.length}}件</span>
                  </div>
                  <div class="item">
                    <span class="item-name">商品总价：</span>
                    <span class="item-val">{{cartTotalPrice}}元</span>
                  </div>
                  <div class="item">
                    <span class="item-name">优惠活动：</span>
                    <span class="item-val">0元</span>
                  </div>
                  <div class="item">
                    <span class="item-name">运费：</span>
                    <span class="item-val">0元</span>
                  </div>
                  <div class="item-total">
                    <span class="item-name">应付总额：</span>
                    <span class="item-val">{{cartTotalPrice}}元</span>
                  </div>
                </div>
                <div class="btn-group">
                  <a href="/#/cart" class="btn btn-default btn-large">返回购物车</a>
                  <a href="javascript:;" class="btn btn-large" @click="orderSubmit">去结算</a>
                </div>
            </div>
        </div>
        <Modal
          title="删除确认"
          btnType=3
          :modalShow="deleteModalShow"
          @cancel="deleteModalShow=false"
          @submit="submitAddress"
        >
        <template v-slot:body>
          <p>您确认要删除此地址吗？</p>
        </template>
        </Modal>
        <Modal 
          title="添加收获地址"
          btnType=3
          :modalShow="editModalShow"
          @cancel="editModalShow=false"
          @submit="submitAddress"
        >
        <template v-slot:body>
          <div class="edit-wrap">
            <div class="item">
              <input type="text" class="input" placeholder="姓名" v-model="checkedItem.receiverName">
              <input type="text" class="input" placeholder="手机号" v-model="checkedItem.receiverMobile">
            </div>
            <div class="item">
              <select name="province" v-model="checkedItem.receiverProvince">
                <option value="北京">北京</option>
                <option value="天津">天津</option>
                <option value="河北">河北</option>
              </select>
              <select name="city" v-model="checkedItem.receiverCity">
                <option value="北京">北京</option>
                <option value="天津">天津</option>
                <option value="河北">石家庄</option>
              </select>
              <select name="district" v-model="checkedItem.receiverDistrict">
                <option value="昌平区">昌平区</option>
                <option value="海淀区">海淀区</option>
                <option value="东城区">东城区</option>
                <option value="西城区">西城区</option>
                <option value="顺义区">顺义区</option>
                <option value="房山区">房山区</option>
              </select>
            </div>
            <div class="item">
              <textarea name="street" v-model="checkedItem.receiverAddress"></textarea>
            </div>
            <div class="item">
              <input type="text" class="input" placeholder="邮编" v-model="checkedItem.receiverZip">
            </div>
          </div>
        </template>
        </Modal>
    </div>
</template>

<script>
import Modal from './../components/Modal'
import OrderHeader from '../components/OrderHeader'
export default {
  components:{
      Modal,
      OrderHeader
  },
  data(){
    return{
      addrList:[],
      cartsList:[],
      cartTotalPrice:0,
      checkedIndex:0,
      editModalShow:false,
      deleteModalShow:false,
      checkedItem:{},//被选中地址的对象
      userAction:'' //0 添加  1编辑  3删除
    }
  },
  mounted(){
    this.getAddrList();
    this.getCartsList();
  },
  methods:{
    getAddrList(){
      this.axios.get('/shippings').then(res=>{
        this.addrList = res.list
      })
    },
    delAddress(item){
      this.checkedItem = item
      this.userAction = 3
      this.deleteModalShow = true
    },
    editAddress(item){
      this.checkedItem = item
      this.userAction = 1
      this.editModalShow = true
    },
    addAddress(){
      this.checkedItem={}
      this.userAction = 0
      this.editModalShow = true
    },
    submitAddress(){
      let {checkedItem,userAction} = this
      let method,url,params={}
      if(userAction == 0){
        method = 'post'
        url = '/shippings'
      } else if (userAction == 1){
        method = 'put'
        url = `/shippings/${checkedItem.id}`
      } else {
        method = 'delete'
        url = `/shippings/${checkedItem.id}`
      }
      if(userAction == 0 || userAction == 1){
        let {receiverName,receiverMobile,receiverProvince,receiverCity,receiverDistrict,receiverAddress,receiverZip} = checkedItem
        let errMsg=''
        if(!receiverName){
          errMsg = '请输入姓名'
        } else if(!receiverMobile || !/\d{11}/.test(receiverMobile)){
          errMsg = '请输入正确的电话号码'
        } else if(!receiverProvince){
          errMsg = '请选择省份'
        } else if(!receiverCity){
          errMsg = '请选择城市'
        } else if(!receiverDistrict || !receiverAddress){
          errMsg = '请选择收获地址'
        } else if(!receiverZip || !/\d{6}/.test(receiverZip)){
          errMsg = '请输入正确邮编'
        }
        if(errMsg){
        this.$message.error(errMsg)
        return
        }
        params={
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip
        }
      }
      this.axios[method](url,params).then(()=>{
        this.closeModal()
        this.getAddrList()
        this.$message.success('操作成功')
      })
    },
    closeModal(){
      this.checkedItem = {}
      this.userAction = ''
      this.deleteModalShow = false
      this.editModalShow = false
    },
    getCartsList(){
      this.axios.get('/carts').then((res)=>{
        let list = res.cartProductVoList.filter(item=>item.productSelected)
        this.cartsList = list
        this.cartTotalPrice = res.cartTotalPrice
      })
    },
    orderSubmit(){
      let item = this.addrList[this.checkedIndex]
      if(!item){
        this.$message.error('请选择地址')
        return
      }
      this.axios.post('/orders',{
        shippingId:item.id
      }).then(res=>{
        this.$router.push({
          path: '/order/pay',
          query:{
            orderNo : res.orderNo
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.confirm{       
    .confirm-box{
        background-color: #f5f5f5;
        padding: 30px 0 84px;
        .container{
            background-color: #fff;
            padding: 38px 0 90px 63px;
            .addr{
                h2{
                    font-size: 20px;
                    margin-bottom: 20px;                       
                }
                .addr-content,.addr-add{
                    box-sizing:border-box;
                    float: left;
                    width: 271px;
                    height: 180px;
                    margin-right:15px;
                    border:1px solid #e5e5e5;
                    padding: 15px 24px;
                    cursor: pointer;
                }
                .addr-content{  
                        &.checked{
                            border-color:$colorA;
                        }
                        .username{
                            font-size: 18px;
                            font-weight: 300;
                            margin-bottom: 10px;    
                        }
                        .addr-info{
                            margin-bottom: 40px;
                            p{
                                font-size: 14px;
                                color: #757575;
                                line-height:20px;
                            }
                        }
                        .icon-box{
                            a{
                                font-size:25px;
                                color:#757575;
                                &:hover{
                                    color:$colorA;
                                }
                            }
                        }
                }
                .addr-add{
                    text-align:center;
                    color: #999999;
                    .icon-add{
                        width:30px;
                        height:30px;
                        border-radius:50%;
                        background:url('/imgs/icon-add.png') #E0E0E0 no-repeat center;
                        background-size:14px;
                        margin: 0 auto;
                        margin-top: 45px;
                        margin-bottom: 10px;
                    }
                }
            }
            .item-good{
                margin-top:34px;
                border-bottom: 1px solid #E5E5E5;
                padding-bottom: 12px;
                h2{
                  border-bottom:1px solid #E5E5E5;
                  padding-bottom: 5px;
                }
                li{
                  display:flex;
                  align-items: center;
                  height:40px;
                  line-height:40px;
                  margin-top:10px;
                  font-size:16px;
                  color:#333333;
                  .good-name{
                    flex:5;
                    img{
                      width:30px;
                      height:30px;
                      vertical-align:middle;
                    }
                  }
                  .good-price{
                    flex:2;
                  }
                  .good-total{
                    padding-right:44px;
                    color:#FF6600;
                  }
                }
            }
            .item-shipping,.item-invoice{
              margin-top:31px;
              line-height: 20px;
              h2{
                display: inline-block;
                margin-right: 71px;
                font-size: 20px;
                width: 80px;
              }
              span,a{
                font-size:16px;
                color:#FF6700;
                margin-right:23px;
              }
            }
            .detail{
              padding: 50px 44px 33px 0;
              border-bottom: 1px solid #f5f5f5;
              text-align: right;
              font-size: 16px;
              color: #666666;
              .item-val{
                color:#FF6700;
              }
              .item{
                line-height: 15px;
                margin-bottom: 12px;
              }
              .item-val{
                display:inline-block;
                width:100px;
              }
              .item-total{
                .item-val{
                  font-size:28px;
                }
              }
            }
            .btn-group{
              margin-top: 37px;
              text-align: right;
            }
        }
    }
    .edit-wrap{
      font-size:14px;
      .item{
        margin-bottom:15px;
        .input{
          display:inline-block;
          width:283px;
          height:40px;
          line-height:40px;
          padding-left:15px;
          border:1px solid #E5E5E5;
          &+.input{
            margin-left:14px;
          }
        }
        select{
          height:40px;
          line-height:40px;
          border:1px solid #E5E5E5;
          margin-right:15px;
        }
        textarea{
          height:62px;
          width:100%;
          padding:13px 15px;
          box-sizing:border-box;
          border:1px solid #E5E5E5;
        }
      }
    } 
}
</style>