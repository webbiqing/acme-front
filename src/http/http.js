import axios from 'axios'

const service = axios.create({
   baseURL: process.env.BASE_URL
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