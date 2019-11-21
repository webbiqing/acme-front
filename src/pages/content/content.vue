<template>
  <div class="content">
    <van-dropdown-menu>
      <van-dropdown-item v-model="categoryId" :options="optionList"/>
    </van-dropdown-menu>
    <van-cell-group>
      <van-field
        v-model="title"
        required
        clearable
        label="吐槽人"
        maxlength="8"
        placeholder="请输入吐槽人"
      />
      <van-field
        v-model="message"
        required
        rows="2"
        autosize
        label="槽点"
        type="textarea"
        maxlength="50"
        placeholder="请输入槽点"
        show-word-limit
      />
    </van-cell-group>
    <van-row style="margin:20px 0">
      <van-col span="1"></van-col>
      <van-col span="22">
        <van-button style="width:100%" type="primary" size="normal" @click='sendData'>吐槽</van-button>
      </van-col>
      <van-col span="1"></van-col>
    </van-row>
  </div>
</template>

<script>
  import {saveLog, getCategory} from '@/api';
  import {Notify, Toast} from 'vant';

  export default {
    name: 'contentLayout',
    data() {
      return {
        message: '',
        title: '',
        categoryId: 1,
        optionList: []
      }
    },
    mounted() {
      this.getCategory();
    },
    methods: {
      async sendData() {
        if (!this.message.trim() && !this.title.trim()) {
          return Notify({type: 'danger', message: '没点东西就想吐槽？'});
        }
        const {serverStatus} = await saveLog({title: this.title, content: this.message, category: this.categoryId})
        if (serverStatus === 2) {
          Toast.success('吐槽成功！');
          this.$router.push('/main')
        }
      },
      async getCategory() {
        const result = await getCategory();
        this.optionList = result.map(item => {
          return {
            text: item.name,
            value: item.id
          }
        });
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .content-header {
    margin: 20px 0;
  }
</style>
