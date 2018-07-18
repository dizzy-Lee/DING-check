<template>
  <div class="main">
    <router-view></router-view>
 
  </div>
</template>

<script>
  import studentHome from './student/studentHome'
  export default {
    components: {
      studentHome
    },
    data() {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  
</style>
