<template>
  <div class="student-history">
    <div class="header dd-border-bottom" ref="header_top_1">
      <span style="padding:1rem;line-height:1.5rem;position:absolute;left:0;margin-left:0.5rem;" class="iconfont" @click="clickBlack">&#xe600;</span>
      <span class="title">历史记录</span>
    </div>
    <div style="position:absolute;overflow: hidden;top:4rem;bottom:0rem;margin:0 auto; width: 100%;" ref="history_wrapper_1">
      <div style="margin:0 auto;">
        <div class="history-item" v-for="(items,index) in studentHistory" :key="index">
          <div class="history-time">{{items.date}}</div>
          <div class="wrapper-item" >
            <div class="list-item" v-for="item in items.detail" @click="handleShowStudentData(items,item)" v-if="item.evaluate!='未交'">
              <!-- 类型图片 -->
              <img :src="isSrcType(item.evaluate)" alt="">
              <!-- 类型文字 -->
              <div class="type-item"  :style="{color:typeColor(item.evaluate)}">{{item.evaluate}}</div>
              <!-- 第几次验收 -->
              <div class="count-item">第 <span>{{item.count}}</span> 次验收</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading ref="loading_view_2"></loading>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import axios from "axios";
import loading from '@/components/loading/loading';
export default {
  components:{
    loading
  },
  props: {
    studentHistory: {
      type: [Array, Object]
    }
  },
  methods: {
    isSrcType(type) {
      switch (type) {
        case "超神":
          return "../../../static/img/超神.png";
          break;
        case "中等":
          return "../../../static/img/中等.png";
          break;
        case "优秀":
          return "../../../static/img/优秀.png";
          break;
        case "差劲":
          return "../../../static/img/差劲.png";
          break;
        case "大坑":
          return "../../../static/img/大坑.png";
          break;
        case "未交":
          return "../../../static/img/未交.png";
          break;
      }
    },
    typeColor(type){
       switch (type) {
        case "超神":
          return "#CDDC39";
          break;
        case "中等":
          return "#03A9F4";
          break;
        case "优秀":
          return "#3CCF87";
          break;
        case "差劲":
          return "#F5A623";
          break;
        case "大坑":
          return "#E91E63";
          break;
        case "未交":
          return "#333333";
          break;
      }
    },
    _getHisotryPageHeight() {
      this.$nextTick(() => {
        //获取窗口可视区域高度
      });
    },
    clickBlack() {
      //获取他的父组件的data里面的数据 并且修改
      this.$parent.$data.isShowHistory = false;
      console.log(this.$parent.$data.isShowHistory);
      //  console.log(this.$refs.student_main.isShowHistory);
    },
    _getInfoHistory() {
      this.$nextTick(() => {
        this.historyScroll = new BScroll(this.$refs.history_wrapper_1, {
          click: true
        });
       
      });
    },
    //展示详细验收评价数据
    handleShowStudentData(items, item) {
        this.$parent.$refs.loading_view.isShowLoading = true;
      event = event || window.event;
      // let obj = {
      //   type: "优秀",
      //   count: 1,
      //   homework_label: ["牛逼6666", "哎呦不错哦"],
      //   tutor_comment:
      //     "我看见了你这段时间努力，成果不错，继续努力，不要放弃！加油！",
      //   time: "2018 / 07 / 10",
      //   is_acceptance: true,
      //   have_acceptance: true
      // };
      axios
        .post("/api/student-load-query", {
          getData: true,
          student_id: this.$store.state.ID,
          date: items.date,
          count: item.count
        })
        .then(res => {
          if (res.data[0].ok) {
            console.log(res.data[0].studentLatelyData);
            res.data[0].studentLatelyData.homework_label = res.data[0].studentLatelyData.homework_label.split(',');
            this.$store.commit("changeShowStudent", res.data[0].studentLatelyData);
            this.$parent.$data.isShowHistory = false;
            this.$parent.$refs.loading_view.isShowLoading = false;
          }
        });
    }
  },
  created() {
    this._getInfoHistory();
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/style/main.less";
.student-history {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  transition-duration: 0.5s;
  background-color: @bg_b_color;
  .header {
    position: relative;
    justify-content: space-around;
    background-color: @bg_w_color;
    height: 3.5rem;
    // border: 1px solid #eeeeee;
    text-align: center;
    .title {
      line-height: 3.5rem;
      font-family: PingFangSC-Regular;
      font-size: 1rem;
      color: #212121;
      text-align: center;
    }
  }
  .history-item {
    margin-top: 1.5rem;
    min-height: 11.76rem;

    padding: 0rem 0rem 0rem 1.5625rem;
    .history-time {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #9e9e9e;
      text-align: justify;
    }
    .wrapper-item {
      margin-top: 0.2rem;
      min-height: 1rem;
    }

    .list-item {
      display: inline-block;
      margin-top: 0.8rem;
      height: 5.38rem;
      width: 4rem;
      background: @bg_b_color;
      box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.07),
        0 0.0625rem 0.125rem 0 rgba(0, 0, 0, 0.24);
      border-radius: 0.125rem;
      padding: 1.5rem 3rem;
      margin-right: 0.5rem;

      img {
        display: block;
        width: 2rem;
        height: 2rem;
        margin: 0 auto;
        margin-bottom: 0.5rem;
      }
      .type-item {
        font-family: PingFangSC-Semibold;
        font-size: 1rem;
        color: #3ccf87;
        line-height: 1rem;
        text-align: center;
        margin-bottom: 1rem;
      }
      .count-item {
        font-family: PingFangSC-Regular;
        font-size: 0.75rem;
        color: #9e9e9e;
        line-height: 0.875rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    /*适用于小屏幕也能正常一行两个的显示*/
    @media screen and (max-width: 22.9375rem) {
      .list-item {
        display: inline-block;
        margin-top: 0.8rem;
        height: 4.38rem;
        width: 3rem;
      }
    }
    @media screen and (max-width: 20.9375rem) {
      .list-item {
        width: 2rem;
      }
    }
  }
}
</style>
