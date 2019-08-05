export default {
  '/api/menus': (req, res) => {
    setTimeout(() => {
      res.send([
        {
          name: '首页',
          icon: 'dashboard',
          path: '/'
        },
        {
          name: '权限测试',
          icon: 'lock',
          path: '/test',
          children: [
            {
              name: "table",
              path: "/test/table"
            },
            {
              name: "路由拦截",
              path: "/test/cannot"
            }
          ]
        },
        {
          name: '错误页面',
          icon: 'user',
          path: '/exception',
          children: [
            {
              name: "404",
              path: "/exception/404",
            }
          ]
        }
      ])
    }, 3000)
  }
}
