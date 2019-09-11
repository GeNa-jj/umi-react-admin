import React from 'react'
import { Form, Modal } from 'antd';

class AddRoleModal extends React.Component {

  handleOk = e => {
    e.preventDefault()
    this.props.form.validateFields((err, data) => {
      if (!err) {
        console.log(data)
      }
    })
  }

  handleCancel = () => {
    this.props.form.resetFields()
    this.props.close()
  }

  render() {
    const {visible} = this.props
    return (
      <Modal
        width={700}
        title="New Role"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <div>123</div>
      </Modal>
    )
  }
}

export default Form.create()(AddRoleModal)
