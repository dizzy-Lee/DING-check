<template>
  <div>
    <div class="accepted"
    v-for="(item, index) of student_data"
    :key="index"
    >
      <v-avatar class="accepted_avatar" :src="item.avatar"></v-avatar>
      <span class="accepted_name">{{item.name}}</span>
      <div id="accepted_style_zd" style="float: right; margin-right: .8rem;">
        <span class="accepted_detail iconfont">&#xe8d4;</span>
        <span class="accepted_evaluate" :style=changeAcceptStyle(item)>{{item.evaluate}}</span>
        <img class="accepted_img" :src=changeAcceptImg(item)>
      </div>
      <router-link to="/studentDetail">
        <div @click="pushStudentDetail(item);handleChangeStudent(item.studentID)" style="width: 100%; height: 6rem; background: red; position: relative; top: -5rem; opacity: 0;"></div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "accepted",
  data() {
    return {
      student_data: [],

      accepted_evaluate: "",
      accepted_style: ""
    };
  },
  props: {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .post("tutor-load-clickyes", {
          getData: true,
          tutor_id: this.$store.state.ID,
          date: this.$store.state.date,
          count: this.$store.state.count
        })
        .then(res => {
          this.student_data = res.data;
          for (let j = 0; j < this.student_data.length; j++) {
             for (let i = 0; i < this.$store.state.studentData.length; i++) {
              if (this.$store.state.studentData[i].userid == this.student_data[j].studentID) {
                if (this.$store.state.studentData[i].avatar == "") {
                  this.student_data[j].avatar = this.$store.state.MRIMG
                } else {
                this.student_data[j].avatar = this.$store.state.studentData[i].avatar
                }
                this.student_data[j].name = this.$store.state.studentData[i].name
              }
            }
          }

          // console.log(this.student_data)
        });
    },
    changeAcceptImg(item) {
      if (item.evaluate == "大坑") {
        this.accepted_style = "color: #e81f62;";
        return "../../../static/img/大坑.png";
      } else if (item.evaluate == "差劲") {
        this.accepted_style = "color: #f4a528;";
        return "../../../static/img/差劲.png";
      } else if (item.evaluate == "中等") {
        this.accepted_style = "color: #0ca9f2;";
        return "../../../static/img/中等.png";
      } else if (item.evaluate == "优秀") {
        this.accepted_style = "color: #39ce88;";
        return "../../../static/img/优秀.png";
      } else if (item.evaluate == "超神") {
        this.accepted_style = "color: #ccdb3f;";
        return "../../../static/img/超神.png";
      } else if (item.evaluate == "未交") {
        this.accepted_style = "color: #323232;";
        return "../../../static/img/未交.png";
      }
    },
    changeAcceptStyle(item) {
      if (item.evaluate == "大坑") {
        return "color: #e81f62;";
      } else if (item.evaluate == "差劲") {
        return "color: #f4a528;";
      } else if (item.evaluate == "中等") {
        return "color: #0ca9f2;";
      } else if (item.evaluate == "优秀") {
        return "color: #39ce88;";
      } else if (item.evaluate == "超神") {
        return "color: #ccdb3f;";
      } else if (item.evaluate == "未交") {
        return "color: #323232;";
      }
    },
    pushStudentDetail(item) {
      this.$store.dispatch("pushStudentDetail", item);
    },
    handleChangeStudent(student_name) {
      this.$store.dispatch("changeStudentName", student_name);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/style/main.less";

.accepted {
  width: 100%;
  height: 6rem;
  background: #fff;
  border: 1px solid #eee;
  border-left: none;
  border-right: none;
  .accepted_avatar {
    margin-top: 1.5rem;
    margin-left: 6.4%;
  }
  .accepted_name {
    margin-left: 1rem;
    position: relative;
    top: -1rem;
  }
  .accepted_evaluate {
    // line-height: 3rem;
    position: relative;
    top: 2.4rem;
    float: right;
    margin-right: 6.7%;
  }
  .accepted_detail {
    position: relative;
    top: 2.5rem;
    float: right;
    margin-right: 6.4%;
  }
  .accepted_img {
    width: 1.5rem;
    // float: right;
    // margin-right: 2.1%;
    // margin-top: 2.3rem;
    position: relative;
    top: 1rem;
    left: -1rem;
  }
}
</style>
