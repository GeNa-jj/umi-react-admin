import React from 'react'
import {Layout, Spin} from 'antd'
import {connect} from 'dva'
import withRouter from 'umi/withRouter'
import SiderMenu from '../components/SiderMenu'
import HeaderCustom from '../components/Header'
import Breakcrumbs from '../components/Breakcrumbs'
// import logo from '../assets/images/bus.png'
import styles from './index.less'

class BasicLayout extends React.Component {

  handleMenuCollapse = (collapsed = true) => {
    const {dispatch} = this.props
    dispatch({
      type: 'global/updateState',
      payload: {collapsed}
    })
  }

  getMenu = () => {
    const {dispatch, location: {pathname}} = this.props
    if (pathname !== '/login' && pathname !== '/404') dispatch({ type: 'global/getMenu' })
  }

  componentDidMount() {
    this.getMenu()
  }

  render() {
    const { children, location, isMobile, collapsed, menuData, showLoading } = this.props

    if (['/login', '/404'].includes(location.pathname) || window.name) return children

    if (showLoading) {
      return (
        <div className="loading">
          <Spin size="large"/>
        </div>
      )
    }

    return (
      <Layout style={{height: '100vh'}}>
        <SiderMenu
          // logo={logo}
          collapsed={collapsed}
          menuData={menuData}
          location={location}
          isMobile={isMobile}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <HeaderCustom onCollapse={this.handleMenuCollapse} collapsed={collapsed}/>
          <Layout.Content className={styles.layoutMain} id="main">
            <div>
              <Breakcrumbs location={location} menuData={menuData} />
              { children }
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(connect(({global}) => ({
  isMobile: global.isMobile,
  collapsed: global.collapsed,
  menuData: global.menuData,
  showLoading: global.showLoading
}))(BasicLayout))
