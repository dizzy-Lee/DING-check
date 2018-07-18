<template>
  <div>
    <div class="unaccept"
      v-for="item of student_data"
      :key="item.student_id"
    >
      <v-avatar class="unaccept_avatar" :src="item.student_img"></v-avatar>
      <span class="unaccept_name">{{item.student_name}}</span>
      <span class="unaccept_link iconfont">&#xe8d4;</span>
    </div>
  </div>
</template>

<script>

export default {
  components:{},
  data(){
    return {
      isShowAssess:false
    }
  },
  name: 'unaccept',
  props: {
    student_data: Array,
  },
  methods:{
   
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

</style>
