<template>
  <div class="hello-content">
    <div style="width: 100%;text-align: center;margin: 40px 0 40px 0;">
      各位大佬，欢迎注册
    </div>
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        placeholder="请输入用户名"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
    <div class="register-footer">
      <van-button type="primary" style="width:70%" @click='register'>注 册</van-button>
    </div>
  </div>
</template>

<script>
  import {register} from '@/api'
  import {Notify, Toast} from 'vant';

  export default {
    name: 'register',
    data() {
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      async register() {
        const { data,code,message } = await register({username: this.username, pwd: this.password});
        if (code === 200) {
          Toast.success('注册成功，前往登录');
          this.$router.push('/');
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .register-footer{
    margin: 20px 0;
    width: 100%;
    display:flex;
    justify-content: center;
  }
</style>
