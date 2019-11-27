import fetch from '@/http/http'


//登录
export const login = (params) => fetch.fetchGet('/acme/api/login',params);
//注册
export const register = (params) => fetch.fetchPost('/acme/api/register',params);
//新增吐槽
export const saveLog = (params) => fetch.fetchPost('/acme/api/add-blog',params);
//查询吐槽
export const getLog = (params) => fetch.fetchGet('/acme/api/search-blog',params);
//查询所有类别
export const getCategory = (params) => fetch.fetchGet('/acme/api/search-category',params);
//点赞
export const setVoters = (params) => fetch.fetchPost('/acme/api/voters',params);
