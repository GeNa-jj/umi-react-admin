import React from 'react'
import {connect} from 'dva'
import { Button, Card, Form, Input, Table, Modal, Col, Row, TreeSelect, message, Tooltip, Icon, Divider, Popconfirm, Tag, Select, Spin } from 'antd'
import Pagination from '@/components/Pagination'

const CreateForm = Form.create()(props => {
  const { modalVisible, modalTitleStatus, modalRecord, allOrganizationList, form, saveOrUpdateUser, handleModalVisible, getAllOrganizationList, getAllRoleList, allRoleList, getAllRoleListLoading, saveOrUpdateUserLoading, setTreeNode } = props

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return

      const values = {
        ...fieldsValue,
        userRole: fieldsValue.userRole && fieldsValue.userRole.join(','),
        id: modalRecord.id
      }

      saveOrUpdateUser(values)
    })
  }

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
      title={modalTitleStatus === 1 ? '新增用户' : '编辑用户'}
      visible={modalVisible}
      maskClosable={false}
      okButtonProps={{loading: saveOrUpdateUserLoading}}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <Form {...formItemLayout}>
        <Row>
          <Col xs={24} sm={12}>
            <Form.Item label="账号">
              {form.getFieldDecorator('userName', {
                initialValue: modalRecord.userName,
                rules: [{ required: true, message: '请输入账号' }]
              })(<Input placeholder="请输入" maxLength={20} disabled={!!modalRecord.userName} autoComplete="off"/>)}
            </Form.Item>
          </Col>
          {
            modalTitleStatus === 1 && <Col xs={24} sm={12}>
              <Form.Item label="密码">
                {form.getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入6~16位字母或数字', pattern: /^[a-zA-Z\d]{6,16}$/ }]
                })(<Input placeholder="请输入" maxLength={16} autoComplete="off"/>)}
              </Form.Item>
            </Col>
          }
          <Col xs={24} sm={12}>
            <Form.Item label="用户昵称">
              {form.getFieldDecorator('nickName', {
                initialValue: modalRecord.nickName,
                rules: [{ required: true, message: '请输入用户昵称' }]
              })(<Input placeholder="请输入" maxLength={20} autoComplete="off"/>)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="所属机构">
              {form.getFieldDecorator('orgId', {
                initialValue: modalRecord.orgId,
                rules: [{ required: true, message: '请选择所属机构' }]
              })(<TreeSelect
                placeholder="请选择"
                allowClear
                treeDefaultExpandAll
                dropdownStyle={{ maxHeight: 250, maxWidth: 217, overflow: 'auto' }}
                onFocus={getAllOrganizationList}>
                {setTreeNode(allOrganizationList)}
              </TreeSelect>)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="状态">
              {form.getFieldDecorator('status', {
                initialValue: modalRecord.status,
                rules: [{ required: true, message: '请选择状态' }]
              })(<Select
                placeholder="请选择"
                allowClear
              >
                <Select.Option value="0" key="0">未激活</Select.Option>
                <Select.Option value="1" key="1">已激活</Select.Option>
              </Select>)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="用户角色">
              {form.getFieldDecorator('userRole', {
                initialValue: modalRecord.userRole ? modalRecord.userRole.split(',') : undefined
              })(<Select
                mode="multiple"
                placeholder="请选择"
                notFoundContent={getAllRoleListLoading ? <Spin size="small" /> : null}
                onFocus={getAllRoleList}>
                {
                  allRoleList.map((item, index) => (
                    <Select.Option value={item.id} key={index}>{item.roleName}</Select.Option>
                  ))
                }
              </Select>)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24}>
            <Form.Item label="备注" labelCol={{
              xs: { span: 24 },
              sm: { span: 3 }
            }} wrapperCol={{
              xs: { span: 24 },
              sm: { span: 20 }
            }}>
              {form.getFieldDecorator('description', {
                initialValue: modalRecord.description
              })(<Input.TextArea placeholder="请输入" maxLength={50} autoSize={{ minRows: 2, maxRows: 4 }} autoComplete="off"/>)}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})

class User extends React.Component {

  state = {
    total: 0,
    pageNum: 1,
    pageSize: 10,
    modalVisible: false,
    modalTitleStatus: '',
    modalRecord: {}
  }

  pageChange = (pageNum, pageSize) => {
    this.setState({
      pageNum,
      pageSize
    }, () => {
      this.handleSearch()
    })
  }

  // 查询
  handleSearch = e => {
    e && e.preventDefault()
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return

      const values = {
        ...fieldsValue,
        userRole: fieldsValue.userRole && fieldsValue.userRole.join(',')
      }

      if (e) {
        this.setState({
          pageNum: 1
        }, () => {
          this.getUserList(values)
        })
      } else {
        this.getUserList(values)
      }
    })
  }

  // 获取用户列表
  getUserList = (searchs = {}) => {
    const {pageNum, pageSize} = this.state
    const {dispatch} = this.props

    dispatch({
      type: 'setting/getUserList',
      payload: {
        ...searchs,
        pageNum,
        pageSize
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
    if (!!flag) {
      this.getAllOrganizationList()
      this.getAllRoleList()
    }
  }

  // 新增或更新用户信息
  saveOrUpdateUser = (fields = {}) => {
    const {dispatch} = this.props

    dispatch({
      type: 'setting/saveOrUpdateUser',
      payload: {
        ...fields
      },
      callback: () => {
        message.success(fields.id ? '修改成功！' : '新建成功！')
        this.setData()
      }
    })
  }

  // 删除用户
  deleteUser = id => {
    const {dispatch} = this.props
    dispatch({
      type: 'setting/deleteUser',
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
    this.handleModalVisible()
    this.handleSearch()
  }

  // 查询所有机构
  getAllOrganizationList = () => {
    const {dispatch, allOrganizationList} = this.props
    allOrganizationList.length === 0 && dispatch({type: 'setting/getAllOrganizationList'})
  }

  // 查询所有角色
  getAllRoleList = () => {
    const {dispatch, allRoleList} = this.props
    allRoleList.length === 0 && dispatch({type: 'setting/getAllRoleList'})
  }

  setTreeNode = (item = []) => (
    item.map(ite => (
      <TreeSelect.TreeNode value={ite.id} title={ite.orgName} key={ite.id}>
        {ite.children && this.setTreeNode(ite.children)}
      </TreeSelect.TreeNode>
    ))
  )

  componentDidMount() {
    this.handleSearch()
    this.getAllOrganizationList()
    this.getAllRoleList()
  }

  render() {
    const {total, pageNum, pageSize, modalVisible, modalTitleStatus, modalRecord} = this.state
    const { form: {getFieldDecorator}, userList, allOrganizationList, allRoleList, getUserListLoading, getAllRoleListLoading, saveOrUpdateUserLoading, deleteUserLoading } = this.props

    const parentMethodsAndProds = {
      getAllOrganizationList: this.getAllOrganizationList,
      getAllRoleList: this.getAllRoleList,
      saveOrUpdateUser: this.saveOrUpdateUser,
      handleModalVisible: this.handleModalVisible,
      setTreeNode: this.setTreeNode,
      modalVisible,
      modalTitleStatus,
      modalRecord,
      allOrganizationList,
      allRoleList,
      getAllRoleListLoading,
      saveOrUpdateUserLoading
    }

    return (
      <Card bordered={false}>
        <div className="tableList">
          <div className="tableListForm">
            <Form onSubmit={this.handleSearch} layout="inline">
              <Form.Item label="用户昵称">
                {getFieldDecorator('nickName')(<Input placeholder="请输入" autoComplete="off"/>)}
              </Form.Item>
              <Form.Item label="所属机构">
                {getFieldDecorator('orgId')(<TreeSelect
                  placeholder="请选择"
                  allowClear
                  treeDefaultExpandAll
                  dropdownStyle={{ maxHeight: 250, maxWidth: 174, overflow: 'auto' }}
                  onFocus={this.getAllOrganizationList}>
                  {this.setTreeNode(allOrganizationList)}
                </TreeSelect>)}
              </Form.Item>
              <Form.Item label="用户角色">
                {getFieldDecorator('userRole')(<Select
                  mode="multiple"
                  placeholder="请选择"
                  notFoundContent={getAllRoleListLoading ? <Spin size="small" /> : null}
                  onFocus={this.getAllRoleList}>
                  {
                    allRoleList.map((item, index) => (
                      <Select.Option value={item.id} key={index}>{item.roleName}</Select.Option>
                    ))
                  }
                </Select>)}
              </Form.Item>
              <Form.Item label="状态">
                {getFieldDecorator('status')(<Select
                  placeholder="请选择"
                  allowClear
                >
                  <Select.Option value="0" key="0">未激活</Select.Option>
                  <Select.Option value="1" key="1">已激活</Select.Option>
                </Select>)}
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
              scroll={{ y: document.body.offsetHeight - 484 }}
              bordered
              loading={getUserListLoading || deleteUserLoading}
              dataSource={userList}
              pagination={false}
              rowKey={record => record.id}>
              <Table.Column title="账号" dataIndex="userName" key="userName" render={text => text || '-'}/>
              <Table.Column title="用户昵称" dataIndex="nickName" key="nickName" render={text => text || '-'}/>
              <Table.Column title="所属机构" dataIndex="orgName" key="orgName" render={text => text || '-'}/>
              <Table.Column title="用户角色" dataIndex="roleName" key="roleName" render={text => (
                text ? text.split(',').map((item, index) => (
                  <Tag color="blue" key={index}>{item}</Tag>
                )) : '-'
              )}/>
              <Table.Column title="状态" dataIndex="status" key="status" width={85} render={text => text === '1' ? <Tag color="green">已激活</Tag> : <Tag color="volcano">未激活</Tag>}/>
              <Table.Column title="备注" dataIndex="description" key="description" render={text => text || '-'}/>
              <Table.Column title="最后一次登录ip" dataIndex="latelyIp" key="latelyIp" render={text => text || '-'}/>
              <Table.Column title="最后一次登录时间" dataIndex="latelyTime" key="latelyTime" render={text => text || '-'}/>
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
                        this.deleteUser(record.id)
                      }}>
                      <Tooltip placement="top" title="删除">
                        <Icon type="delete" theme="twoTone" twoToneColor="#eb2f96"/>
                      </Tooltip>
                    </Popconfirm>
                  </span>
                )}
              />
            </Table>
            <Pagination total={total} current={pageNum} pageSize={pageSize} pageChange={this.pageChange}/>
          </div>

          <CreateForm {...parentMethodsAndProds} />
        </div>
      </Card>
    )
  }
}

export default connect(({setting, loading}) => ({
  userList: setting.userList,
  allOrganizationList: setting.allOrganizationList,
  allRoleList: setting.allRoleList,
  getUserListLoading: loading.effects['setting/getUserList'],
  getAllRoleListLoading: loading.effects['setting/getAllRoleList'],
  saveOrUpdateUserLoading: loading.effects['setting/saveOrUpdateUser'],
  deleteUserLoading: loading.effects['setting/deleteUser']
}))(Form.create()(User))
