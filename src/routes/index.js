module.exports = [
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      { path: '/', component: './home' },
      { path: '/login', component: './login' },
      { path: '/404', component: './404' },
      // 系统管理
      { path: '/setting/mechanism', component: './setting/mechanism', Routes: ['src/routes/PrivateRoute'] },
      { path: '/setting/user', component: './setting/user', Routes: ['src/routes/PrivateRoute'] },
      { path: '/setting/menu', component: './setting/menu', Routes: ['src/routes/PrivateRoute'] },
      { path: '/setting/role', component: './setting/role', Routes: ['src/routes/PrivateRoute'] },

      { redirect: '/404' }
    ]
  }
]
