import request from './axios-config'
// 登录
export const login = params => request.$ajax.post(`/api/user/login`, params).then(res => res.data)
// 登出
export const logout = params => request.$ajax.post(`/api/user/logout`, params).then(res => res.data)
// 菜单
export const getMenu = params => request.$ajax.get(`/api/menus`, {params: {...params}}).then(res => res.data)

