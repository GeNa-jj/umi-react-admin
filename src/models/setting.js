// import {getOrganizationList, getAllOrganizationList, saveOrUpdateOrganization, deleteOrganization, getMenuList, getAllMenuList, saveOrUpdateMenu, deleteMenu, getRoleList, getAllRoleList, saveOrUpdateRole, deleteRole, getUserList, saveOrUpdateUser, deleteUser} from '@/services'
// import {message} from 'antd'

export default {

  namespace: 'setting',

  state: {
    organizationList: [],
    allOrganizationList: [],
    menuList: [],
    allMenuList: [],
    roleList: [],
    allRoleList: [],
    userList: []
  },

  subscriptions: {
  },

  effects: {
    // *getOrganizationList({ payload, callback }, { call, put }) {
    //   const response = yield call(getOrganizationList, payload)
    //   if (response && response.code === '0') {
    //     const res = response.data || {}
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         organizationList: res.list || []
    //       }
    //     })
    //     callback && callback(res.total || 0)
    //   } else {
    //     message.error(response.message)
    //   }
    // },
    // *getAllOrganizationList({ payload, callback }, { call, put }) {
    //   const response = yield call(getAllOrganizationList, payload)
    //   if (response && response.code === '0') {
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         allOrganizationList: response.data || []
    //       }
    //     })
    //   } else {
    //     message.error(response.message)
    //   }
    // },
    // *saveOrUpdateOrganization({ payload, callback }, { call, put }) {
    //   const response = yield call(saveOrUpdateOrganization, payload)
    //   if (response && response.code === '0') {
    //     callback && callback()
    //   } else {
    //     message.error(response.message)
    //   }
    // },
    // *deleteOrganization({ payload, callback }, { call, put }) {
    //   const response = yield call(deleteOrganization, payload)
    //   if (response && response.code === '0') {
    //     callback && callback()
    //   } else {
    //     message.error(response.message)
    //   }
    // },
    //
    // *getMenuList({ payload, callback }, { call, put }) {
    //   const response = yield call(getMenuList, payload)
    //   if (response && response.code === '0') {
    //     const res = response.data || {}
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         menuList: res.list || []
    //       }
    //     })
    //     callback && callback(res.total || 0)
    //   } else {
    //     message.error(response.message)
    //   }
    // },
    // *getAllMenuList({ payload, callback }, { call, put }) {
    //   const response = yield call(getAllMenuList, payload)
    //   if (response && response.code === '0') {
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         allMenuList: response.data || []
    //       }
    //     })
    //   } else {
    //     message.error(response.message)
    //   }
    // },
    // *saveOrUpdateMenu({ payload, callback }, { call, put }) {
    //   const response = yield call(saveOrUpdateMenu, payload)
    //   if (response && response.code === '0') {
    //     callback && callback()
    //   } else {
    //     message.error(response.message)
    //   }
    // },
    // *deleteMenu({ payload, callback }, { call, put }) {
    //   const response = yield call(deleteMenu, payload)
    //   if (response && response.code === '0') {
    //     callback && callback()
    //   } else {
    //     message.error(response.message)
    //   }
    // },
    //
    // *getRoleList({ payload, callback }, { call, put }) {
    //   const response = yield call(getRoleList, payload)
    //   if (response && response.code === '0') {
    //     const res = response.data || {}
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         roleList: res.list || []
    //       }
    //     })
    //     callback && callback(res.total || 0)
    //   } else {
    //     message.error(response.message)
    //   }
    // },
    // *getAllRoleList({ payload, callback }, { call, put }) {
    //   const response = yield call(getAllRoleList, payload)
    //   if (response && response.code === '0') {
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         allRoleList: response.data || []
    //       }
    //     })
    //   } else {
    //     message.error(response.message)
    //   }
    // },
    // *saveOrUpdateRole({ payload, callback }, { call, put }) {
    //   const response = yield call(saveOrUpdateRole, payload)
    //   if (response && response.code === '0') {
    //     callback && callback()
    //   } else {
    //     message.error(response.message)
    //   }
    // },
    // *deleteRole({ payload, callback }, { call, put }) {
    //   const response = yield call(deleteRole, payload)
    //   if (response && response.code === '0') {
    //     callback && callback()
    //   } else {
    //     message.error(response.message)
    //   }
    // },
    //
    // *getUserList({ payload, callback }, { call, put }) {
    //   const response = yield call(getUserList, payload)
    //   if (response && response.code === '0') {
    //     const res = response.data || {}
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         userList: res.list || []
    //       }
    //     })
    //     callback && callback(res.total || 0)
    //   } else {
    //     message.error(response.message)
    //   }
    // },
    // *saveOrUpdateUser({ payload, callback }, { call, put }) {
    //   const response = yield call(saveOrUpdateUser, payload)
    //   if (response && response.code === '0') {
    //     callback && callback()
    //   } else {
    //     message.error(response.message)
    //   }
    // },
    // *deleteUser({ payload, callback }, { call, put }) {
    //   const response = yield call(deleteUser, payload)
    //   if (response && response.code === '0') {
    //     callback && callback()
    //   } else {
    //     message.error(response.message)
    //   }
    // },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  }

}
