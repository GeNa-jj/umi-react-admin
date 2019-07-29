import request from './axios-config'
// 登录
export const login = parames => request.$ajax.post(`/web/public/login`, parames).then(res => res.data)
// 登出
export const logout = parames => request.$ajax.post(`/web/public/loginOut`, parames).then(res => res.data)
