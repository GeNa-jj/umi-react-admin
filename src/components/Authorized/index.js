import React from 'react'
import { connect } from 'dva'
import router from 'umi/router'

const getFlatMenuKeys = menus => {
  let keys = []
  menus.forEach(item => {
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children))
    }
    if (!item.children || item.children.length === 0) keys.push(item.path)
  })
  return keys
}

class AuthRouter extends React.Component {

  state = {
    defaultMenu: ['/', '/404', '/login']
  }

  static getDerivedStateFromProps(props, state) {
    const { menuData, location: { pathname } } = props
    const {defaultMenu} =  state

    if (defaultMenu.indexOf(pathname) === -1 && getFlatMenuKeys(menuData).indexOf(pathname) === -1) {
      router.push('/404')
    }

    return null
  }

  render() {
    return this.props.children
  }
}

export default connect(({route}) => ({
    menuData: route.menu
  })
)(AuthRouter)
