<template>
  <div class="hello-content">
    <div style="width: 100%;text-align: center;margin: 40px 0 40px 0;">
      各位大佬，欢迎注册
    </div>
    <van-cell-group>
      <van-field
        left-icon="contact"
        v-model="username"
        required
        clearable
        label="用户名"
        placeholder="请输入用户名"
        :error-message="errorMsg.username"
      />

      <van-field
        left-icon="question"
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :error-message="errorMsg.pwd"
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
        errorMsg:{
          username:'',
          pwd:''
        }
      }
    },
    methods: {
      verifyUserName(){
        var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
        if(!this.username){
          this.errorMsg.username = '用户名不能为空'
          return false
        }else if (!reg1.test(this.username)) {
          this.errorMsg.username = '用户名只能为字母跟数字组合'
          return false;
        }else if(this.username.length > 15){
          this.errorMsg.username = '用户名不能超过15位'
          return false;
        }
        return true;
      },
      async register() {
        this.errorMsg = {};
        let userFlag = this.verifyUserName();
        if(!userFlag) return ;
        if(this.password.length > 15){
          this.errorMsg.pwd = '密码不能超过15位'
          return ;
        }
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
