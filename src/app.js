import { message } from 'antd'
import { $cookies } from '@/utils/cookie'
import router from 'umi/router'

// 检查是否已登陆
const checkLogin = () => !$cookies.isKey('token') && router.replace('/login')

export const dva = {
  config: {
    onError(err) {
      err.preventDefault()
      err.message && message.error(err.message)
    }
  }
}

// 用于运行时修改路由
export function patchRoutes(routes) {
}

// 渲染应用之前做权限校验，不通过则跳转到登录页
export function render(oldRender) {
  checkLogin()
  oldRender()
}

// 用于在初始加载和路由切换时做一些事情(埋点统计)
export function onRouteChange({ location, routes, action }) {
}

// 修改传给路由组件的 props
export function modifyRouteProps(props, { route }) {
  return { ...props }
}
