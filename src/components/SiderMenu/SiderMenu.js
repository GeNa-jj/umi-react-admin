import React, { PureComponent } from 'react'
import { Layout, Menu, Icon } from 'antd'
import Link from 'umi/link'
// import router from 'umi/router'
import styles from './index.less'
import {urlToList} from '@/utils'

export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        openKeys: this.getDefaultCollapsedSubMenus(nextProps)
      })
    }
  }
  /**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   * @param  props
   */
  getDefaultCollapsedSubMenus = props => {
    const { location: { pathname } } = props || this.props
    return urlToList(pathname)
  }
  /**
   * Allow menu.js config icon as string or ReactNode
   * icon: 'setting',
   * icon: 'http://demo.com/icon.png',
   * icon: <Icon type="setting" />,
   * @param icon
   * @returns {*}
   */
  getIcon = icon => {
    if (typeof icon === 'string' && icon.indexOf('http') === 0) {
      return <img src={icon} alt="icon" className={`${styles.icon} sider-menu-item-img`} />
    }
    if (typeof icon === 'string') {
      return <Icon type={icon} />
    }
    return icon
  }
  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = item => {
    const itemPath = item.path
    const icon = this.getIcon(item.icon)
    const { target, name } = item
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      )
    }
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === this.props.location.pathname}
        onClick={
          this.props.isMobile
            ? () => {
                this.props.onCollapse(true)
              }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    )
  }
  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children)
      // 当无子菜单时就不展示菜单
      if (childrenItems && childrenItems.length > 0) {
        return (
          <Menu.SubMenu
            title={
              item.icon ? (
                <span>
                  {this.getIcon(item.icon)}
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
            key={item.path || item.key}
            // onTitleClick={() => {
            //   item.path && router.push(item.path)
            // }}
          >
            {childrenItems}
          </Menu.SubMenu>
        )
      }
      return null
    } else {
      return <Menu.Item key={item.path || item.key}>{this.getMenuItemPath(item)}</Menu.Item>
    }
  }
  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = menusData => {
    if (!menusData) {
      return []
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        // make dom
        return this.getSubMenuOrItem(item)
      })
      .filter(item => item)
  }
  // 菜单展开判断
  handleOpenChange = openKeys => {
    const { collapsed } = this.props
    const lastOpenKey = openKeys[openKeys.length - 1]
    const keysList = openKeys.slice(-1 * urlToList(lastOpenKey || '').length)

    this.setState({
      openKeys: lastOpenKey ? [...keysList] : (collapsed ? this.getDefaultCollapsedSubMenus() : [...openKeys])
    })
  }
  render() {
    const {
      logo,
      collapsed,
      onCollapse,
      theme = 'dark',
      isMobile,
      location: { pathname },
      menuData
    } = this.props
    const { openKeys } = this.state
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed ? {} : {openKeys}

    return (
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={isMobile ? null : onCollapse}
        width={256}
        collapsedWidth={80}
        theme={theme}
        className={styles.sider}
      >
        <div className={`${styles.logo} ${theme === 'light' ? styles.ligth : undefined}`} key="logo">
          <Link to="/">
            <img src={logo} alt="" />
            {!collapsed && <h1>umi后台管理系统模版</h1>}
          </Link>
        </div>
        <Menu
          key="Menu"
          theme={theme}
          mode="inline"
          {...menuProps}
          onOpenChange={this.handleOpenChange}
          selectedKeys={[pathname]}
          style={{ padding: '16px 0', width: '100%' }}
        >
          {this.getNavMenuItems(menuData)}
        </Menu>
      </Layout.Sider>
    )
  }
}
