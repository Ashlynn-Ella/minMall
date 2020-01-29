<template>
    <div class="loading">
        <img src="/imgs/loading-svg/loading-bars.svg">
    </div>
</template>

<script>
export default {
    name:'loading'
}
</script>

<style lang="scss">
    .loading{
        height: 80px;
        text-align: center;
        line-height: 80px;
        margin:30px 0;
        img{
            width: 100%;
            height: 100%;
        }
    }
</style>