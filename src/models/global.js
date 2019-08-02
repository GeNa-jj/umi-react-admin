export default {

  namespace: 'global',

  state: {
    isMobile: false
  },

  subscriptions: {
    // TODO 一般用来监听路由
    setup({ dispatch, history }) {
      console.log('dva global')
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
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  }

}
