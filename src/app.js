// import { message } from 'antd'
import router from 'umi/router'
import cookie from 'react-cookies'

export const dva = {
  config: {
    onError(err) {
      err.preventDefault()
      if (err.message) {
        // message.destroy()
        // message.error('数据异常，请联系管理员')
        // message.error(err.message)
      }
    },
    onReducer: r => (state, action) => {
      if (action.payload && !action.payload.isFirstRendering && action.payload.location && action.payload.location.pathname === '/login') {
        return r({}, action)
      }
      return r(state, action)
    }
  }
}

// 用于运行时修改路由
export function patchRoutes(routes) {
}

// 渲染应用之前做权限校验，不通过则跳转到登录页
export function render(oldRender) {
  !cookie.load('token_ht_admin') && window.location.pathname !== '/login' && router.replace({
    pathname: '/login',
    query: {
      from: encodeURIComponent(window.location.pathname + window.location.search)
    }
  })
  oldRender()
}

// 用于在初始加载和路由切换时做一些事情(埋点统计)
export function onRouteChange({ location, routes, action }) {
}

// 修改传给路由组件的 props
export function modifyRouteProps(props, { route }) {
  return { ...props }
}
