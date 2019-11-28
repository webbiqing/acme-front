<template>
  <van-popup
    v-model="popShow"
    class="comment"
    position="bottom"
    closeable
    :style="{ height: '95%', borderRadius: '10px 10px 0 0' }"
    @close="handleClose"
  >
    <div class="title">全部{{ TotalCount }}条评论</div>
    <div class="comment-container" :style="{ height: `${commentContainer}px`}">
      <van-list
        v-model="popLoading"
        :immediate-check="false"
        :finished="popFinished"
        finished-text="大哥，真没有了！"
        @load="onLoad"
      >
        <div class="comment-item" v-for="(item, index) in popcommentList" :key="index">
          <div class="comment-user">{{ item.create_user }}</div>
          <div class="comment-content">{{ item.content }}</div>
          <div class="comment-item-bottom">
            <span class="comment-time">{{ item.create_time }}</span>
            <div class="comment-action-box">
              <span class="icon-box" @click="handleParse(item.id)">
                <span>{{ item.prase_count }}</span>
                <van-icon name="good-job-o" />
              </span>
              <span class="icon-box" @click="handleReplyComment(item.id)">
                <van-icon name="chat-o" />
              </span>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <div class="comment-submit-content">
      <div class="comment-submit-input">
        <van-field
          v-model="message"
          rows="4"
          ref="myField"
          :border="false"
          autosize
          maxlength="150"
          show-word-limit
          type="textarea"
          placeholder="请输入评论"
        />
      </div>
      <div 
        :class="`${message.length > 0 ? 'clo_0068dc' : 'clo_0068dc_opacity_5'}`"
        @click="handleSubmit">发布</div>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'comment',
  props: {
    show: Boolean,
    commentList: Array,
    TotalCount: Number,
    loading: Boolean,
    finished: Boolean
  },
  data() {
    return {
      popShow: this.show,
      message: '',
      popcommentList: this.commentList,
      commentContainer: 400,
      popFinished: this.finished
    }
  },
  computed: {
    popLoading: {
      get() {
        return this.loading
      },
      set(value) {
        this.$emit("setLoading", value);
      }
    }
  },
  watch: {
    show(val) {
      this.popShow = val
    },
    commentList(val) {
      this.popcommentList = val
    },
    finished(val) {
      this.popFinished = val
    }
  },
  mounted() {
    const commentHeight = document.querySelector(".comment").clientHeight;
    const commentTitleHeight = document.querySelector(".title").offsetHeight;
    const commentSubmitContentHeight = document.querySelector(".comment-submit-content").offsetHeight;
    const commentContainer = commentHeight - commentSubmitContentHeight - commentTitleHeight;
    this.commentContainer = commentContainer;
  },
  methods: {
     onLoad() {
      // 异步更新数据
      this.$emit("queryNext");
    },
    handleClose() {
      this.$emit("handleClose", false);
    },
    handleParse(id) {
      this.$emit("handleParse", id)
    },
    handleReplyComment(id) {
      console.log(id)
    },
    reset() {
      this.message = '';
      this.$refs.myField.blur();
    },
    handleSubmit() {
      if(this.message.length === 0) {
        return;
      }
      this.$emit("handleSubmit", this.message)
    }
  }
}
</script>
<style lang="less" scoped>
  .comment {
    .title {
      width: 100%;
      height: 44px;
      box-sizing: border-box;
      line-height: 44px;
      padding-left: 30px;
      border-bottom: 1px solid #ccc;
      color: #696969;
      font-size: 22px;
    }
    .comment-container {
      width: 100%;
      height: auto;
      overflow-y: scroll;
      overscroll-behavior-y: none;
      box-sizing: border-box;
      padding: 0 15px 15px 15px;
      .comment-item {
        width: 100%;
        height: auto;
        padding: 10px 0;
        box-sizing: border-box;
        border-bottom: 1px solid rgb(230, 226, 226);
        .comment-user {
          font-size: 20px;
          color: #333;
          padding-bottom: 8px;
        }
        .comment-content {
          width: 100%;
          box-sizing: border-box;
          height: auto;
          font-size: 18px;
          color: #5f5e5e;
          padding-left: 10px;
          word-wrap:break-word;
        }
        .comment-item-bottom {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          width: 100%;
          padding-top: 10px;
          .comment-time {
            font-size: 12px;
            line-height: 26px;
            color: rgb(197, 193, 193);
          }
          .comment-action-box {
            display: flex;
            flex-flow: row nowrap;
            .icon-box {
              display: flex;
              flex-flow: row nowrap;
              align-items: center;
              padding: 5px;
              span {
                padding-right: 5px;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
    .comment-submit-content {
      position: absolute;
      z-index: 999;
      bottom: 0;
      left: 0;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: flex-end;
      width: 100%;
      height: auto;
      background: #fff;
      padding: 10px 20px;
      box-sizing: border-box;
      border-top: 1px solid #ccc;
      box-shadow: 0 0 5px #ccc;
      .comment-submit-input {
        width: 85%
      }
    }
  }
</style>