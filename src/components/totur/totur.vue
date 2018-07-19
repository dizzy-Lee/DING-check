<template>
  <div class="home" ref="totur_home">
    <div class="home_header dd-border-bottom">
      <p class="home_header_title">作业验收</p>
    </div>
    <div style="position:absolute;overflow: hidden;top:4rem;bottom:0rem;margin:0 auto; width: 100%;" ref="tutor_view_1">
      <div style="margin:0 auto;">
      <div class="home_avatar content">
        <v-avatar size="large" :src="this.$store.state.IMG"></v-avatar>
        <p class="home_avatar_name">{{this.$store.state.NAME}}</p>
        <v-button type="primary" @click="newAccept">新建验收</v-button>
      </div>
        <statistics
          :data="this.$store.state.studentHomeData"
          :studentData="studentData"
        >
        </statistics>
      </div>
   </div>
   
     </div>
</template>

<script>
import axios from "axios";
import statistics from "./statistics";
import main from "../../assets/js/main.js";
import BScroll from "better-scroll";

export default {
  name: "home",
  components: {
    statistics
  },
  data() {
    return {
      homework_lable: [],
      tutor_commit: "",
      type: "一般",
      time: "2018 / 7 / 09",
      data: [],
      count: 1,
      clickSwitch: '0',
      studentData: []
    };
  },
  mounted() {
    this.postStudentData();
    this._getInfoData();
    this.pushtutor(this.tutor_id,this.tutor_img);
    this.getDingData();
  },
  methods: {
    postStudentData() {
      axios
        .post("dd/student", {
          getData: true,
          userID: this.$store.state.ID
        })
        .then(res => {
          // this.studentData = res.userlist
          this.$store.commit('pushStudentData',res.data.userlist)
        })
    },
    pushtutor(tutorId,tutorImg) {
      this.$store.dispatch('changetutorId', {tutorId,tutorImg})
    },
    _getInfoData() {
      axios
        .post("tutor-load-index", {
          getData: true,
          tutor_id: this.$store.state.ID,
        })
        .then(res => {
          // console.log("转化前", res.data);
          this.data = main.formatData(res.data)
          this.$store.commit('pushStudentHomeData',main.formatData(res.data))
          // console.log("转化后", this.data);
        });
      
    },
    getDingData() {
     
    },
    changeClickSwitch() {
      this.clickSwitch = '0';
    },
    newAccept() {
      if (this.clickSwitch == '0') {
        this.clickSwitch = '1';
        setTimeout('this.changeClickSwitch()',300000);
        this.time = this.getTimes(5);
         
        this.getTime();
       
        axios
          .post("tutor-ins-newAcceptance", {
            time: this.time,
            tutor_id: this.$store.state.ID,
            count: this.count
          })
          .then(response => {
            console.log(response); //路由跳转到首页
            // this.$forceUpdate();
          })
          .catch(error => {
            console.log(error);
          });
     this._getInfoData();
      // history.go(0)
      } else {
        this.youth.toast("你点的太快了，请过五分钟再试！",true);
      }
    },
    getTime() {
      console.log(this.data);
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].date == this.time) {
          // console.log('总长度',this.data[i].detail_1.length)
          if (this.data[i].detail_1.length == 0) {
            this.count = 1;

          } else {
            this.count = this.data[i].detail_1.length + 1;
       
          }
        }
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.tutor_scroll = new BScroll(this.$refs.tutor_view_1, {
        click: true
      });
      
       this.$refs.totur_home.style.height = window.innerHeight + "px";
    });
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/style/main.less";

.home {
  background: #fafafa;
  font-family: PingFangSC-Regular;
  .home_header {
    width: 100%;
    height: 3.38rem;
    background: #ffffff;
    text-align: center;
    .home_header_title {
      padding-top: 1rem;
      font-size: 16px;
      color: #212121;
    }
  }
  .home_avatar {
    padding-top: 2rem;
    width: 100%;
    height: 11.5rem;
    text-align: center;
    .home_avatar_name {
      margin-bottom: 1.5rem;
    }
  }
}
</style>
