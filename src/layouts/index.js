import React from 'react'
import { Layout, Spin } from 'antd'
import {connect} from 'dva'
import withRouter from 'umi/withRouter'
import SiderMenu from '../components/SiderMenu'
import HeaderCustom from '../components/Header'
import logo from '../assets/yay.jpg'
import styles from './index.less'

class BasicLayout extends React.Component {

  state = {
    collapsed: this.props.isMobile
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const containDom = document.getElementById('main')
      containDom && containDom.scrollTo(0, 0)
    }
  }

  handleMenuCollapse = (collapsed = true) => {
    this.setState({ collapsed })
  }

  render() {
    const { children, location, isMobile, menuData, getMenuLoading } = this.props
    const { collapsed } = this.state

    if (getMenuLoading) {
      return (
        <div className={styles.loading}>
          <Spin />
        </div>
      )
    }

    if (location.pathname === '/login' || location.pathname === '/404') return children
    return (
      <Layout style={{height: '100vh'}}>
        <SiderMenu
          logo={logo}
          collapsed={collapsed}
          menuData={menuData}
          location={location}
          isMobile={isMobile}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <HeaderCustom onCollapse={this.handleMenuCollapse} collapsed={collapsed}/>
          <Layout.Content className={styles.layoutMain} id="main">
            { children }
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(connect(({global, route, loading}) => ({
    isMobile: global.isMobile,
    menuData: route.menu,
    getMenuLoading: loading.models.route  // dva只带的loading，可把请求放在里面
  })
)(BasicLayout))
