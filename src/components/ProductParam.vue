<template>
    <div class="product-params" :class="{'is_fixed':isFixed}">
        <div class="container">
            <div class="item-left">
                <a href="javascript:;" class="title">{{title}}</a>
                <span>|</span>
                <a href="javascript:;">小米8</a>
                <span>|</span>
                <a href="javascript:;">小米8</a>
            </div>
            <div class="item-right">
                <a href="javascript:;">概述</a>
                <span>|</span>
                <a href="javascript:;">参数</a>
                <span>|</span>
                <a href="javascript:;">用户评价</a>
                <slot name="buy"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {   
            isFixed:false
        }
    },
    props:{
        title:String
    },
    mounted(){
        window.addEventListener('scroll',this.initHeight)
    },
    methods:{
        
        initHeight(){
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
            this.isFixed = scrollTop > 152 ? true : false
        }
    },
    destroyed(){
        window.removeEventListener('scroll',this.initHeight)
    }
}
</script>

<style lang="scss">
@import "../assets/scss/config.scss";
@import "../assets/scss/mixin.scss";
    .product-params{
        padding: 26px 0 28px;
        border-top: 1px solid $colorH;
        background-color:$colorG; 
        &.is_fixed{
            position: fixed;
            top: 0;
            width:100%;
            box-shadow:0 5px 5px $colorE;
            z-index:10;
        }
        .container{
            @include flex();
            color: $colorC;
            a{
                color: $colorC;
                font-size: 14px;
                &.title{
                    font-size: 18px;
                    color:$colorB;
                    font-weight:700;
                } 
            }
            span{
                    font-size: 10px;
                    margin: 0px 11px;
                    color:$colorD;
            }

        }
    }
</style>