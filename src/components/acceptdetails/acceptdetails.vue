<template>
  <div class="details">
    <div class="home_header dd-border-bottom">
      <p class="home_header_title iconfont">
        <router-link to="/totur">
          <span class="title_back" @click="gotutor">&#xe600;</span>
        </router-link>
        <span>作业验收</span>
      </p>
    </div>

    <p class="details_time"><span>{{this.$store.state.date}}</span><span style="float: right; margin-right: 6.4%">第 {{this.$store.state.count}} 次</span></p>
    <div class="unaccept">
      <p class="unaccept_title">未验收</p>
      <unaccept>
      </unaccept>
    </div>
    <div class="accepted">
      <p class="accepted_title">已验收</p>
      <accepted>
      </accepted>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import unaccept from "./unaccept";
import accepted from "./accepted";
import BScroll from "better-scroll";
export default {
  name: "acceptdetails",
  components: {
    unaccept,
    accepted
  },
  data() {
    return {
      tutor_id: "1129613523758071",
      tutor_name: "杜鹏宇",
      tutor_img:
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=16550438,2220103346&fm=27&gp=0.jpg",
      homework_lable: [],
      tutor_commit: "",
      type: "一般",
      time: "2018 / 7 / 09"
    };
  },
  methods: {
    gotutor() {
      this.$parent.$data.$isShowAcceptDetails = false;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/style/main.less";

.details {
  font-family: PingFangSC-Semibold;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 50;
  overflow: auto;
  transition-duration: 0.5s;
  .home_header {
    width: 100%;
    height: 3.38rem;
    background: #ffffff;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    .home_header_title {
      padding-top: 1rem;
      font-size: 16px;
      color: #212121;
      .title_back {
        float: left;
        line-height: 1.5rem;
        position: relative;
        left: 6.4%;
        color: #000000;
        font-size: 1rem;
      }
    }
  }
  .details_time {
    font-size: 1.5rem;
    color: #03a9f4;
    margin-left: 6.4%;
    margin-top: 5rem;
    margin-bottom: 2rem;
  }
  .unaccept {
    border-radius: 0.125rem;
    // display: none;
    .unaccept_title {
      font-size: 1rem;
      color: #9e9e9e;
      line-height: 1rem;
      margin-left: 6.4%;
      margin-bottom: 1rem;
    }
  }
  .accepted {
    border-radius: 0.125rem;
    margin-top: 2rem;
    .accepted_title {
      font-size: 1rem;
      color: #9e9e9e;
      line-height: 1rem;
      margin-left: 6.4%;
      margin-bottom: 1rem;
    }
  }
}
</style>
