import React from 'react'
import {Layout, Icon, Menu, Dropdown, message} from 'antd'
import router from 'umi/router'
import style from './index.less'
import {$cookies} from "../../utils/cookie"
import ChangePwdModal from '../common/changePwdModal'
import {logout} from '../../services'

const {Header} = Layout

export default class HeaderCustom extends React.Component {
  state = {
    showChangePwdDodal: false
  }

  showModal = () => {
    this.setState({
      showChangePwdDodal: true
    })
  }

  closeModal = () => {
    this.setState({
      showChangePwdDodal: false
    })
  }

  menuClick = e => {
    switch (e.key) {
      case '1':
        this.showModal()
        break
      case '2':
        this.logout()
        break
      default:
        return null
    }
  }

  changePwd = data => {
    console.log('changePwd', data)
    this.closeModal()
  }

  logout = () => {
    logout({
      token: $cookies.get('token')
    }).then((data) => {
      if (data && data.header === '000') {
        $cookies.remove('token')
        $cookies.remove('menu')
        router.replace('/login')
      } else {
        message.error(data.message)
      }
    })
  }

  menu = () => (
    <Menu onClick={this.menuClick}>
      <Menu.Item key="1">
        <Icon type="lock" />
        修改密码
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <Icon type="logout" />
        退出登录
      </Menu.Item>
    </Menu>
  )

  render() {
    const {collapsed, onCollapse} = this.props
    return (
      <Header className={style.headerCustom}>
        <Icon
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={onCollapse}
        />

        <Dropdown overlay={this.menu} trigger={['click']}>
						<span className="ant-dropdown-link">
							 用户中心 <Icon type="down"/>
						</span>
        </Dropdown>
        <ChangePwdModal close={this.closeModal} ensure={this.changePwd} visible={this.state.showChangePwdDodal}/>
      </Header>
    )
  }
}
