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
          path: '/permission',
          children: [
            {
              name: "table",
              path: "/permission/table"
            },
            {
              name: "路由拦截",
              path: "/permission/cannot"
            },
            {
              name: "角色权限",
              path: "/permission/role"
            }
          ]
        },
        {
          name: '错误页面',
          icon: 'warning',
          path: '/exception',
          children: [
            {
              name: "404",
              path: "/exception/404",
            }
          ]
        },
        {
          name: '个人页',
          icon: 'user',
          path: '/user',
          children: [
            {
              name: "个人设置",
              path: "/user/setting",
            },
            {
              name: "用户中心",
              path: "/user/center",
            }
          ]
        }
      ])
    }, 3000)
  }
}
