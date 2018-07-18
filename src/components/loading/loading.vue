<template>
<transition name="fade">
  <!-- <div style="width:100%;height:100%;background-color:rgba(0,0,0,0.4);position:relative;z-index:999;" > -->
    <div class="loading-item" v-if="isShowLoading">
      <div class="spinner">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
      </div>
      <div style="color:#fff;font-size:1rem;margin-top:0.3125rem;">正在加载...</div>
  </div>
  <!-- </div> -->
  </transition>
</template>
<script>
export default {
  props: {
    isShowLoading: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.loading-item {
  position: absolute;
  width: 7.25rem;
  height: 7.25rem;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 1rem;
  text-align: center;
  left: 50%;
  top: 50%;
  z-index:9999;
  transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  .spinner {
    margin: 0 auto;
    margin-top: 1rem;
    height: 60px;
    text-align: center;
    font-size: 10px;
  }

  .spinner > div {
    background-color: #fff;
    height: 100%;
    width: 6px;
    margin-right: 0.4375rem;
    display: inline-block;
    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
    animation: stretchdelay 1.2s infinite ease-in-out;
  }

  .spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  .spinner .rect3 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }

  @-webkit-keyframes stretchdelay {
    0%,
    40%,
    100% {
      -webkit-transform: scaleY(0.4);
    }
    20% {
      -webkit-transform: scaleY(1);
    }
  }

  @keyframes stretchdelay {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
      -webkit-transform: scaleY(1);
    }
  }
}
</style>
