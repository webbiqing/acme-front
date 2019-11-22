<template>
  <div class="main-layout">
    <van-notice-bar
      text="后续会增加各个模块，提供注册功能，增加槽点点赞功能，被吐槽人选择注册的方式"
      left-icon="volume-o"
    />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-row class="main-header">
        <van-col span="1"></van-col>
        <van-col span="22">
          <van-button style="width:100%" type="primary" size="normal" @click="toSetData">去吐槽</van-button>
        </van-col>
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
        <div class="content-item-actions">
          <span @click="setVoters(item)" v-if="!item.isShowGoodJob"><van-icon name="good-job-o" size="22px" /> </span>
          <span v-else> <van-icon name="good-job" color="#0084ff" size="22px" /></span>
          {{item.voters}} 赞同吐槽
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
  import {getLog, getCategory,setVoters} from '@/api';

  export default {
    name: 'mainLayout',
    data() {
      return {
        dataList: [],
        isLoading: false,
        categoryList: [],
        active: 1,
      }
    },
    mounted() {
      this.getCategory();
    },
    methods: {
      /*获取数据*/
      async getData() {
        this.isLoading = true;
        const {data, code, message} = await getLog({category: this.active});
        if (code === 200) {
          this.isLoading = false;
          this.dataList = data;
        }
      },
      /* 不下拉刷新获取数据 */
      async notRefreshGetData() {
        const {data, code, message} = await getLog({category: this.active});
        if (code === 200) {
          this.isLoading = false;
          this.dataList = data;
        }
      },
      /* 获取类别 */
      async getCategory() {
        const {data, code, message} = await getCategory();
        if (code === 200) {
          this.categoryList = data;
          this.notRefreshGetData();
        }
      },
      /*
      * 点赞
      * */
      async setVoters({id}){
        const {data, code, message} = await setVoters({id});
        if (code === 200) {
          this.dataList.forEach(item=>{
            if(item.id === id){
              item.isShowGoodJob = true;
              item.voters++
            }
          });
          this.dataList.splice();
        }
      },
      toSetData() {
        this.$router.push({path: '/content', query: {active: this.active}})
      },
      /* set tab active */
      setActive(name, title) {
        this.notRefreshGetData();
      },
      /* 下拉刷新 */
      onRefresh() {
        this.getData();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .main-header {
    margin: 20px 0;
  }
  .main-layout {
    background: #f6f6f6;
    min-height: 100vh;
  }
  .content-item {
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 0;
    border-width: 1px 0;
    background: #fff;
    h3{
      line-height: 1.4;
      font-size: 20px;
    }
    .content-item-actions{
      padding: 10px 16px;
      margin: 10px -16px -10px;
      display: flex;
      align-items: center;
      color: #646464;
      font-size: 16px;
    }
  }
</style>
