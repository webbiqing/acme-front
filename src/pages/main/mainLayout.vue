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
        <div class="content-text">
          {{item.content}}
        </div>
        <div class="content-item-actions">
          <button class="content-item-vebtn" @click="setVoters(item)">
            <span class="voter-icon-o"><van-icon name="good-job-o" size="22px" /> </span>
            <span class="voter-icon"> <van-icon name="good-job" color="#0084ff" size="22px" /></span>
            {{item.voters > 2000 ? '2000+' : item.voters}} <span class="item-actions-text"> 赞同
          </span>
          </button>
          <div class="content-item-info" @click="showChat(item.id)">
            <van-icon name="chat-o" /> <span style="margin-left: 5px">
            <template v-if="item.count">
              {{item.count}}条评论
            </template>
            <template v-else>
              添加评论
            </template>
          </span>
          </div>
        </div>
        <div>

        </div>
      </div>
    </van-pull-refresh>
    <Comment 
      v-if="show"
      :show="show" 
      :commentList="commentList"
      :TotalCount="TotalCount"
      :loading="loading"
      :finished="finished"
      ref="comment"
      @handleClose="controllerShow"
      @queryNext="listenqueryNext"
      @setLoading="listensetLoading"
      @handleParse="listenhandleParse"
      @handleSubmit="listenhandleSubmit" />
  </div>
</template>

<script>
  import Comment from '@/components/comment'
  import { getLog, getCategory, setVoters, saveComment, getComment, setCommentPrase } from '@/api';
  import { Notify } from 'vant';

  export default {
    name: 'mainLayout',
    data() {
      return {
        dataList: [],
        isLoading: false,
        categoryList: [],
        active: 1,
        show: false, //控制评论弹层
        logId: null, //当前展开评论吐槽id
        commentList: [],//评论列表
        TotalCount: 0,//当前展开评论的总条数
        loading: false, //当前页数据是否加载完成
        finished: false, //分页所有数据是否加载完成
        pageIndex: 1, //当前页
        pageSize: 20, //每页加载的条数
      }
    },
    mounted() {
      this.getCategory();
    },
    components: {
      Comment
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
          this.notRefreshGetData();
        }
      },
      /* van-list 组件控制loading  （重新设置了v-model）*/
      listensetLoading(value) {
        this.loading = value;
      },
      /* 点击评论 */
      showChat(id) {
        this.logId = id;
        this.controllerShow(true);
        this.queryComment({
          commentId: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        });
      },
      /* 下一页 */
      listenqueryNext() {
        const params = {
          commentId: this.logId,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
        this.queryComment(params);
      },
      /* 设置show*/
      controllerShow(state) {
        if(!state) {
          this.commentList = [];
          this.pageIndex = 1;
          this.TotalCount = 0;
        }
        this.show = state;
      },
      /* 提交评论 */
      async listenhandleSubmit(value) {
        if(this.logId === null) {
          return;
        };
        const params = {
          blog_id: this.logId,
          content: value
        };
        const { data, code, message } = await saveComment(params);
        if(code === 200) {
          Notify({ type: 'success', message: '评论成功' });
          this.queryComment({
            commentId: this.logId,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
          });
          this.$refs.comment.reset();
        }else {
          Notify({ type: 'danger', message });
        }
      },
      /* 获取当前槽点下评论列表 */
      async queryComment(params={}) {
        const { data, code, message } = await getComment(params); 
        if(code === 200) {
          const { Result, TotalCount } = data;
          this.loading = false;
          this.commentList = [
            ...this.commentList,
            ...Result
          ];
          this.TotalCount = TotalCount;
          if(this.commentList.length >=  TotalCount) {
            this.finished = true;
            return;
          }
          this.pageIndex = this.pageIndex + 1;
        }else {
          Notify({ type: 'danger', message });
        }
      },
      /* 点击评论点赞数 */
      async listenhandleParse(commentId) {
        const { data, code, message } = await setCommentPrase({ commentId }); 
        if(code === 200) {
          this.commentList.map(item => item.id === commentId ? item.prase_count += 1 : null)
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
    .content-text{
      word-break: break-word;
      line-height: 1.6;
      white-space: normal;
      color: #1a1a1a;
      -webkit-tap-highlight-color: rgba(26,26,26,0);
    }
    h3{
      line-height: 1.4;
      font-size: 18px;
      margin-bottom: 3px;
    }
    .content-item-actions{
      display: flex;
      align-items: center;
      margin: 10px -16px -10px;
      flex-wrap: wrap;
    }
    .content-item-vebtn{
      padding: 2px 16px;
      font-size: 16px;
      color: #0084ff;
      background: rgba(0,132,255,.1);
      border-color: transparent;
      cursor: pointer;
      background: none;
      border-radius: 3px;
      background: rgba(0,132,255,.1);
      display: flex;
      align-items: center;
      &:focus{
        color: #fff;
        background: #0084ff;
        .voter-icon-o{
          display: inline-block !important;
        }
        .voter-icon{
          display: none;
        }
      }
      .voter-icon-o{
        display: none;
      }
    }
    .content-item-info{
      display: flex;
      align-items: center;
      margin-left: 10px;
      cursor: pointer;
      color: #8590a6;
    }
  }
</style>
