import React from 'react'
import styles from './index.less'
import {connect} from 'dva'
import {Form, Input, Button, message, Icon} from 'antd'
import cookie from 'react-cookies'
import router from 'umi/router'

class Login extends React.Component {

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (!values.userName || !values.password) {
          message.destroy()
          message.warning('账号或密码不能为空！')
          return false
        }

        this.login(values)
      }
    })
  }

  login = values => {
    const {dispatch, location: {query}} = this.props

    dispatch({
      type: 'global/login',
      payload: {
        ...values
      },
      callback: res => {
        cookie.save('token_ht_admin', res.authToken, {maxAge: 60 * 60 * 12, path: '/'})
        dispatch({
          type: 'global/getMenu',
          callback: () => router.replace(query.from ? decodeURIComponent(query.from) : '/')
        })
      }
    })
  }

  render() {
    const { form: {getFieldDecorator}, loginLoading } = this.props

    return (
      <div className={`${styles.login} bgImg`}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <h1>umi后台管理系统模版</h1>
          </div>
          <Form className={styles.loginBox} onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('userName')(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" placeholder="账号"/>)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password')(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" type="password" placeholder="密码"/>)}
            </Form.Item>
            <Form.Item className={styles.loginButton}>
              <Button type="primary" htmlType="submit" size="large" loading={loginLoading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default connect(({loading}) => ({
  loginLoading: loading.effects['global/login']
}))(Form.create()(Login))
