export default {
  '/api/menus': (req, res) => {
    setTimeout(() => {
      res.send({
        data: {
          data: {menus: [
              {
                name: '首页',
                icon: 'dashboard',
                path: '/'
              },
              {
                name: '错误页面',
                icon: 'warning',
                path: '/404',
                children: [
                  {
                    name: "404",
                    path: "/404",
                  }
                ]
              },
              {
                "id": "7",
                "name": "系统管理",
                "parentId": 0,
                "path": "/setting",
                "icon": "setting",
                "children": [
                  {
                    "id": "8",
                    "name": "机构管理",
                    "parentId": 7,
                    "path": "/setting/mechanism"
                  },
                  {
                    "id": "9",
                    "name": "用户管理",
                    "parentId": 7,
                    "path": "/setting/user"
                  },
                  {
                    "id": "10",
                    "name": "菜单管理",
                    "parentId": 7,
                    "path": "/setting/menu"
                  },
                  {
                    "id": "11",
                    "name": "角色管理",
                    "parentId": 7,
                    "path": "/setting/role"
                  }
                ]
              }
            ]},
          code: '0',
          message: '响应正常，有数据返回'
        }
      })
    }, 0)
  }
}
