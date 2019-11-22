<template>
  <div id="app">
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="backPrev" v-if="!hideTopBarList.includes($route.name)"></van-nav-bar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      title:'',
      hideTopBarList:[
        'login',
        'mainLayout'
      ]
    }
  },
  watch:{
    $route(){
      this.title = this.$route.meta.title
    }
  },
  mounted(){
    this.title = this.$route.meta.title
  },
  methods:{
    backPrev(){
      this.$router.back(-1);
    }
  },
}
</script>
