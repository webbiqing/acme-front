<template>
  <div class="hello-content">
    <div style="width: 100%;text-align: center;margin: 40px 0 40px 0;">
      各位大佬，欢迎吐槽
    </div>
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('用户名:wbqing,密码:wbqing')"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
    <div style="margin: 20px 0; width: 100%;display:flex;justify-content: center;">
      <van-button type="primary" style="width:70%" @click='login'>登 录</van-button>
    </div>
  </div>
</template>

<script>
  import {Notify} from 'vant';
  import {login} from '@/api'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      async login() {
        const {data} = await login({username: this.username, pwd: this.password});
        console.log(data);
        if (data == 909) {
          Notify({type: 'danger', message: '用户名或者密码不正确'});
        } else if (data == 606) {
          this.$router.push('/main');
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
