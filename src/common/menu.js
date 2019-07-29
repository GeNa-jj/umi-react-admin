/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g

export function isUrl(path) {
  return reg.test(path)
}

const menuData = [
  {
    name: '首页',
    icon: 'dashboard',
    path: ''
  },
  {
    name: '权限测试',
    icon: 'lock',
    path: 'text',
    children: [
      {
        name: "table",
        path: "can"
      },
      {
        name: "路由拦截",
        path: "cannot"
      }
    ]
  },
  {
    name: '错误页面',
    icon: 'user',
    path: 'exception',
    children: [
      {
        name: "404",
        path: "404"
      }
    ]
  }
]

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item
    if (!isUrl(path)) {
      path = parentPath + item.path
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority
    }
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority)
    }
    return result
  })
}

export const getMenuData = () => formatter(menuData)
