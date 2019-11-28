<template>
  <van-popup
    v-model="popShow"
    class="comment"
    position="bottom"
    closeable
    :style="{ height: '95%', borderRadius: '10px 10px 0 0' }"
    @close="handleClose"
  >
    <div class="title">全部{{ this.popcommentList.length }}条评论</div>
    <div class="comment-container">
      <div class="comment-item" v-for="(item, index) in popcommentList" :key="index">
        <div class="comment-user">{{ item.create_user }}</div>
        <div class="comment-content">{{ item.content }}</div>
        <div class="comment-item-bottom">
          <span class="comment-time">{{ item.create_time }}</span>
          <div class="comment-action-box">
            <span class="icon-box"><van-icon name="good-job-o" /></span>
            <span class="icon-box"><van-icon name="chat-o" /></span>
          </div>
        </div>
      </div>
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
    commentList: Array
  },
  data() {
    return {
      popShow: this.show,
      message: '',
      popcommentList: this.commentList
    }
  },
  watch: {
    show(val) {
      this.popShow = val
    },
    commentList(val) {
      this.popcommentList = val
    }
  },
  methods: {
    handleClose() {
      this.$emit("handleClose", false)
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
      height: 8%;
      box-sizing: border-box;
      line-height: 44px;
      padding-left: 30px;
      border-bottom: 1px solid #ccc;
      color: #696969;
      font-size: 22px;
    }
    .comment-container {
      width: 100%;
      height: 72%;
      overflow-y: scroll;
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
            color: rgb(197, 193, 193);
          }
          .icon-box {
            padding: 5px;
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
      height: 20%;
      overflow-y: scroll;
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