<template>
    <div class="no-data">
        <img src="/imgs/icon-no-data.png" alt="">
        <p>暂无提交的订单记录.</p>
    </div>
</template>

<script>
export default {
    name: 'noData'
}
</script>

<style lang="scss">
    .no-data{
        background-color: #F5F5F5;
        font-size: 20px;
        color: #999999;
        text-align: center;
        margin: 50px 0;
        img{
            width: 260px;
            height: 184px;
        }
    }
</style>