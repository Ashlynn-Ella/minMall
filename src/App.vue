<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import cookie from "vue-cookie";
import { onMounted,getCurrentInstance } from "vue";
export default {
  setup() {
    const {ctx} = getCurrentInstance()
    const getUser = () => {
      ctx.$axios.get("/user").then((res) => {
        ctx.$store.commit("saveUserName", res.username);
      });
    };
    const getCarts = () => {
      ctx.$axios.get("/carts/products/sum").then((res) => {
        ctx.$store.commit("getCartCount", res);
      });
    };
    onMounted(() => {
      getUser()
      if (cookie.get("userId")) {
        getUser();
        getCarts();
      }
    });
    return {
      getCarts,
      getUser,
    };
  },
};
</script>

<style lang="scss">
@import "./assets/scss/reset.scss";
@import "./assets/scss/config.scss";
@import "./assets/scss/button.scss";
</style>
