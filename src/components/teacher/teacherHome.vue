<template>
  <div class="teacher-home">
    <div class="header dd-border-bottom" ref="header_top_1">
      <span class="title">作业验收</span>
    </div>
     <div style="position:absolute;overflow: hidden;top:3.5rem;bottom:0rem;margin:0 auto;width: 100%;" ref="teacher_wrapper_1">
      <div style="margin:0 auto;">
    <div class="user-info" @click="addReq">
       <img class="user-img" :src="this.$store.state.IMG" alt="">
       <div class="user-name">{{this.$store.state.NAME}}</div>
       <v-button type="primary" style="margin-top:0.5rem;" @click.native="exportExcel">导出表</v-button>
    </div>
        <statistics :detailData="this.$store.state.teacherShow"></statistics>
      </div>
     </div>
    <loading ref="loading_view_2"></loading>
    <transition name="side-column">
      <teacher-detail v-if="isShowTeacherDetail"></teacher-detail>
    </transition>
      <transition name="side-column">
      <teacher-student v-if="isShowTeacherStudent"></teacher-student>
    </transition>
      <transition name="side-column">
      <assess v-if="isShowAssess"></assess>
    </transition>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import statistics from "../CommonComponents/statistics/statistics";
import axios from "axios";
import loading from "../loading/loading";
import main from "../../assets/js/main.js";
import teacherDetail from "./teacherDetail";
import teacherStudent from "./teacherStudent";
import assess from "./assess";
//格式化数据结构

export default {
  components: {
    statistics,
    loading,
    teacherDetail,
    teacherStudent,
    assess
  },
  data() {
    return {
      data: {},
      isShowTeacherDetail: false,
      isShowTeacherStudent: false,
      isShowAssess: false,
      code: ''
    };
  },
  methods: {
    //导出Excel表,
    exportExcel(){
    
      axios.post("/api/excel",{
        getData:true,
        teacher_id:this.$store.state.ID,
        date:this.getTimes(5)
      }).then(res=>{
        // alert(JSON.stringify(res.data))
        window.location.href = `http://10.2.5.1:3000/${res.dara}`;
      })
    },
    _infoBscroll() {
      this.$nextTick(() => {
        this.teacher_scroll = new BScroll(this.$refs.teacher_wrapper_1, {
          click: true
        });
        this.$refs.loading_view_2.isShowLoading = true;
      });
    },
    //获取统计数据
    _getInfoData() {
      
      axios
        .post("/api/teacher-load-index", {
          teacher_id: this.$store.state.ID,
          getData: true
        })
        .then(res => {
          // this.data = res.data.reverse();
          this.data = main.formatData(res.data);
         

          this.$store.commit("getInfoData", this.data); //发送到Vuex里面存储

          this.$refs.loading_view_2.isShowLoading = false;
        })
        .catch(err => {
          this.youth.toast("应用不知道为什么宕机了,不背锅！", true);
          this.$refs.loading_view_2.isShowLoading = false;
        });
    },
    
    addReq() {},
  },
  created() {
    this._infoBscroll();
    this._getInfoData();
   
   
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/style/main.less";
.teacher-home {
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
  .user-info {
    height: 11rem;
    // padding: 0rem 8.25rem;
    text-align: center;
    .user-img {
      margin-top: 2rem;
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
    }
    .user-name {
      margin-top: 0.5rem;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #212121;
    }
  }
}
</style>
