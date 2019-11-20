<template>
  <div class="main-layout" >
    <van-notice-bar
        text="后续会增加各个模块，提供注册功能，增加槽点点赞功能，被吐槽人选择注册的方式"
        left-icon="volume-o"
      />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-row class="main-header">
        <van-col span="1"></van-col>
        <van-col span="22"> <van-button style="width:100%" type="primary" size="normal" @click="$router.push('/content')">去吐槽</van-button></van-col>
        <van-col span="1"></van-col>
      </van-row>
      <van-tabs v-model="active" @click="setActive">
        <van-tab :title="item.name" :name="item.id" v-for="(item,index) in categoryList" :key="index"></van-tab>
      </van-tabs>
      <van-skeleton title :row="3" v-if="!dataList.length"></van-skeleton>
      <div class="content-item" v-for="(item,index) in dataList" :key='index'>
        <h3>{{item.title}}</h3>
        <div>
          {{item.content}}
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getLog,getCategory } from '@/api';
export default {
  name: 'mainLayout',
  data(){
    return{
      dataList:[],
      isLoading:false,
      categoryList:[],
      active:1
    }
  },
  mounted(){
    this.getCategory();
  },
  methods:{
    /*获取数据*/
    async getData(){
      this.isLoading = true;
      const result = await getLog({category:this.active});
      this.isLoading = false;
      this.dataList = result;
    },
    /* 不下拉刷新获取数据 */
    async notRefreshGetData(){
      const result = await getLog({category:this.active});
      this.dataList = result;
    },
    /* 获取类别 */
    async getCategory(){
      const result = await getCategory();
      this.categoryList = result;
      this.notRefreshGetData();
    },
    /* set tab active */
    setActive(name,title){
      this.notRefreshGetData();
    },
    /* 下拉刷新 */
    onRefresh(){
      this.getData();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .main-header{
    margin: 20px 0;
  }
  .main-layout{
    height: 100vh
  }
  .content-item{
    padding: 10px;
    margin-bottom: 10px
  }
</style>
