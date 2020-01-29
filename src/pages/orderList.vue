<template>
  <div class="order-list">
		<order-header title="确认订单">
      <template v-slot:cart-point>
				<span>请谨防钓鱼链接或诈骗电话，了解更多></span>    
      </template>       
    </order-header>
    <div class="wrapper">
      <div class="container">
				<Loading v-if="LoadingShow"></Loading>			
        <div class="order-item" v-for="(item,index) in orderList" :key="index">
          <div class="item-title clearfix">
            <div class="order-info fl">
              <span>{{item.createTime}}</span>
              <span>|</span>
              <span>{{item.receiverName}}</span>
              <span>|</span>
              <span>订单号：{{item.orderNo}}</span>
              <span>|</span>
              <span>{{item.paymentTypeDesc}}</span>
            </div>
            <div class="pay fr">
              应付金额：
              <span class="payment">{{item.payment}}</span> 元
            </div>
          </div>
          <div class="item-body clearfix">
            <div class="pro-item fl">
							<div class="pro-info" v-for="(orderItem,index) in item.orderItemVoList" :key="index">
								<div class="img">
									<img v-lazy="orderItem.productImage">
								</div>
								<div class="pro-title">
									<span>{{orderItem.productName}}</span><br/>
									<span>{{orderItem.currentUnitPrice}}X{{orderItem.quantity}}元</span>
								</div>
							</div>
						</div>						
            <div class="order-status fr">
							<a href="javascript:;" v-if="item.status==20">{{item.statusDesc}}</a>
							<a href="javascript:;" v-else @click="goOrderPay(item.orderNo)">{{item.statusDesc}}</a>
						</div>						
          </div>
        </div>
				<el-pagination
					v-if="false"
					class="pagination"
					background
					layout="prev, pager, next"
					:pageSize="pageSizes"
					:total="total"
					@current-change="handleChange"
					>
				</el-pagination>
				<div class="loadingMore" @click="loadMore">
					<el-button
					v-if="true"
					type="primary"
					:loading="true"
					>
						加载中
					</el-button>
				</div>
				<no-data v-if="!LoadingShow && orderList.length == 0"></no-data>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../components/Loading"
import OrderHeader from '../components/OrderHeader'
import NoData from '../components/NoData'
import { Pagination, Button } from 'element-ui'
export default {
  data() {
    return {
		LoadingShow: true,
		orderList:[],
		total:0,
		pageSizes:3,
		pageNum:1
    };
  },
  components: {
		Loading,
		OrderHeader,
		NoData,
		[Pagination.name]:Pagination,
		[Button.name]:Button
	},
	created(){
		this.getOrderList()
	},
	methods:{
		getOrderList(){
			this.axios.get('/orders',{
				params:{
					pageSize:this.pageSizes,
					pageNum:this.pageNum
				}
			}).then((res)=>{
				this.LoadingShow = false
				let list = res.list
				this.orderList = this.orderList.concat(list)
				this.total = res.total
			})
		},
		goOrderPay(orderNo){
			this.$router.push({
				path:'/order/pay',
				query:{
					orderNo
				}
			})
		},
		handleChange(currentPage){
			this.pageNum = currentPage
			this.getOrderList()
		},
		loadMore(){
			this.pageNum++
			this.getOrderList()
		}
	}

};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.order-list {
  .wrapper {
		background-color: $colorJ;
		padding: 30px 0 80px;
    .container {
      .order-item {
        background-color: #fff;
				border: 1px solid $colorF;
				margin-bottom: 30px;
        .item-title {
          @include height(74px);
          font-size: 16px;
          background-color: $colorK;
          padding: 0 43px;
          span {
            color: $colorC;
            &:nth-child(2n) {
              margin: 0 10px;
            }
					}
					.pay{
						height: 74px;
						.payment{
							color:$colorC;
							font-size:26px;
						}
					}
					
        }
        .item-body {
					padding:0 43px;				
					.pro-info{
						height: 145px;
						display:flex;
						align-items:center;
						.img{
							width: 69px;
							img{
								width: 100%;
							}
						}
						.pro-title{
							span{
								font-size: 20px;
							}
						}
					}
					.order-status{	
						a{
							display: block;
							height:145px;
							line-height:145px;
							text-align:center;	
							font-size: 20px;
							color: $colorA;
							z-index:10;
						}
					}
        }
      }
			.pagination{
				text-align:right;
			}
			
			.el-pagination.is-background .el-pager li:hover{
				color:$colorA;
			}
			.el-pagination.is-background .el-pager li:not(.disabled).active{
				background-color: $colorA;
				color:#fff;
			}
			.loadingMore{
				text-align:center;
				cursor:pointer;
			}
    }
  }
}
</style>