module.exports = [
  {
    path: '/',
    component: '../layouts/index',
    Routes: ['src/components/Authorized'],
    routes: [
      { path: '/', component: './home' },
      { path: '/permission/table', component: './permission/table', title: 'table' },
      { path: '/permission/role', component: './permission/role', title: '角色权限' },
      { path: '/exception/404', component: './404' },
      { path: '/user/setting', component: './user/setting', title: '用户设置' },
      { path: '/user/center', component: './user/center', title: '用户中心' },
      { path: '/login', component: './login' },
      { path: '/404', component: './404', title: '404' },
      { redirect: '/404' }
    ]
  }
]
