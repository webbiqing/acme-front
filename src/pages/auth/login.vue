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
    <div class="login-footer" style="margin: 20px 0;">
      <van-button type="primary" style="width:70%" @click='login'>登 录</van-button>
    </div>
    <div class="login-footer">
      <van-button type="default" style="width:70%;margin-top: 10px" @click="$router.push('/register')">注 册</van-button>
    </div>
  </div>
</template>

<script>
  import {login} from '@/api'

  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      async login() {
        const { data,code,message } = await login({username: this.username, pwd: this.password});
        if (code === 200) {
          window.sessionStorage.token = data.token || '';
          this.$router.push('/main');
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-footer{
    width: 100%;
    display:flex;
    justify-content: center;
  }
</style>
