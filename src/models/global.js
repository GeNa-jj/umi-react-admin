export default {

  namespace: 'global',

  state: {},

  subscriptions: {
    // TODO 一般用来监听路由
    setup({ dispatch, history }) {
      console.log('dva global')
    }
  },

  effects: {
    // TODO call异步方法 put调用reducers方法，一般用来保存state
    // *fetch({ payload }, { call, put }) {
    //   const response = yield call(api, payload)
    //   yield put({
    //     type: 'save',
    //     payload
    //   })
    // }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  }

}
