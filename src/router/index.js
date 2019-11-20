import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/auth/login'
import MainLayout from '@/pages/main/mainLayout'
import Content from '@/pages/content/content'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'mainLayout',
      component: MainLayout
    },
    {
      path: '/content',
      name: 'content',
      component: Content
    }
  ]
})
