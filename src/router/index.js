import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/auth/login'
import Register from '@/pages/auth/register'
import MainLayout from '@/pages/main/mainLayout'
import Content from '@/pages/content/content'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      meta:{title:'用户登录'},
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      meta:{title:'用户注册'},
      component: Register
    },
    {
      path: '/main',
      name: 'mainLayout',
      meta:{title:'吐槽列表'},
      component: MainLayout
    },
    {
      path: '/content',
      name: 'content',
      meta:{title:'新吐槽'},
      component: Content
    }
  ]
})
