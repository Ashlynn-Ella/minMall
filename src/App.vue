<template>
  <div id="app">
    <router-view></router-view>   
  </div>
</template>

<script>
// import storage from './Storage/index'
export default {
  data() {
    return {
     
    }
  },
  created() {
    // this.data = Storage.getItem('mall')
    // storage.setItem('cars',{name:'zs',type:1},'user')
    // storage.clear('a','user')
    if(this.$cookie.get('userId')){
      this.getUser() 
      this.getCarts() 
    }
     
  },
  methods:{
    getUser() {
      this.axios.get('/user').then((res={})=>{
        this.$store.dispatch('saveUserName', res.username)
      })
    },
    getCarts() {
      this.axios.get('/carts/products/sum').then((res=0)=>{
        this.$store.dispatch('getCartCount', res)
      })
    }
  }

}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/config.scss';
@import './assets/scss/button.scss';

</style>
