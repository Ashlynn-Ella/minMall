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
     data:''
    }
  },
  mounted() {
    // this.data = Storage.getItem('mall')
    // storage.setItem('cars',{name:'zs',type:1},'user')
    // storage.clear('a','user')
    
  }

}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/config.scss';
@import './assets/scss/button.scss';

</style>
