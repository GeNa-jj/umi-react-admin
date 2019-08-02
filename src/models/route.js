import {getMenu} from '../services'

export default {

  namespace: 'route',

  state: {
    menu: JSON.parse(localStorage.getItem('menu'))
  },

  subscriptions: {
    setup({ dispatch, history }) {
      console.log('dva route')
    }
  },

  effects: {

    // 获取当前浏览器宽度并设置isMobile管理响应式
    *getMenuData({ payload }, { call, put }) {
      const menu = yield call(getMenu, payload)
      yield put({
        type: 'updateState',
        payload: {
          menu
        }
      })
      localStorage.setItem('menu', JSON.stringify(menu))
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
