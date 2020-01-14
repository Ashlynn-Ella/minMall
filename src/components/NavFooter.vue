<template>
  <div>
    <div class="footer">     
      <div class="footer-nav">
        <div class="footer-logo">
          <img src="/imgs/logo-footer.png" alt />
          小米商城
        </div>
        <div class="footer-link">
					<a href="javascript:;" target="_blank">帮助中心</a>
					<span>|</span>
					<a href="javascript:;" target="_blank">服务支持</a>
					<span>|</span>
					<a href="javascript:;" target="_blank">线下门店</a>
					<span>|</span>
					<a href="javascript:;" target="_blank">关于小米</a>
					<span>|</span>
					<a href="javascript:;" target="_blank">关注我们</a>
					<span>|</span>
					<a href="javascript:;" target="_blank">特殊服务</a>
        </div> 
				<div class="copyright">
					Copyright ©2019 <span class="lingk">mi.futurefe.com</span>  All Rights Reserved.
				</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.footer {
	font-size: 16px;
  border-top: 4px solid $colorA;
  .footer-nav {
    height: 234px;
    background-color: $colorB;
    color: $colorD;
    .footer-logo {
      padding-top: 45px;
      text-align: center;
      margin-bottom: 30px;
      font-size: 16px;
      img {
        display: block;
        width: 53px;
        margin: 0px auto 13px;
      }
		}
		.footer-link{
			text-align: center;
			a{
					color:$colorD; 
					display: inline-block;
				}
			span {
				margin: 0 10px;
			}
		}
		.copyright{
			margin-top: 13px;
			text-align: center;
			.lingk{
				color: $colorA;
			}
		}
  }
}
</style>