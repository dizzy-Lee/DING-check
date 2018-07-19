<template>
  <div class="teacher-detail">
    <div class="header dd-border-bottom" ref="header_top_1">
      <span style="padding:1rem;line-height:1.5rem;position:absolute;left:0;margin-left:0.5rem;" class="iconfont" @click="clickBlack">&#xe600;</span>
      <span class="title">作业验收</span>
    </div>
    <div class="time-count">
      <div class="time">{{this.$store.state.teacherDetail[0]}}</div>
      <div class="count">
        <span class="iconfont icon-1" @click="sub">&#xe600;</span>
        第 <span>{{this.$store.state.teacherDetail[1]}}</span> 次
        <span class="iconfont icon-2" @click="add">&#xe600;</span>
      </div>
    </div>
      <div style="position:absolute;overflow: hidden;top:12rem;bottom:0rem;margin:0 auto;width: 100%;" ref="teacher_detail_1">
      <div style="margin:0 auto;">
      <div class="yes-item">已创建验收</div>
        <div class="yes-item-div">
          <!-- 助教... -->
          <div v-for="(items,index) in this.$store.state.teacher_Detail" :key="index">
          <div class="tutor-item dd-border-bottom">
            <img :src="items.img" alt="这没有头像">
            <div class="tutor-name-id">
              <div style="font-family: PingFangSC-Medium;font-size: 16px;color: #212121;line-height: 18px;">{{items.name}}</div>
              <div style="ont-family: PingFangSC-Medium;font-size: 12px;color: #888888;line-height: 14px;margin-top:0.5rem;">助教</div>
            </div>
          </div>
          <!-- 验收与未验收（这不是为创建验收 而是 已经创建了但是有没有被验收的） -->
          <div class="student-item" v-for="(item,index) in items.student" :key="index" @click="hanldeStudentDetail(item)">
            <img class="student-img" :src="isStudentSrc(item)" alt="">
            <div class="student-detail-type">
              <span style="font-family: PingFangSC-Medium;font-size: 1rem;color: #212121;line-height:3rem;">{{item.name}}</span>
              <img width="24" height="24" :src="isSrcType(item)"  alt="">
              <span style="font-family: PingFangSC-Semibold;font-size: 1rem;color: #3CCF87;line-height: 1rem;line-height:3rem;position:absolute;right:2rem;" :style="{color:typeColor(item.evaluate)}">{{ifAccept(item)}}</span>
              <span class="iconfont icon" style="position:absolute;line-height:3rem;right:0rem;">&#xe88e;</span>
            </div>
          </div>
            </div>
        </div>
         <!-- 未创建验收的 -->
         <div v-show="this.$store.state.teacher_Detail_2 === undefined || this.$store.state.teacher_Detail_2.length == 0">
         <div class="no-item">未创建验收的</div>
          <div class="no-item-div">
            <div class="" v-for="(items,index) in this.$store.state.teacher_Detail_2" :key="index">
              <div class="tutor-no-item dd-border-bottom">
              <img :src="items.img" alt="这TM没有头像">
              <div class="tutor-name-id">
                <div style="font-family: PingFangSC-Medium;font-size: 16px;color: #212121;line-height: 18px;">{{items.name}}</div>
                <div style="ont-family: PingFangSC-Medium;font-size: 12px;color: #888888;line-height: 14px;margin-top:0.5rem;">助教</div>
              </div>
            </div>
            <!-- 123321123231 -->
              <div class="student-item" v-for="(item,index) in items.student" :key="index">
                <img class="student-img" :src="item.img" alt="">
                <div class="student-detail-type">
                  <span style="font-family: PingFangSC-Medium;font-size: 1rem;color: #212121;line-height:3rem;">{{item.name}}</span>
                </div>
              </div>
            </div>
          </div>
          </div>
      </div>
      </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  methods: {
    clickBlack() {
      this.$parent.$data.isShowTeacherDetail = false;
    },
    isStudentSrc(item) {
      if (item.img == "") {
        return "../../../static/img/蕉迟但到.jpg";
      } else {
        return item.img;
      }
    },
    ifAccept(item) {
      switch (item.evaluate) {
        case "超神":
          return "超神";
          break;
        case "中等":
          return "中等";
          break;
        case "优秀":
          return "优秀";
          break;
        case "差劲":
          return "差劲";
          break;
        case "大坑":
          return "大坑";
          break;
        case "未交":
          if (item.acceptance == "0") {
            return "未验收";
          } else {
            return "未交";
          }
          break;
      }
    },
    isSrcType(item) {
      switch (item.evaluate) {
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
          if (item.acceptance == "0") {
            return "../../../static/img/未交.png";
          } else {
            return "../../../static/img/未交.png";
          }

          break;
      }
    },
    //判断相应显示颜色
    typeColor(type) {
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
    hanldeStudentDetail(item) {
      this.$parent.$data.isShowTeacherStudent = true;
      this.$store.commit("getTeacherStudent", item); //获取学生信息
    },
    sub() {
      this.$parent.$refs.loading_view_2.isShowLoading = true;
      this.$store.commit("subCount", 1);
      setTimeout(() => {
        this.$parent.$refs.loading_view_2.isShowLoading = false;
      }, 1000);
    },
    add() {
      this.$parent.$refs.loading_view_2.isShowLoading = true;
      this.$store.commit("addCount", 1);
      setTimeout(() => {
        this.$parent.$refs.loading_view_2.isShowLoading = false;
      }, 1000);
    }
  },
  created() {
    this.$nextTick(() => {
      this.teacher_scroll = new BScroll(this.$refs.teacher_detail_1, {
        click: true
      });
    });
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/style/main.less";
.teacher-detail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: @bg_b_color;
  transition-duration: 0.5s;
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
  .time-count {
    padding-top: 2rem;
    height: 6.3rem;
    .time {
      font-family: PingFangSC-Semibold;
      font-size: 24px;
      color: #03a9f4;
      text-align: center;
      margin-bottom: 1.19rem;
    }
    .count {
      width: 60%;
      height: 1rem;
      font-family: PingFangSC-Regular;
      font-size: 1rem;
      color: #212121;
      text-align: center;
      margin: 0 auto;
      justify-content: space-around;
      display: flex;
      .icon-1 {
        margin-right: 3rem;
      }
      .icon-2 {
        margin-left: 3rem;
        transform: rotate(180deg);
        position: relative;
        top: 0.16rem;
      }
    }
  }
  .yes-item {
    padding-left: 1rem;
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #9e9e9e;
    line-height: 1rem;
    margin-bottom: 1rem;
  }
  .yes-item-div {
    background: #ffffff;
    box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.07),
      0 0.0625rem 0.125rem 0 rgba(0, 0, 0, 0.24);
    border-radius: 0.125rem;
    padding: 1.5rem;
    position: relative;
    .tutor-item {
      height: 3rem;
      padding-bottom: 1rem;
      margin-bottom: 1rem;
      img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        display: inline-block;
      }
      .tutor-name-id {
        padding-left: 1rem;
        position: relative;
        top: -0.3rem;
        display: inline-block;
      }
    }
  }
  .student-item {
    position: relative;
    padding: 0.5rem 0rem;
    padding-top: 0rem;
    height: 3rem;
    display: flex;
    .student-img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
    .student-detail-type {
      height: 3rem;
      flex: 1;
      padding-left: 1rem;
      display: flex;
      img {
        width: 1.5rem;
        height: 1.5rem;
        position: absolute;
        top: 0.8rem;
        right: 5.5rem;
        line-height: 3rem;
      }
    }
  }
}
.no-item {
  padding-left: 1rem;
  font-family: PingFangSC-Regular;
  font-size: 1rem;
  color: #9e9e9e;
  line-height: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
.no-item-div {
  background: #ffffff;
  box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.07),
    0 0.0625rem 0.125rem 0 rgba(0, 0, 0, 0.24);
  border-radius: 0.125rem;
  padding: 1.5rem;
  position: relative;
  .tutor-no-item {
    height: 3rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: inline-block;
  }
  .tutor-name-id {
    padding-left: 1rem;
    position: relative;
    top: -0.3rem;
    display: inline-block;
  }
}
</style>
