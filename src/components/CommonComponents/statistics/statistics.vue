<template>
<!-- 公共组件 - 统计 -->
  <div class="common-statistics">
    <div class="statistics-list" v-if="items.detail!=0" v-for="(items,index) in detailData" :key="index" >
      <!-- 时间 -->
      <div class="statistics-item-time">{{items.date}}</div>
      <!-- 下面 详细统计 -->
      <div class="statistics-item-detail" v-for="(item,index) in items.detail_1" :key="index" @click="handleClickDetail(items,item)">
        <div class="statistics-count" >
          第 <span>{{item.count}}</span> 次验收
          <span class="iconfont icon-1">&#xe8d4;</span>
          </div>
          <!-- 统计比例颜色条 -->
          <div class="ratio-div">
            <!-- 未交 -->
            <div class="weijiao" :style="{width:widthInfo((item.weijiao+item.dakeng+item.zhongdeng+item.youxiu+item.chaoshen+item.chajin),item.weijiao)}"></div>
            <!-- 大坑 -->
            <div class="dakeng" :style="{width:widthInfo((item.weijiao+item.dakeng+item.zhongdeng+item.youxiu+item.chaoshen+item.chajin),item.dakeng)}"></div>
            <!-- 差劲 -->
            <div class="chajin" :style="{width:widthInfo((item.weijiao+item.dakeng+item.zhongdeng+item.youxiu+item.chaoshen+item.chajin),item.chajin)}"></div>
            <!-- 中等 -->
            <div class="zhongdeng" :style="{width:widthInfo((item.weijiao+item.dakeng+item.zhongdeng+item.youxiu+item.chaoshen+item.chajin),item.zhongdeng)}"></div>
            <!-- 优秀 -->
            <div class="youxiu" :style="{width:widthInfo((item.weijiao+item.dakeng+item.zhongdeng+item.youxiu+item.chaoshen+item.chajin),item.youxiu)}"></div>
            <!-- 超神 -->
            <div class="chaoshen" :style="{width:widthInfo((item.weijiao+item.dakeng+item.zhongdeng+item.youxiu+item.chaoshen+item.chajin),item.chaoshen)}"></div>
          </div>
          <!-- 具体type 人数 -->
          <div class="number-people">
            <div class="row-1">
             <div class="row-1-1 block">
                <div class="num-type">超神</div>
                <div class="num-p">{{item.chaoshen}} 人</div>
             </div>
             <div class="row-1-2 block">
                <div class="num-type">优秀</div>
                <div class="num-p">{{item.youxiu}} 人</div>
             </div>
             <div class="row-1-3 block">
               <div class="num-type">中等</div>
                <div class="num-p">{{item.zhongdeng}} 人</div>
             </div>
            </div>
            <!-- --------------------------------------- -->
            <div class="row-1" style="margin-top:1rem;">
             <div class="row-1-1 block">
                <div class="num-type">差劲</div>
                <div class="num-p">{{item.chajin}} 人</div>
             </div>
             <div class="row-1-2 block">
                <div class="num-type">大坑</div>
                <div class="num-p">{{item.dakeng}} 人</div>
             </div>
             <div class="row-1-3 block">
               <div class="num-type">未交</div>
                <div class="num-p">{{item.weijiao}} 人</div>
             </div>
            </div>
          </div>
      </div>
    
    </div>
        
  </div> 
</template>
<script>
import axios from "axios";
import main from "../../../assets/js/main.js";
export default {
  props: {
    detailData: {
      type: [Array, Object]
    }
  },
  data() {
    return {
      teacherDetail: []
    };
  },
  methods: {
    widthInfo(num, type) {
      return `${type / num * 327}%`;
    },
    handleClickDetail(items, item) {
      this.$parent.$refs.loading_view_2.isShowLoading = true;
      this.$store.commit("getTeacherDetailDataAndCount", [
        items.date,
        item.count,
        items.detail_1.length
      ]);

      axios
        .post("/api/teacher-load-click", {
          getData: true,
          teacher_id: this.$store.state.ID,
          date: items.date,
          count: item.count
        })
        .then(res => {
          console.log(res.data.detail);
          var data = res.data.detail;

          axios
            .post("/api/dd/student", {
              getData: true,
              userID: this.$store.state.ID
            })
            .then(request => {
              for (let i = 0; i < request.data.userlist.length; i++) {
                for (let j = 0; j < res.data.detail.length; j++) {
                  if (res.data.detail[j].acceptance == true) {
                    for (
                      let k = 0;
                      k < res.data.detail[j].student.length;
                      k++
                    ) {
                      if (
                        res.data.detail[j].tutor ==
                        request.data.userlist[i].userid
                      ) {
                        res.data.detail[j].img =
                          request.data.userlist[i].avatar;
                        res.data.detail[j].name = request.data.userlist[i].name;
                      }
                      if (
                        request.data.userlist[i].userid ==
                        res.data.detail[j].student[k].studentID
                      ) {
                        res.data.detail[j].student[k].img =
                          request.data.userlist[i].avatar;
                        res.data.detail[j].student[k].name =
                          request.data.userlist[i].name;
                        if (res.data.detail[j].student[k].img == "") {
                          res.data.detail[j].student[k].img =
                            "../../../../static/img/蕉迟但到.jpg";
                        }
                      }
                    }
                  } 
                }
              }
              for (let i = 0; i < request.data.userlist.length; i++) {
                for (let j = 0; j < res.data.detail.length; j++) {
                  if (res.data.detail[j].acceptance == false) {
                    for(let k = 0;k<res.data.detail[j].student.length;k++){
                      if(res.data.detail[j].tutor==request.data.userlist[i].userid){
                         res.data.detail[j].img = request.data.userlist[i].avatar;
                        res.data.detail[j].name = request.data.userlist[i].name;
                      }
                      if(res.data.detail[j].student[k].student==request.data.userlist[i].userid){
                        res.data.detail[j].student[k].img = request.data.userlist[i].avatar;
                         res.data.detail[j].student[k].name = request.data.userlist[i].name;
                         if(res.data.detail[j].student[k].img == ""){
                            res.data.detail[j].student[k].img = "../../../../static/img/蕉迟但到.jpg";
                         }
                      }
                    }
                  } 
                }
              }

















              this.$store.commit("getTeacher_Detail", res.data.detail);
              this.$parent.$refs.loading_view_2.isShowLoading = false;
            })
            .catch(err => {
              this.youth.toast("嘤嘤嘤~~~获取数据失败了！不背锅", true);
            });
        });
      this.$parent.$data.isShowTeacherDetail = true; //进入老师验收详情
    },
    //请求管理的用户头像 名称等内容信息,
    getTeacherGuanUser(data) {
      axios
        .post("/api/dd/student", {
          getData: true,
          userID: this.$store.state.ID
        })
        .then(request => {
          let resDataLength = request.data.userlist.length;
          let dataLength = data.length;
          for (let i = 0; i < resDataLength; i++) {
            for (let j = 0; j < dataLength; j++) {
              for (let k = 0; k < data[j].student.length; k++) {
                if (
                  request.data.userlist[i].userid ==
                  data[j].student[k].studentID
                ) {
                  data[j].student[k][img] = request.data.userlist[i].avatar;
                  data[j].student[k][name] = request.data.userlist[i].name;
                }
              }
            }
          }
        })
        .catch(err => {
          this.youth.toast("嘤嘤嘤~~~获取数据失败了！不背锅", true);
        });
    }
  },
  created() {}
};
</script>
<style lang="less" scoped>
@import "../../../assets/style/main.less";
.common-statistics {
  .statistics-list {
    .statistics-item-time {
      font-family: PingFangSC-Regular;
      font-size: 1rem;
      color: #9e9e9e;
      text-align: center;
      line-height: 1rem;
      margin-bottom: 1rem;
      margin-top: 1rem;
    }
    .statistics-item-detail {
      height: 13.94rem;
      background: @bg_w_color;
      box-shadow: 0 0.125rem 4px 0 rgba(0, 0, 0, 0.07),
        0 0.0625rem 2px 0 rgba(0, 0, 0, 0.24);
      border-radius: 0.125rem;
      margin-bottom: 0.5rem;
      .statistics-count {
        position: relative;
        height: 1rem;
        padding: 1.5rem 1.5rem;
        padding-right: 1.57rem;
        font-family: PingFangSC-Regular;
        font-size: 1rem;
        color: #212121;
        letter-spacing: 0;
        line-height: 1rem;
        .icon-1 {
          position: absolute;
          right: 1.57rem;
        }
      }
      .ratio-div {
        height: 1.5rem;
        padding: 0rem 1.5rem;
        display: flex;
        margin: 0 auto;
        justify-content: center;

        .weijiao {
          background-color: #333333;
          width: 10%;
        }
        .dakeng {
          background-color: #e91e63;
          width: 20%;
        }
        .chajin {
          background-color: #f5a623;
          width: 10%;
        }
        .zhongdeng {
          background-color: #03a9f4;
          width: 30%;
        }
        .youxiu {
          background-color: #3ccf87;
          width: 10%;
        }
        .chaoshen {
          background-color: #cddc39;
          width: 20%;
        }
      }
      .number-people {
        padding: 0rem 3rem;
        height: 5.5rem;
        padding-top: 1.44rem;
        padding-bottom: 1.5rem;

        .row-1 {
          display: flex;
          justify-content: space-around;
          height: 2.25rem;
          .block {
            height: 2.25rem;
            width: 2.5rem;
            text-align: center;
            .num-type {
              font-family: PingFangSC-Regular;
              font-size: 0.75rem;
              color: #888888;
              letter-spacing: 0;
              line-height: 0.75rem;
              margin-bottom: 0.5rem;
            }
            .num-p {
              font-family: PingFangSC-Regular;
              font-size: 16px;
              color: #03a9f4;
              letter-spacing: 0;
              line-height: 16px;
            }
          }
          .row-1-1 {
          }
          .row-1-2 {
          }
          .row-1-3 {
          }
        }
      }
    }
  }
}
</style>
