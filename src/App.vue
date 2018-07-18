<template>
  <div id="app">
    <transition name="side-column">
      
    
    <router-view/>
    </transition>
     <loading ref="loading_view_Home"></loading>
  </div>
</template>

<script>
import axios from "axios";
import loading from "./components/loading/loading";
export default {
  name: "App",
  data: {
    code: null
  },
  components: {
    loading
  },
  methods: {
    dingdingTalk() {
      var that = this;
      dd.ready(() => {
        dd.runtime.permission.requestAuthCode({
          corpId: "dingf5bdfda1379fc0f135c2f4657eb6378f",
          onSuccess(res) {
            axios
              .post("/api/dd/user", {
                getData: true,
                code: res.code
              })
              .then(resp => {
                that.$store.commit("getUserInfo", resp.data);

                switch (resp.data.job) {
                  case "学生":
                    that.$router.push("/studentPage");
                    that.$refs.loading_view_Home = false;
                    break;
                  case "教师":
                    that.$router.push("/teacherPage");
                    that.$refs.loading_view_Home = false;
                    break;
                  case "助教":
                    that.$router.push("/totur");
                    that.$refs.loading_view_Home = false;
                    break;
                }
              });
          },
          onFail: function(err) {
            alert(err);
          }
        });
        
      });
    }
  },
  created() {
    this.$refs.loading_view_Home = true;
    this.dingdingTalk();
  }
};
</script>

<style scoped>
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
#app {
  margin: 0;
}
</style>
