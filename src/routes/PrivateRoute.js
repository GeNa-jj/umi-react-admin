import React from 'react'
import Redirect from 'umi/redirect'
import { connect } from 'dva'
import {urlToList} from '@/utils'

class AuthRouter extends React.Component {

  getRoute = (menu = []) => {
    return menu.map(item => {
      if (item.children) {
        return this.getRoute(item.children)
      }
      return item.path
    })
  }

  render() {
    const { children, location: {pathname}, menuData, showLoading } = this.props

    return (
      this.getRoute(menuData).flat(Infinity).includes(urlToList(pathname)[1]) ? children : !showLoading && <Redirect to="/404" />
    )
  }
}

export default connect(({global}) => ({
  menuData: global.menuData,
  showLoading: global.showLoading
}))(AuthRouter)
