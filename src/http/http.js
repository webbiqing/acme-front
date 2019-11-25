import axios from 'axios'
import {Notify} from 'vant';

const service = axios.create({
   baseURL: process.env.BASE_URL
})

service.interceptors.request.use(
  config => {
      config.headers.Authorization = 'Bearer ' + window.sessionStorage.token  //请求头加上token
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

service.interceptors.response.use(
  response => {
    //拦截响应，做统一处理
    if(response.data && response.data.code === 400){
      Notify({type: 'danger', message: response.data.message});
    }else if(response.data.code === 401){
      Notify({type: 'danger', message: '认证信息认证失败，前往登录页面'});
      this.$router.push('/login')
    }
    return response
  },
  //接口错误状态处理，也就是说无响应时的处理
  error => {
    return Promise.reject(error) // 返回接口返回的错误信息
  })

const fetchGet = (url,params)=>{
   return new Promise((resolve,reject)=>{
      service.get(url,{params:params}).then(response=>{
        resolve(response.data)
      }).catch(error=>{
        reject(error)
      })
   })
}

const fetchPost = (url,params)=>{
    return new Promise((resolve,reject)=>{
       service.post(url,params).then(response=>{
         resolve(response.data)
       }).catch(error=>{
         reject(error)
       })
    })
 }

 export default{
    fetchGet,
    fetchPost
 }
