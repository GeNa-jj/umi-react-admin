import React from 'react'
import {connect} from 'dva'
import { Button, Card, Form, Input, Table, Modal, Col, Row, Select, TreeSelect, message, Tooltip, Icon, Divider, Popconfirm } from 'antd'

const CreateForm = Form.create()(props => {
  const { modalVisible, modalTitleStatus, modalRecord, allOrganizationList, form, saveOrUpdateOrganization, handleModalVisible, getAllOrganizationList, saveOrUpdateOrganizationLoading } = props

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return

      const values = {
        ...fieldsValue,
        id: modalRecord.id
      }

      saveOrUpdateOrganization(values)
    })
  }

  const setTreeNode = (item = [], disabled = false) => (
    item.map(ite => {
      const disSelectable = ite.id === modalRecord.id || disabled
      return (
        <TreeSelect.TreeNode value={ite.id} title={ite.orgName} key={ite.id} disabled={disSelectable}>
          {ite.children && setTreeNode(ite.children, disSelectable)}
        </TreeSelect.TreeNode>
      )
    })
  )

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  }

  return (
    <Modal
      width={900}
      destroyOnClose
      title={modalTitleStatus === 1 ? '新增机构' : '编辑机构'}
      visible={modalVisible}
      maskClosable={false}
      okButtonProps={{loading: saveOrUpdateOrganizationLoading}}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <Form {...formItemLayout}>
        <Row>
          <Col xs={24} sm={12}>
            <Form.Item label="机构名称">
              {form.getFieldDecorator('orgName', {
                initialValue: modalRecord.orgName,
                rules: [{ required: true, message: '请输入机构名称' }]
              })(<Input placeholder="请输入" maxLength={20} autoComplete="off"/>)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="机构编码">
              {form.getFieldDecorator('orgCode', {
                initialValue: modalRecord.orgCode,
                rules: [{ required: true, message: '请输入8位数字', pattern: /^\+?[0-9]{8}$/ }]
              })(<Input placeholder="请输入" disabled={!!modalRecord.orgCode} maxLength={8} autoComplete="off"/>)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="机构类型">
              {form.getFieldDecorator('orgType', {
                initialValue: modalRecord.orgType,
                rules: [{ required: true, message: '请选择机构类型' }]
              })(<Select
                placeholder="请选择"
                allowClear
              >
                <Select.Option value="总公司" key="总公司">总公司</Select.Option>
                <Select.Option value="子公司" key="子公司">子公司</Select.Option>
              </Select>)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="上级机构">
              {form.getFieldDecorator('parentId', {
                initialValue: modalRecord.parentId,
                rules: [{ required: true, message: '请选择上级机构' }]
              })(<TreeSelect
                placeholder="请选择"
                allowClear
                treeDefaultExpandAll
                dropdownStyle={{ maxHeight: 250, maxWidth: 217, overflow: 'auto' }}
                onFocus={getAllOrganizationList}>
                <TreeSelect.TreeNode value={0} title="无" key={0} />
                {setTreeNode(allOrganizationList)}
              </TreeSelect>)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="联系人">
              {form.getFieldDecorator('contacts', {
                initialValue: modalRecord.contacts
              })(<Input placeholder="请输入" maxLength={10} autoComplete="off"/>)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24}>
            <Form.Item label="地址" labelCol={{
              xs: { span: 24 },
              sm: { span: 3 }
            }} wrapperCol={{
              xs: { span: 24 },
              sm: { span: 20 }
            }}>
              {form.getFieldDecorator('address', {
                initialValue: modalRecord.address
              })(<Input placeholder="请输入" maxLength={50}  autoComplete="off"/>)}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})

class Mechanism extends React.Component {

  state = {
    modalVisible: false,
    modalTitleStatus: '',
    modalRecord: {}
  }

  // 查询
  handleSearch = e => {
    e && e.preventDefault()
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return

      this.getOrganizationList(fieldsValue)
    })
  }

  // 获取机构列表
  getOrganizationList = (searchs = {}) => {
    const {dispatch} = this.props

    dispatch({
      type: 'setting/getOrganizationList',
      payload: {
        ...searchs
      },
      callback: total => {
        this.setState({total})
      }
    })
  }

  // 展示/关闭弹窗
  handleModalVisible = (flag, titleStatus, record = {}) => {
    this.setState({
      modalVisible: !!flag,
      modalTitleStatus: titleStatus,
      modalRecord: record
    })
    !!flag && this.getAllOrganizationList()
  }

  // 新增或更新机构信息
  saveOrUpdateOrganization = (fields = {}) => {
    const {dispatch} = this.props

    dispatch({
      type: 'setting/saveOrUpdateOrganization',
      payload: {
        ...fields
      },
      callback: () => {
        message.success(fields.id ? '修改成功！' : '新建成功！')
        this.setData()
      }
    })
  }

  // 删除机构
  deleteOrganization = id => {
    const {dispatch} = this.props
    dispatch({
      type: 'setting/deleteOrganization',
      payload: {
        id
      },
      callback: () => {
        message.success('删除成功！')
        this.setData()
      }
    })
  }

  // 重置列表和下拉数据
  setData = () => {
    const {dispatch} = this.props
    dispatch({
      type: 'setting/updateState',
      payload: {
        allOrganizationList: []
      }
    })
    this.handleModalVisible()
    this.handleSearch()
  }

  // 查询所有机构
  getAllOrganizationList = () => {
    const {dispatch, allOrganizationList} = this.props
    allOrganizationList.length === 0 && dispatch({type: 'setting/getAllOrganizationList'})
  }

  componentDidMount() {
    this.handleSearch()
  }

  render() {
    const {modalVisible, modalTitleStatus, modalRecord} = this.state
    const { form: {getFieldDecorator}, organizationList, allOrganizationList, getOrganizationListLoading, saveOrUpdateOrganizationLoading, deleteOrganizationLoading } = this.props

    const parentMethodsAndProds = {
      getAllOrganizationList: this.getAllOrganizationList,
      saveOrUpdateOrganization: this.saveOrUpdateOrganization,
      handleModalVisible: this.handleModalVisible,
      modalVisible,
      modalTitleStatus,
      modalRecord,
      allOrganizationList,
      saveOrUpdateOrganizationLoading
    }

		return (
      <Card bordered={false}>
        <div className="tableList">
          <div className="tableListForm">
            <Form onSubmit={this.handleSearch} layout="inline">
              <Form.Item label="机构名称">
                {getFieldDecorator('orgName')(<Input placeholder="请输入" autoComplete="off"/>)}
              </Form.Item>
              <Form.Item label="机构编码">
                {getFieldDecorator('orgCode')(<Input placeholder="请输入" autoComplete="off"/>)}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">查询</Button>
                <Button style={{ marginLeft: 8 }} onClick={() => this.props.form.resetFields()}>重置</Button>
              </Form.Item>
            </Form>
          </div>
          <div className="tableListOperator">
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true, 1)}>
              新建
            </Button>
          </div>
          <div className="table">
            <Table
              scroll={{ y: document.body.offsetHeight - 412 }}
              bordered
              loading={getOrganizationListLoading || deleteOrganizationLoading}
              dataSource={organizationList}
              pagination={false}
              rowKey={record => record.id}>
              <Table.Column title="机构名称" dataIndex="orgName" key="orgName" render={text => text || '-'}/>
              <Table.Column title="机构编码" dataIndex="orgCode" key="orgCode" width={105} render={text => text || '-'}/>
              <Table.Column title="上级机构" dataIndex="parentName" key="parentName" render={text => text || '-'}/>
              <Table.Column title="联系人" dataIndex="contacts" key="contacts" render={text => text || '-'}/>
              <Table.Column title="地址" dataIndex="address" key="address" render={text => text || '-'}/>
              <Table.Column title="创建时间" dataIndex="createTime" key="createTime" render={text => text || '-'}/>
              <Table.Column title="创建者" dataIndex="createBy" key="createBy" render={text => text || '-'}/>
              <Table.Column
                title="操作"
                key="action"
                width={80}
                render={record => (
                  <span>
                    <Tooltip placement="top" title="编辑">
                      <Icon type="edit" theme="twoTone" onClick={() => this.handleModalVisible(true, 2, record)}/>
                    </Tooltip>
                    <Divider type="vertical"/>
                    <Popconfirm
                      title="是否确定删除?"
                      okType="danger"
                      onConfirm={() => {
                        this.deleteOrganization(record.id)
                      }}>
                      <Tooltip placement="top" title="删除">
                        <Icon type="delete" theme="twoTone" twoToneColor="#eb2f96"/>
                      </Tooltip>
                    </Popconfirm>
                  </span>
                )}
              />
            </Table>
          </div>

          <CreateForm {...parentMethodsAndProds} />
        </div>
      </Card>
		)
	}
}

export default connect(({setting, loading}) => ({
  organizationList: setting.organizationList,
  allOrganizationList: setting.allOrganizationList,
  getOrganizationListLoading: loading.effects['setting/getOrganizationList'],
  saveOrUpdateOrganizationLoading: loading.effects['setting/saveOrUpdateOrganization'],
  deleteOrganizationLoading: loading.effects['setting/deleteOrganization']
}))(Form.create()(Mechanism))
