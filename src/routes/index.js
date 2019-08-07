module.exports = [
  {
    path: '/',
    component: '../layouts/index',
    Routes: ['src/components/Authorized'],
    routes: [
      { path: '/', component: './home' },
      { path: '/test/table', component: './table', title: 'table' },
      { path: '/exception/404', component: './404' },
      { path: '/user/setting', component: './user/setting', title: '用户设置' },
      { path: '/login', component: './login' },
      { path: '/404', component: './404', title: '404' },
      { redirect: '/404' }
    ]
  }
]
