<template>
    <div>
       <div class="order">
           <div class="container clearfix">
                <div class="header-logo">
                    <a href="/#/index"></a>
                </div>
                <div class="order-title">
                    <h2>{{title}}<slot name="cart-point"></slot></h2>
                </div>
                
                <div class="user">
                    <a href="javascript:;">{{username}}</a>
                </div>
           </div>
       </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props:{
        title:String
    },
    computed:{
        ...mapState(['username'])
    }
}
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
    .order{
        height: 112px;
        border-bottom: 2px solid $colorA;
        padding:30px 0;
        .container{
            .header-logo {
                float:left;                   
            }
            .order-title{
                float:left;
                margin-left: 54px;                
                color: $colorB;
                margin-right: 17px;
                height:55px;
                line-height:55px;
                h2{
                    font-size: 28px;
                    span{
                        font-size: 14px;
                        color:#999;
                        font-weight:200;
                        margin-left:17px;
                    }
                }
            }
            .user{
                float:right;
                line-height:55px;
                a{
                    font-size:16px;
                    color:$colorC;
                }
            }
        }
    }
</style>