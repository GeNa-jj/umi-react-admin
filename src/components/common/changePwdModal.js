import {Form, Input, Modal} from "antd"
import React from "react"

class ChangePwdMoadl extends React.Component {
	state = {
		confirmDirty: false
	}

	handleOk = e => {
		e.preventDefault()
		this.props.form.validateFields((err, data) => {
			if (!err) {
				this.props.ensure(data)
			}
		})
	}

	handleCancel = () => {
		this.props.form.resetFields()
		this.props.close()
	}

	handleConfirmBlur = e => {
		const { value } = e.target
		this.setState({ confirmDirty: this.state.confirmDirty || !!value })
	}

	password = (rule, value, callback) => {
		const { form } = this.props
		const reg = /^[a-zA-Z\d]{8,16}$/
		if (value && !reg.test(value)) {
			return callback(new Error('请输入8~16位大小写字母或数字'))
		} else if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true })
		}
		callback()
	}

	confirmPassword = (rule, value, callback) => {
		const { form } = this.props
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!')
		} else {
			callback()
		}
	}

	handleStart = e => {
		console.log(e)
	}

	render() {
		const {getFieldDecorator} = this.props.form
		return (
				<Modal
						width={400}
						title="修改密码"
						visible={this.props.visible}
						onOk={this.handleOk}
						onCancel={this.handleCancel}
				>
					<Form onSubmit={this.handleSubmit} className="change-password-form">
						<Form.Item label="Old Password">
							{getFieldDecorator('old', {
								rules: [{required: true, message: 'Please input your Old Password!'}],
							})(<Input.Password placeholder="oldPassword"/>)}
						</Form.Item>
						<Form.Item label="Password">
							{getFieldDecorator('password', {
								rules: [{required: true, message: 'Please input your Password!'}, {
									validator: this.password
								}]
							})(<Input.Password placeholder="password"/>)}
						</Form.Item>
						<Form.Item label="Confirm Password">
							{getFieldDecorator('confirm', {
								rules: [{required: true, message: 'Please input your Confirm Password!'}, {
									validator: this.confirmPassword
								}]
							})(<Input.Password placeholder="confirmPassword" onBlur={this.handleConfirmBlur}/>)}
						</Form.Item>
					</Form>
				</Modal>
		)
	}
}

export default Form.create()(ChangePwdMoadl)
