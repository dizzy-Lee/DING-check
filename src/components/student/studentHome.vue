<template>
  <div class="student-main" ref="student_main">
    <!-- 头部 -->
    
    <div class="header dd-border-bottom" ref="header_top_1">
      <span class="title">作业评价</span>
    </div>
   
    <!-- 验收时间 -->
    <div style="position:absolute;overflow: hidden;top:3.7rem;bottom:0rem;margin:0 auto;width: 100%;" ref="main_wrapper_1">
      <div style="margin:0 auto;">
   
        <div class="reception-time">
          <div class="time">{{this.$store.state.studentHomeShow.time}}</div>
          <div class="reception-count" v-if="this.$store.state.studentHomeShow.count!=''">第 <span>{{this.$store.state.studentHomeShow.count}}</span> 次验收</div>
        </div>
        <!-- 如果当天没有留助教验收作业 通过作业状态来判断-->
        <div class="no-img" v-if="!this.$store.state.studentHomeShow.have_acceptance">
          <img src="../../../static/img/drange.png" alt="" style="width:13.4375rem;height:14rem;display:block;margin:0 auto;margin-top:8.25rem;">
        </div>
           <div v-if="this.$store.state.studentHomeShow.have_acceptance">
        <!-- 详情评价 -->
        <div class="reception-detail">
          <!-- 站位div -->
          <div class="null-div dd-border-bottom">
            <div class="user-img-name">
              <img :src="this.$store.state.IMG" alt="">
              <div>{{this.$store.state.NAME}}</div>
            </div>
          </div>
          <!-- 评价 -->
          <div class="pingjia-detail dd-border-bottom">
            <!-- 评价等级图  ../../../static/img/超神.png-->
            <img :src="isSrcType(this.$store.state.studentHomeShow.type)" alt="" v-if="this.$store.state.studentHomeShow.is_acceptance">
            <!-- 评价名称 -->
            <span class="text" :style="{color:typeColor(this.$store.state.studentHomeShow.type)}" v-if="this.$store.state.studentHomeShow.is_acceptance!='0'">{{this.$store.state.studentHomeShow.type}}</span>
            <!-- 如果是未验收则显示这一行-->
            <span v-if="this.$store.state.studentHomeShow.is_acceptance=='0'" class="no_acceptance">暂未验收</span>
          </div>
          <!-- 作业标签  先判断是不是未验收-->
          <div class="homework-label" v-if="this.$store.state.studentHomeShow.is_acceptance!='0'">
            <div class="title" >作业标签</div>
            <div class="label-detail">
              <div class="label-item" v-for="(item,index) in this.$store.state.studentHomeShow.homework_label" :key="index">
                {{item}}
              </div>
            </div>
          </div>
          <!-- 助教简评 -->
          <div class="tutor-comment" >
            <div class="title" v-if="this.$store.state.studentHomeShow.is_acceptance!='0'">助教简评</div>
            <p v-if="this.$store.state.studentHomeShow.is_acceptance!='0'">{{this.$store.state.studentHomeShow.tutor_comment}}</p>
            <!-- 如果未验收 -->
            <p v-if="this.$store.state.studentHomeShow.is_acceptance=='0'" class="no-tutor-acceptance">你的助教已经饥渴难耐快去找他验收吧！</p>
          </div>
          <!-- 查看历史 -->
          <div class="history" @click="handleLookHistory">
            查看历史记录
          </div>
        </div>
      </div>
      </div>
    </div>
     
    <transition name="side-column">
       <student-history v-if="isShowHistory" :studentHistory="studentHistory"></student-history>
    </transition>
    <loading ref="loading_view"></loading>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import loading from "../loading/loading";
import axios from "axios";
//历史 组件
import studentHistory from "./studentHistory/studentHistory";

export default {
  components: {
    studentHistory,
    loading
  },
  data() {
    return {
      isShowHistory: false,
      studentLatelyData: {},
      studentHistory: []
    };
  },
  methods: {
    //判断等级类型 进行选择图片,
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
          if(this.$store.state.studentHomeShow.is_acceptance=='0'){
            return "";
          }
          
          break;
      }
    },
    //判断相应显示颜色
    typeColor(type) {
      console.log(type)
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
    _getStudentPageHeight() {
      this.$nextTick(() => {
        //获取窗口可视区域高度
        this.$refs.student_main.style.height = window.innerHeight + "px";
        this.$refs.loading_view.isShowLoading = true;
      });
    },
    //打开历史窗口
    handleLookHistory() {
      this.$refs.loading_view.isShowLoading = true;
      axios
        .post("student-load-history", {
          getData: true,
          student_id: this.$store.state.ID
        })
        .then(res => {
          if (res.data) {
            console.log(res.data);
            this.studentHistory = res.data;
            console.log("查看历史记录");
            this.$refs.loading_view.isShowLoading = false;
          }
        });
      this.isShowHistory = true;
    },
    _infoBetterScroll() {
      this.$nextTick(() => {
        this.studScroll = new BScroll(this.$refs.main_wrapper_1, {
          click: true
        });
      });
    },
    //模拟后台数据获取
    _getStudentLatelyData() {
      this.$nextTick(() => {
        axios
          .post("student-load-index", {
            getData: true,
            student_id: this.$store.state.ID
            ,
            time: this.getTimes(5)
          })
          .then(res => {
            console.log(res.data[0].studentLatelyData);
             
              
            if (res.data[0].ok) {
              this.studentLatelyData = res.data[0].studentLatelyData;
              console.log(res.data[0].studentLatelyData);
              // res.data[0].studentLatelyData.homework_label.replace(//g,)
              res.data[0].studentLatelyData.homework_label = res.data[0].studentLatelyData.homework_label.split(
                ","
              );

              this.$store.commit(
                "infoStudentShow",
                res.data[0].studentLatelyData
              );
              this.$refs.loading_view.isShowLoading = false;
            }
          });
      });
    },
  },
  created() {
    this._getStudentPageHeight();
    this._infoBetterScroll();
    this._getStudentLatelyData();
   
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../assets/style/main.less";
.student-main {
  height: 100%;
  background-color: @bg_b_color;
  .header {
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
  .reception-time {
    margin-top: 1rem;
    width: 100%;
    height: 2.56rem;
    .time {
      text-align: center;
      font-family: PingFangSC-Semibold;
      font-size: 1rem;
      color: #03a9f4;
      text-align: center;
      line-height: 1rem;
    }
    .reception-count {
      margin-top: 0.5rem;
      font-family: PingFangSC-Regular;
      font-size: 0.75rem;
      color: #9e9e9e;
      text-align: center;
    }
  }
  .reception-detail {
    position: relative;
    min-height: 22.13rem;
    width: 83.155%;
    margin: 0 auto;
    margin-top: 3.5rem;
    background: #ffffff;
    box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.07),
      0 0.0625rem 0.125rem 0 rgba(0, 0, 0, 0.24);
    border-radius: 0.125rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 2rem; /*2.5rem;*/
    /*这段CSS主要为了站位*/
    .null-div {
      height: 6.38rem;
      width: 100%;
      .user-img-name {
        position: relative;
        margin: 0 auto;
        top: -1.62rem;
        height: 6.005rem;
        width: 6.005rem;
        img {
          display: block;
          margin: 0 auto;
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
        }
        div {
          margin-top: 0.68rem;
          font-family: PingFangSC-Regular;
          font-size: 1rem;
          color: #212121;
          text-align: center;
        }
      }
    }
    .pingjia-detail {
      width: 100%;
      height: 3rem;
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
      text-align: center;
      img {
        height: 3rem;
        width: 3.25rem;
        margin-right: 1rem;
      }
      .text {
        position: relative;
        top: -0.7rem;
        font-family: PingFangSC-Semibold;
        font-size: 32px;
      }
      .no_acceptance {
        font-family: PingFangSC-Semibold;
        font-size: 32px;
        color: #9e9e9e;
        text-align: justify;
      }
    }
    .homework-label {
      min-height: 4rem;
      padding-top: 2rem;
      .title {
        font-family: PingFangSC-Regular;
        font-size: 1rem;
        color: #9e9e9e;
        text-align: justify;
      }
      .label-detail {
        .label-item {
          display: inline-block;
          height: 1.38rem;
          margin-left: 0.5rem;
          margin-top: 1rem;
          min-width: 2.38rem;
          background: @bg_w_color;
          border: 1px solid #eeeeee;
          border-radius: 100px;
          padding: 0.5rem 1rem;
          font-family: PingFangSC-Regular;
          font-size: 1rem;
          color: #212121;
          letter-spacing: 0;
          text-align: center;
        }
      }
    }

    .tutor-comment {
      min-height: 4rem;
      padding-top: 1.1rem;
      .title {
        font-family: PingFangSC-Regular;
        font-size: 1rem;
        color: #9e9e9e;
        text-align: justify;
      }
      p {
        margin-top: 1rem;
      }
      .no-tutor-acceptance {
        padding: 0rem 4.4rem;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #9e9e9e;
        text-align: center;
      }
    }
    .history {
      position: relative;
      top: 1rem;
      height: 2.38rem;
      margin: 0 auto;
      font-family: PingFangSC-Medium;
      font-size: 1rem;
      color: #03a9f4;
      letter-spacing: -0.0244rem;
      text-align: center;
      padding: 0 3rem;
      line-height: 2.38rem;
    }
  }
}
.side-column-enter-active {
  transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0); /* Firefox 4 */
  -webkit-transform: translate3d(0, 0, 0); /* Safari 和 Chrome */
  -o-transform: translate3d(0, 0, 0); /* Opera */
}
.side-column-leave-active {
  transform: translate3d(30rem, 0, 0);
  -moz-transform: translate3d(30rem, 0, 0); /* Firefox 4 */
  -webkit-transform: translate3d(30rem, 0, 0); /* Safari 和 Chrome */
  -o-transform: translate3d(30rem, 0, 0); /* Opera */
}
.side-column-leave-to {
  transform: translate3d(30rem, 0, 0);
  -moz-transform: translate3d(30rem, 0, 0); /* Firefox 4 */
  -webkit-transform: translate3d(30rem, 0, 0); /* Safari 和 Chrome */
  -o-transform: translate3d(30rem, 0, 0); /* Opera */
}
.side-column-enter/* .fade-leave-active below version 2.1.8 */ {
  transform: translate3d(30rem, 0, 0);
  -moz-transform: translate3d(30rem, 0, 0); /* Firefox 4 */
  -webkit-transform: translate3d(30rem, 0, 0); /* Safari 和 Chrome */
  -o-transform: translate3d(30rem, 0, 0); /* Opera */
}
</style>
