import { login, getMenu } from '@/services'
import { message } from 'antd'
import request from '@/services/axios-config'

export default {

  namespace: 'global',

  state: {
    isMobile: false,
    collapsed: false,
    menuData: [],
    showLoading: true
  },

  subscriptions: {
    // TODO 一般用来监听路由
    setup ({dispatch, history}) {
      // 取消上一页请求
      history.listen(location => {
        request.pending.forEach((item, index) => {
          item.Cancel()
          request.pending.splice(index, 1)
        })
      })
    },

    setupClientWidth({ dispatch }) {
      dispatch({
        type: 'getClientWidth'
      })
      window.onresize = () => {
        dispatch({
          type: 'getClientWidth'
        })
      }
    }
  },

  effects: {
    // TODO call异步方法 put调用reducers方法，一般用来保存state
    // *fetch({ payload }, { call, put }) {
    //   const response = yield call(api, payload)
    //   yield put({
    //     type: 'updateState',
    //     payload
    //   })
    // }

    // 获取当前浏览器宽度并设置isMobile管理响应式
    *getClientWidth({ payload }, { call, put }) {
      const clientWidth = window.innerWidth
      yield put({
        type: 'updateState',
        payload: {
          isMobile: clientWidth <= 576,
          clientWidth
        }
      })
    },

    // 登录
    *login({ payload, callback }, { call, put }) {
      const response = yield call(login, payload)
      if (response && response.code === '0') {
        const res = response.data || {}
        callback && callback(res)
      } else {
        message.error(response.message)
      }
    },

    // 修改密码
    // *changePassword({ payload, callback }, { call, put }) {
    //   const response = yield call(changePassword, payload)
    //   if (response && response.code === '0') {
    //     callback && callback()
    //   } else {
    //     message.error(response.message)
    //   }
    // },

    // 获取菜单
    *getMenu({ payload, callback }, { call, put }) {
      const response = yield call(getMenu, payload)
      console.log(response)
      if (response && response.code === '0') {
        const res = response.data || {}
        yield put({
          type: 'updateState',
          payload: {
            menuData: res.menus || [],
            showLoading: false
          }
        })
        callback && callback()
      } else {
        message.error(response.message)
      }
    }

  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  }

}
