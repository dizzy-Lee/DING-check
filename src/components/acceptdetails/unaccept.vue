<template>
  <div>
    <div class="unaccept"
      v-for="(item,index) of student_data"
      :key="index"
      @click="handleChangeStudent(item);goAssess()"
    >
      <v-avatar class="unaccept_avatar" :src="item.avatar"></v-avatar>
      <span class="unaccept_name">{{item.name}}</span>
      <span class="unaccept_link iconfont">&#xe8d4;</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components:{},
  data(){
    return {
      isShowAssess:false,
      student_data: []
    }
  },
  mounted(){
    this.getData()
  },
  name: 'unaccept',
  props: {},
  methods:{
    handleChangeStudent (student_name) {
      this.$store.dispatch('changeStudentName', student_name)
    },
    getData() {
      axios
        .post("/api/tutor-load-clickno", {
          getData: true,
          tutor_id: this.$store.state.ID,
          date: this.$store.state.date,
          count: this.$store.state.count
        })
        .then(res => {
          this.student_data = res.data
          for(let i = 0; i < this.student_data.length; i++) {
            for(let j = 0; j < this.$store.state.studentData.length; j++) {
              if (this.$store.state.studentData[j].userid == this.student_data[i].studentID) {
                this.student_data[i].name = this.$store.state.studentData[j].name
                if (this.$store.state.studentData[j].avatar == "") {
                  this.student_data[i].avatar = this.$store.state.MRIMG
                } else {
                  this.student_data[i].avatar = this.$store.state.studentData[j].avatar
                }
              }
            }
          }
          // alert(this.student_data[0].studentID)
        });
    },
    goAssess () {
      this.$router.push('/assess')
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/main.less";

.unaccept {
  width: 100%;
  height: 6rem;
  background: #FFF;
  border: 1px solid #EEE;
  border-left: none;
  border-right: none;
  .unaccept_avatar {
    margin-top: 1.5rem;
    margin-left: 6.4%
  }
  .unaccept_name {
    margin-left: 1rem;
    position: relative;
    top: -1rem;
  }
  .unaccept_link {
    float: right;
    margin-right: 1rem;
    position: relative;
    top: 2.5rem;
    color: #000000;
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
