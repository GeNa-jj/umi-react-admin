import React from 'react'
import { Layout } from 'antd'
import {connect} from 'dva'
import withRouter from 'umi/withRouter'
import SiderMenu from '../components/SiderMenu'
import HeaderCustom from '../components/Header'
import logo from '../assets/yay.jpg'
import { getMenuData } from '../common/menu'
import styles from './index.less'
import router from 'umi/router'
import {$cookies} from '../utils/cookie'

class BasicLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  componentWillMount() {
    this.checkLogin()

    this.getClientWidth()
    window.onresize = () => {
      this.getClientWidth()
    }
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.location !== prevProps.location) {
  //     window.scrollTo(0, 0)
  //   }
  // }

  // 获取当前浏览器宽度并设置isMobile管理响应式
  getClientWidth = () => {
    const {dispatch} = this.props
    const clientWidth = window.innerWidth
    dispatch({
      type: 'global/save',
      payload: {isMobile: clientWidth <= 576}
    })
  }

  // 检查是否已登陆
  checkLogin = () => {
    if (!$cookies.isKey('token')) router.replace('/login')
  }

  handleMenuCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    const { children, location, isMobile } = this.props
    const { collapsed } = this.state

    if (location.pathname === '/login' || location.pathname === '/404') return children
    return (
      <Layout style={{height: '100vh'}}>
        <SiderMenu
          logo={logo}
          collapsed={collapsed}
          menuData={getMenuData()}
          location={location}
          isMobile={isMobile}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <HeaderCustom onCollapse={this.handleMenuCollapse} collapsed={collapsed}/>
          <Layout.Content className={styles.layoutMain}>
            { children }
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(connect(({global}) => ({
  isMobile: global.isMobile
}))(BasicLayout))
