import React from 'react'
import {Form, Icon, Input, Button, message} from 'antd'
import {$cookies} from '../../utils/cookie'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import styles from './index.less'
import {login} from '../../services'
import router from 'umi/router'

class Login extends React.Component {

	handleSubmit = e => {
		e.preventDefault()
		this.props.form.validateFields((err, data) => {
			if (!err) {
				this.login(data)
			}
		})
	}

	login = data => {
		NProgress.done()
		NProgress.start()

    login({
      account: data.username,
      password: data.password,
      type: '0'
    }).then(data => {
			NProgress.done()
			if (data && data.header === '000') {
				$cookies.set('token', data.data.token, data.data.effectTime)
				$cookies.set('menu', JSON.stringify(data.data.menu), data.data.effectTime)
				router.replace('/')
			} else {
				message.error(data.message)
			}
		}).catch(() => NProgress.done())
	}

	// password = (rule, value, callback) => {
	// 	const reg = /^[a-zA-Z\d]{8,16}$/
	// 	if (value && !reg.test(value)) {
	// 		return callback(new Error('请输入8~16位大小写字母或数字'))
	// 	}
	// 	callback()
	// }

	render() {
		const {getFieldDecorator} = this.props.form
		return (
				<div className={styles.login}>
					<div>
						<h2>用户登录</h2>
						<Form onSubmit={this.handleSubmit} className="login-form">
							<Form.Item label="账号">
								{getFieldDecorator('username', {
									rules: [{required: true, message: 'Please input your username!'}],
								})(
										<Input
												prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
												placeholder="Username"
										/>
								)}
							</Form.Item>
							<Form.Item label="密码">
								{getFieldDecorator('password', {
									rules: [{required: true, message: 'Please input your Password!'}]
								})(
										<Input
												prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
												type="password"
												placeholder="Password"
										/>
								)}
							</Form.Item>
							<Form.Item>
								<Button type="primary" htmlType="submit" className="login-form-button">
									Log in
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
		)
	}
}

export default Form.create()(Login)
