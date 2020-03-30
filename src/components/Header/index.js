import React from 'react'
import {Layout, Icon, Menu, Dropdown, Modal, Input, Form} from 'antd'
import styles from './index.less'
import cookie from 'react-cookies'
import router from 'umi/router'
import {connect} from 'dva'

class HeaderCustom extends React.Component {

  state = {
    showChangeword: false
  }

  handleClick = ({ key }) => {
    switch (key) {
      case '1':
        this.setState({showChangeword: true})
        break
      case '2':
        this.showLogout()
        break
      default:
    }
  }

  menu = () => {
    return (
      <Menu onClick={this.handleClick}>
        <Menu.Item key="1">修改密码</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">退出</Menu.Item>
      </Menu>
    )
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props
    const reg = /^[a-zA-Z\d]{6,16}$/
    if (value && !reg.test(value)) {
      callback('请输入6~16位字母或数字')
    } else {
      if (form.getFieldValue('newPasswordAgain')) {
        form.validateFields(['newPasswordAgain'], { force: true })
      }
      callback()
    }
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('两次输入密码不一致')
    } else {
      callback()
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.changePassword(values)
      }
    })
  }

  changePassword = values => {
    const {dispatch} = this.props

    dispatch({
      type: 'global/changePassword',
      payload: {
        ...values
      },
      callback: () => {
        this.setState({showChangeword: false})
        this.props.form.resetFields()

        cookie.remove('token_ht_admin')
        Modal.success({
          content: '修改成功, 请重新登录！',
          okText: '确定',
          onOk() {
            router.replace('/login')
          }
        })
      }
    })
  }

  showLogout = () => {
    Modal.confirm({
      title: '提示',
      content: '是否退出登录？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        cookie.remove('token_ht_admin')
        router.replace('/login')
      }
    })
  }

  render() {
    const {showChangeword} = this.state
    const {form: { getFieldDecorator }, collapsed, onCollapse, changePasswordLoading} = this.props

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }

    return (
      <Layout.Header className={styles.headerCustom}>
        <Icon
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={() => {
            onCollapse(!collapsed)
          }}
        />

        <Dropdown overlay={this.menu} trigger={['click']}>
          <span>
            个人中心 <Icon type="down" />
          </span>
        </Dropdown>



        <Modal
          closable={false}
          width={500}
          visible={showChangeword}
          maskClosable={false}
          title="修改密码"
          okButtonProps={{loading: changePasswordLoading}}
          onOk={this.handleSubmit}
          onCancel={() => {
            this.setState({showChangeword: false})
            this.props.form.resetFields()
          }}>
          <div>
            <Form {...formItemLayout}>
              <Form.Item label="旧密码">
                {getFieldDecorator('oldPassword', {
                  rules: [{ required: true, message: '旧密码不能为空' }]
                })(<Input.Password autoComplete="new-password"/>)}
              </Form.Item>
              <Form.Item label="新密码">
                {getFieldDecorator('newPassword', {
                  rules: [{ required: true, message: '请输入密码' }, {
                    validator: this.validateToNextPassword,
                  }]
                })(<Input.Password autoComplete="new-password"/>)}
              </Form.Item>
              <Form.Item label="确认密码">
                {getFieldDecorator('newPasswordAgain', {
                  rules: [{ required: true, message: '请再次输入密码' }, {
                    validator: this.compareToFirstPassword,
                  }]
                })(<Input.Password autoComplete="new-password"/>)}
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </Layout.Header>
    )
  }
}

export default connect(({loading}) => ({
  changePasswordLoading: loading.effects['global/changePassword']
}))(Form.create()(HeaderCustom))
