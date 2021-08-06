<template>
  <div class="service">
      <div class="container">
        <ul>
          <li>
            <span class="icon-setting"></span>
            预约维修服务
          </li>
          <li>
            <span class="icon-7day"></span>
            7天无理由退货
          </li>
          <li>
            <span class="icon-15day"></span>
            15天免费换货
          </li>
          <li>
            <span class="icon-post"></span>
            满150元包邮
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../assets/scss/config.scss";
@import "../assets/scss/mixin.scss";
.service {
	font-size: 16px;
  .container {
    ul {
      li {
        display: inline-block;
        width: 24.9%;
        padding: 33px 0;
        text-align: center;
        position: relative;
        &:after {
          content: " ";
          width: 1px;
          height: 27px;
          background-color: $colorH;
          position: absolute;
          top: 33px;
          right: 0;
        }
        &:last-child:after {
          display: none;
        }
        span {
          vertical-align: middle;
          margin-right: 4px;
        }
        .icon-setting {
          @include bgImg(20px, 20px, "/imgs/icon-setting.png");
        }
        .icon-7day {
          @include bgImg(20px, 20px, "/imgs/icon-7day.png");
        }
        .icon-15day {
          @include bgImg(20px, 20px, "/imgs/icon-15day.png");
        }
        .icon-post {
          @include bgImg(20px, 20px, "/imgs/icon-post.png");
        }
      }
    }
  }
}
</style>