<template>
<!-- 公共组件 - 统计 -->
  <div class="common-statistics">
    <div class="statistics-list" v-for="(items,index) in data" :key="index">
      <!-- 时间 -->
      <div class="statistics-item-time" v-if="items.detail.length!=0">{{items.date}}</div>
      <!-- 下面 详细统计 -->
      <div class="statistics-item-detail" v-for="(item,index) in items.detail_1" :key="index">
        <div class="statistics-count">
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
          <router-link to="acceptdetails">
          <div @click="handleChangeAssess(items.date, item.count, items.detail)" style="width: 100%; height: 13.94rem; background: red; z-index: 99; position: relative; top: -13.94rem; opacity: 0;"></div>
          </router-link>
      </div>
    
    </div>
        
  </div> 
</template>
<script>
import axios from "axios";

export default {
  props: {
    data:{
      type:[Array,Object]
    },
    studentData:{
      type:[Array,Object]
    }
  },
  data() {
    return {
      teacherDetail: []
    };
  },
  methods: {
    widthInfo(num, type) {
      return `${((type / num) * 327)}%`;
    },
    handleChangeAssess (date, count, detail) {
      this.$store.dispatch('changeAssessData', {date, count, detail})
    }
  },
  created() {
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/style/main.less";
.common-statistics {
  .statistics-list {
    .statistics-item-time {
      font-family: PingFangSC-Regular;
      font-size: 1rem;
      color: #9e9e9e;
      text-align: center;
      line-height: 1rem;
      margin-bottom: 1rem;
      margin-top:1rem;
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
