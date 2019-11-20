import fetch from '@/http/http'


//登录
export const login = (params) => fetch.fetchGet('/weapp/login',params);
//新增吐槽
export const saveLog = (params) => fetch.fetchPost('/weapp/add-blog',params);
//查询吐槽
export const getLog = (params) => fetch.fetchGet('/weapp/search-blog',params);
//查询所有类别
export const getCategory = (params) => fetch.fetchGet('/weapp/search-category',params);
