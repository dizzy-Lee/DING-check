<template>

  <div class="home">
     
    <div class="home_header dd-border-bottom">
      <p class="home_header_title iconfont">
        <span class="title_back" @click="goAcceptdetails">&#xe600;</span>
        <span>作业评价</span>
      </p>
    </div>
    <div style="position:absolute;overflow: hidden;top:0rem;bottom:0rem;margin:0 auto;width: 100%;" ref="main_wrapper_assess">
      <div style="margin:0 auto;">
    <div class="home_avatar dd-border-bottom">
      <v-avatar size="large" :src="this.$store.state.studentImg"></v-avatar>
      <p>{{this.$store.state.studentName}}</p>
      <p class="p_swiper">滑动评分</p>
    </div>
    <div @touchmove="showMessage" class="home_swiper dd-border-bottom">
      <div class="swiper_circle_lv1" id="swiper_circle_lv1">
        <img v-show="lv1_show" class="swiper_img_lv1 swiper-image-style" src="../../../static/img/大坑.png">
        <div v-show="lv1_show" style="font-size: .75rem; color: #f06292; width: 1.5rem; position: relative; top: -.5rem; left: -.5rem;">
          大坑
        </div>
      </div>
      <div class="swiper_square_lv2" id="swiper_square_lv2"></div>
      <div class="swiper_circle_lv2" id="swiper_circle_lv2">
        <img v-show="lv2_show" class="swiper_img_lv2 swiper-image-style" src="../../../static/img/差劲.png">
        <div v-show="lv2_show" style="font-size: .75rem; color: #f5a623; width: 1.5rem; position: relative; top: -.5rem; left: -.5rem;">
          差劲
        </div>
      </div>
      <div class="swiper_square_lv3" id="swiper_square_lv3"></div>
      <div class="swiper_circle_lv3" id="swiper_circle_lv3">
        <img v-show="lv3_show" class="swiper_img_lv3 swiper-image-style" src="../../../static/img/中等.png">
        <div v-show="lv3_show" style="font-size: .75rem; color: #03a9f4; width: 1.5rem; position: relative; top: -.5rem; left: -.5rem;">
          中等
        </div>
      </div>
      <div class="swiper_square_lv4" id="swiper_square_lv4"></div>
      <div class="swiper_circle_lv4" id="swiper_circle_lv4">
        <img v-show="lv4_show" class="swiper_img_lv4 swiper-image-style" src="../../../static/img/优秀.png">
        <div v-show="lv4_show" style="font-size: .75rem; color: #3ccf87; width: 1.5rem; position: relative; top: -.5rem; left: -.5rem;">
        优秀
        </div>
      </div>
      <div class="swiper_square_lv5" id="swiper_square_lv5"></div>
      <div class="swiper_circle_lv5" id="swiper_circle_lv5">
        <img v-show="lv5_show" class="swiper_img_lv5 swiper-image-style" src="../../../static/img/超神.png">
        <div v-show="lv5_show" style="font-size: .75rem; color: #cddc39; width: 1.5rem; position: relative; top: -.5rem; left: -.5rem;">
        超神
        </div>
      </div>
    </div>
    <div class="home_quick_assess">
      <p class="p_quick_assess">快速评价</p>
      <div id="choose_tags" class="choose_tags" @click="handleClick($event)">
        <v-tag class="choose_tag">代码不够工整</v-tag>
        <v-tag class="choose_tag">继续努力</v-tag>
        <v-tag class="choose_tag">Fuck</v-tag>
        <v-tag class="choose_tag">韩红看了想打人</v-tag>
        <v-tag class="choose_tag">+</v-tag>
      </div>
    </div>
    <div class="home_assess">
      <p class="p_assess">其它简评</p>
      <textarea v-model="tutor_commit" class="input_assess" placeholder="Input"></textarea>
      <button @click='pushAssess' class="assess_button" type="primary">提交评价</button>
    </div>
  </div>
 </div>
 </div>
</template>

<script>
import axios from "axios";
import BScroll from "better-scroll";
export default {
  name: "HelloWorld",
  data() {
    return {
      tutor_id: "1129613523758071",
      student_id: "523103604858277",
      tutor_name: "杜鹏宇",
      tutor_img:
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=16550438,2220103346&fm=27&gp=0.jpg",
      homework_lable: [],
      tutor_commit: "",
      type: "中等",
      time: "",
      count: 1,

      windowWidth: 0,
      touchWidth: 0,
      lv1_show: false,
      lv2_show: false,
      lv3_show: true,
      lv4_show: false,
      lv5_show: false
    };
  },
  mounted: function() {
    this.windowWidth = document.body.scrollWidth;
    var swiper_square_lv2 = document.getElementById("swiper_square_lv2");
    var swiper_square_lv3 = document.getElementById("swiper_square_lv3");
    var swiper_square_lv4 = document.getElementById("swiper_square_lv4");
    var swiper_square_lv5 = document.getElementById("swiper_square_lv5");
    var swiper_circle_lv1 = document.getElementById("swiper_circle_lv1");
    var swiper_circle_lv2 = document.getElementById("swiper_circle_lv2");
    var swiper_circle_lv3 = document.getElementById("swiper_circle_lv3");
    var swiper_circle_lv4 = document.getElementById("swiper_circle_lv4");
    var swiper_circle_lv5 = document.getElementById("swiper_circle_lv5");
  },
  methods: {
    goAcceptdetails() {
      this.$router.go(-1);
    },
    showMessage: function(evt) {
      evt.preventDefault();
      this.touchWidth = Number(evt.touches[0].pageX) / this.windowWidth;
      if (this.touchWidth < 0.2) {
        this.$nextTick(() => {
          this.changeLv1();
        });
      } else if (this.touchWidth >= 0.2 && this.touchWidth < 0.4) {
        this.$nextTick(() => {
          this.changeLv2();
        });
      } else if (this.touchWidth >= 0.4 && this.touchWidth < 0.6) {
        this.$nextTick(() => {
          this.changeLv3();
        });
      } else if (this.touchWidth >= 0.6 && this.touchWidth < 0.8) {
        this.$nextTick(() => {
          this.changeLv4();
        });
      } else if (this.touchWidth >= 0.8) {
        this.$nextTick(() => {
          this.changeLv5();
        });
      }
    },
    changeLv1: function() {
      swiper_square_lv2.style.background = "#EEEEEE";
      swiper_square_lv3.style.background = "#EEEEEE";
      swiper_square_lv4.style.background = "#EEEEEE";
      swiper_square_lv5.style.background = "#EEEEEE";
      swiper_circle_lv2.style.background = "#EEEEEE";
      swiper_circle_lv3.style.background = "#EEEEEE";
      swiper_circle_lv4.style.background = "#EEEEEE";
      swiper_circle_lv5.style.background = "#EEEEEE";
      this.lv1_show = true;
      this.lv2_show = false;
      this.lv3_show = false;
      this.lv4_show = false;
      this.lv5_show = false;
      this.type = "大坑";
    },
    changeLv2: function() {
      swiper_square_lv2.style.background = "#f5a623";
      swiper_square_lv3.style.background = "#EEEEEE";
      swiper_square_lv4.style.background = "#EEEEEE";
      swiper_square_lv5.style.background = "#EEEEEE";
      swiper_circle_lv1.style.background = "#f5a623";
      swiper_circle_lv2.style.background = "#f5a623";
      swiper_circle_lv3.style.background = "#EEEEEE";
      swiper_circle_lv4.style.background = "#EEEEEE";
      swiper_circle_lv5.style.background = "#EEEEEE";
      this.lv1_show = false;
      this.lv2_show = true;
      this.lv3_show = false;
      this.lv4_show = false;
      this.lv5_show = false;
      this.type = "差劲";
    },
    changeLv3: function() {
      swiper_square_lv2.style.background = "#03a9f4";
      swiper_square_lv3.style.background = "#03a9f4";
      swiper_square_lv4.style.background = "#EEEEEE";
      swiper_square_lv5.style.background = "#EEEEEE";
      swiper_circle_lv1.style.background = "#03a9f4";
      swiper_circle_lv2.style.background = "#03a9f4";
      swiper_circle_lv3.style.background = "#03a9f4";
      swiper_circle_lv4.style.background = "#EEEEEE";
      swiper_circle_lv5.style.background = "#EEEEEE";
      this.lv1_show = false;
      this.lv2_show = false;
      this.lv3_show = true;
      this.lv4_show = false;
      this.lv5_show = false;
      this.type = "中等";
    },
    changeLv4: function() {
      swiper_square_lv2.style.background = "#3ccf87";
      swiper_square_lv3.style.background = "#3ccf87";
      swiper_square_lv4.style.background = "#3ccf87";
      swiper_square_lv5.style.background = "#EEEEEE";
      swiper_circle_lv1.style.background = "#3ccf87";
      swiper_circle_lv2.style.background = "#3ccf87";
      swiper_circle_lv3.style.background = "#3ccf87";
      swiper_circle_lv4.style.background = "#3ccf87";
      swiper_circle_lv5.style.background = "#EEEEEE";
      this.lv1_show = false;
      this.lv2_show = false;
      this.lv3_show = false;
      this.lv4_show = true;
      this.lv5_show = false;
      this.type = "优秀";
    },
    changeLv5: function() {
      swiper_square_lv2.style.background = "#cddc39";
      swiper_square_lv3.style.background = "#cddc39";
      swiper_square_lv4.style.background = "#cddc39";
      swiper_square_lv5.style.background = "#cddc39";
      swiper_circle_lv1.style.background = "#cddc39";
      swiper_circle_lv2.style.background = "#cddc39";
      swiper_circle_lv3.style.background = "#cddc39";
      swiper_circle_lv4.style.background = "#cddc39";
      swiper_circle_lv5.style.background = "#cddc39";
      this.lv1_show = false;
      this.lv2_show = false;
      this.lv3_show = false;
      this.lv4_show = false;
      this.lv5_show = true;
      this.type = "超神";
    },
    handleClick(e) {
      e = e || window.event;
    },
    pushAssess: function() {
      this.time = this.getTimes(5);
      this.homeworke = this.homework_lable;
      let r = document.getElementsByClassName("active");
      let arr = [];
      for (let i = 0; i < r.length; i++) {
        arr[i] = r[i].innerHTML;
        // console.log(r[i].innerHTML);
      }
      this.homework_lable = arr.join(",");
      // console.log(this.type, this.homework_lable, this.tutor_commit);
      this.$router.push("/acceptdetails");
      dd.biz.chat.pickConversation({
        corpId: "dingf5bdfda1379fc0f135c2f4657eb6378f", //企业id
        isConfirm: "true", //是否弹出确认窗口，默认为true
        onSuccess: function() {
          //onSuccess将在选择结束之后调用
          // 该cid和服务端开发文档-普通会话消息接口配合使用，而且只能使用一次，之后将失效
          /*{
            cid: 'xxxx',
            title:'xxx'
        }*/
        },
        onFail: function() {}
      });
      axios
        .post("/api/tutor-ins-submit?t = " + new Date().getTime(), {
          time: this.time,
          totur_id: this.$store.state.ID,
          student_id: this.$store.state.studentId.replace(/\s+/g, ""),
          is_acceptance: true,
          type: this.type,
          homework_lable: this.homework_lable,
          totur_commit: this.tutor_commit,
          count: String(this.$store.state.count)
        }) //实时变化的地址，后台不会接收?t=，这样不会受到缓存的干扰
        .then(response => {
          this.youth.toast("评价成功");
        })
        .catch(error => {
          this.youth.toast("评价失败，请稍后再试", true);
        });
    }
  },
  created() {
    this.$nextTick(() => {
      this.assess_scroll = new BScroll(this.$refs.main_wrapper_assess, {
        click: true
      });
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../assets/style/main.less";
.home {
  position: fixed;
  top: 0rem;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  background: #fafafa;
  font-family: PingFangSC-Regular;
  transition-duration: 0.5s;
  .home_header {
    width: 100%;
    height: 3.38rem;
    background: #ffffff;
    text-align: center;
    position: relative;
    z-index: 201;
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
  .home_avatar {
    padding-top: 5rem;
    width: 100%;
    height: 9.44rem;
    text-align: center;
    .p_swiper {
      font-size: 0.75rem;
      color: #9e9e9e;
      text-align: left;
      position: relative;
      top: 1.5rem;
      margin-left: 1rem;
    }
  }
  .home_swiper {
    width: 100%;
    height: 3.62rem;
    .swiper_circle_lv1 {
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 0.375rem;
      background: #03a9f4;
      margin-top: 2.13rem;
      margin-left: 4.5%;
      position: relative;
      top: 0.0625rem;
    }
    .swiper_square_lv2 {
      width: 22.125%;
      height: 0.31rem;
      background: #03a9f4;
      position: relative;
      top: -0.465rem;
      left: 5.3%;
    }
    .swiper_circle_lv2 {
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 0.375rem;
      background: #03a9f4;
      position: relative;
      left: 26.4%;
      top: -0.995rem;
    }
    .swiper_square_lv3 {
      width: 22.125%;
      height: 0.31rem;
      background: #03a9f4;
      position: relative;
      top: -1.485rem;
      left: 28%;
    }
    .swiper_circle_lv3 {
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 0.375rem;
      background: #03a9f4;
      position: relative;
      left: 49.1%;
      top: -2rem;
    }
    .swiper_square_lv4 {
      width: 21%;
      height: 0.31rem;
      background: #eeeeee;
      position: relative;
      top: -2.5625rem;
      left: 50.7%;
    }
    .swiper_circle_lv4 {
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 0.375rem;
      background: #eeeeee;
      position: relative;
      left: 70%;
      top: -3.045rem;
    }
    .swiper_square_lv5 {
      width: 21%;
      height: 0.31rem;
      background: #eeeeee;
      position: relative;
      top: -3.6179rem;
      left: 72%;
    }
    .swiper_circle_lv5 {
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 0.375rem;
      background: #eeeeee;
      position: relative;
      left: 91.6%;
      top: -4.095rem;
    }
  }
  .home_quick_assess {
    width: 100%;
    height: 10.81rem;
    .p_quick_assess {
      font-size: 0.75rem;
      color: #9e9e9e;
      text-align: left;
      position: relative;
      top: 1.5rem;
      margin-left: 1rem;
    }
    .choose_tags {
      position: relative;
      top: 2.5rem;
      padding-left: 1rem;
    }
  }
  .home_assess {
    .p_assess {
      font-size: 0.75rem;
      color: #9e9e9e;
      text-align: left;
      margin-left: 1rem;
    }
    .input_assess {
      margin-top: 1rem;
      margin-left: 1rem;
      width: 87.3%;
      height: 5rem;
      background: #ffffff;
      border: 1px #eeeeee;
      border-radius: 2px;
      padding: 0.5rem;
    }
    .assess_button {
      margin-top: 1rem;
      margin-left: 1rem;
      margin-bottom: 2rem;
      width: 91.5%;
      height: 2.38rem;
      text-align: center;
      font-size: 1rem;
      background: #03a9f4;
      color: #ffffff;
      border: none;
      border-radius: 2px;
    }
  }
}
</style>
