<template>
  <div class="login">
    <div class="container">
      <div class="logo">
        <a href="/#/index">
          <img src="/imgs/login-logo.png" alt />
        </a>
      </div>
    </div>
    <div class="warp">
      <div class="container">
        <div class="login-box">
          <div class="header">
            <h3>
              <a>账号登录</a>
              <span></span>
              <a>扫码登录</a>
            </h3>
          </div>
          <div class="login-body">
            <div class="login-item">
              <input type="text" placeholder="请输入账号" v-model="username" />
            </div>
            <div class="login-item">
              <input type="password" placeholder="请输入密码" v-model="password" />
            </div>
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn btn-large" @click="login">登录</a>
          </div>
          <div class="tips">
            <a href="javascript:;">手机短信登录/注册</a>
            <a href="javascript:;">
              <span>立即注册</span>
              <span>|</span>
              <span>忘记密码</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="login-footer">
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
        Copyright ©2019
        <span class="lingk">mi.futurefe.com</span> All Rights Reserved.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      username:'',
      password:'',
      userId:''
    }
  },
  mounted(){
    
  },
  methods:{
    login(){
      if(!this.username || !this.password){
        alert('请输入账号或者密码')
      }
      let { username,password } = this
      this.axios.post('/user/login',{
        username,password
      }).then((res)=>{
        this.$cookie.set('userId', res.id, { expires: '1M' });
        this.store.dispatch('saveUserName', res.username)
        this.$router.push('/index/')
      })
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/config.scss";
@import "../assets/scss/mixin.scss";
.login {
  width: 100%;
  .logo {
    height: 112px;
  }
  .container {
    position: relative;
  }
  .warp {
    width: 100%;
    height: 576px;
    background: url("/imgs/login-bg.jpg") center;
    background-size: cover;
    .login-box {
      padding: 0 31px;
      width: 410px;
      height: 510px;
      position: absolute;
      top: 37px;
      right: 0px;
      background-color: $colorG;
      .header{       
        padding: 40px 0;
        text-align: center;
        color:$colorC;
        h3{
          font-size: 24px;
          line-height: 24px;
          span{
          display: inline-block;
          margin: 0 34px;
          width: 2px;
          height: 24px;
          background-color: $colorF;
          vertical-align: middle;
          }
          a:first-child{
            color:$colorA;
          }
        }
      }
      .login-body{
        .login-item{
            height: 50px;
            width: 100%;
            margin-bottom: 20px;
            border: 1px solid $colorH;
          input{
            width: 100%;
            height: 100%;
            padding-left: 17px;
            font-size: 14px;
            color: $colorD;
            border:none;
          }
          &:last-child{
            margin-bottom: 30px;
          }
        }
        
      }
    }
    .btn-box{
      width: 100%;
      margin-bottom: 14px;
      .btn{
        width: 100%;
        font-size: 16px;
      }
    }
    .tips{
      @include flex();

      a{
        color: $colorA;
        font-size: 14px;
        &:last-child{
          color: $colorD;
          span{
            font-size: 14px;
            margin: -2px 7px 0;
          }
        }
      }
    }
  }
  .login-footer {
      height: 100px;
      color:$colorD;
      font-size: 16px;
      padding-top: 60px;
    .footer-link {
      text-align: center;
      a {
        color: $colorD;
        display: inline-block;
      }
      span {
        margin: 0 10px;
      }
    }
    .copyright {
      margin-top: 13px;
      text-align: center;
      .lingk {
        color: $colorA;
      }
    }
  }
}
</style>