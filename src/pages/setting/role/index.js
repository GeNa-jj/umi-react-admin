import React from 'react'
import {connect} from 'dva'
import { Button, Card, Divider, Form, Icon, Input, Popconfirm, Tooltip, Table, Modal, Row, Col, message, Tree, Spin } from 'antd';
import Pagination from '@/components/Pagination'

const CreateForm = Form.create()(props => {
  const { modalVisible, modalTitleStatus, modalRecord, allMenuList, getAllMenuList, getAllMenuListLoading, form, saveOrUpdateRole, handleModalVisible, saveOrUpdateRoleLoading, onCheckMenu } = props

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return

      const values = {
        ...fieldsValue,
        roleMenu: modalRecord.roleMenu,
        id: modalRecord.id
      }

      saveOrUpdateRole(values)
    })
  }

  const setTreeNode = (item = []) => (
    item.map(ite => (
      <Tree.TreeNode value={ite.id} title={ite.name} key={ite.id}>
        {ite.children && setTreeNode(ite.children)}
      </Tree.TreeNode>
    ))
  )

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 }
    }
  }

  return (
    <Modal
      width={900}
      destroyOnClose
      title={modalTitleStatus === 1 ? '新增角色' : '编辑角色'}
      visible={modalVisible}
      maskClosable={false}
      okButtonProps={{loading: saveOrUpdateRoleLoading}}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <Form {...formItemLayout}>
        <Row gutter={20}>
          <Col xs={24} sm={24}>
            <Form.Item label="角色名称">
              {form.getFieldDecorator('roleName', {
                initialValue: modalRecord.roleName,
                rules: [{ required: true, message: '请输入角色名称' }]
              })(<Input placeholder="请输入" maxLength={20} autoComplete="off"/>)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24}>
            <Form.Item label="备注">
              {form.getFieldDecorator('description', {
                initialValue: modalRecord.description
              })(<Input.TextArea placeholder="请输入" maxLength={50} autoSize={{ minRows: 2, maxRows: 4 }} autoComplete="off"/>)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24}>
            <Form.Item label="菜单">
              {form.getFieldDecorator('roleMenu')(getAllMenuListLoading ? <Spin size="small" style={{padding: '0 20px'}} onClick={getAllMenuList}/> : <Tree
                checkable
                defaultExpandAll
                checkedKeys={modalRecord.roleMenu ? modalRecord.roleMenu.split(',') : []}
                onCheck={onCheckMenu}
              >
                {setTreeNode(allMenuList)}
              </Tree>)}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
})

class Role extends React.Component {

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

      if (e) {
        this.setState({
          pageNum: 1
        }, () => {
          this.getRoleList(fieldsValue)
        })
      } else {
        this.getRoleList(fieldsValue)
      }
    })
  }

  // 获取角色列表
  getRoleList = (searchs = {}) => {
    const {pageNum, pageSize} = this.state
    const {dispatch} = this.props

    dispatch({
      type: 'setting/getRoleList',
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
    !!flag && this.getAllMenuList()
  }

  // 新增或更新角色信息
  saveOrUpdateRole = (fields = {}) => {
    const {dispatch} = this.props

    dispatch({
      type: 'setting/saveOrUpdateRole',
      payload: {
        ...fields
      },
      callback: () => {
        message.success(fields.id ? '修改成功！' : '新建成功！')
        this.setData()
      }
    })
  }

  // 删除角色
  deleteRole = id => {
    const {dispatch} = this.props
    dispatch({
      type: 'setting/deleteRole',
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
        allRoleList: []
      }
    })
    this.handleModalVisible()
    this.handleSearch()
  }

  // 查询所有菜单
  getAllMenuList = () => {
    const {dispatch, allMenuList} = this.props
    allMenuList.length === 0 && dispatch({type: 'setting/getAllMenuList'})
  }

  onCheckMenu = checkedKeys => {
    const {modalRecord} = this.state
    this.setState({
      modalRecord: {...modalRecord, roleMenu: checkedKeys.join(',')}
    })
  }

  componentDidMount() {
    this.handleSearch()
  }

  render() {
    const {total, pageNum, pageSize, modalVisible, modalTitleStatus, modalRecord} = this.state
    const { form: {getFieldDecorator}, roleList, allMenuList, getAllMenuListLoading, getRoleListLoading, saveOrUpdateRoleLoading, deleteRoleLoading } = this.props

    const parentMethodsAndProds = {
      getAllMenuList: this.getAllMenuList,
      saveOrUpdateRole: this.saveOrUpdateRole,
      handleModalVisible: this.handleModalVisible,
      onCheckMenu: this.onCheckMenu,
      modalVisible,
      modalTitleStatus,
      modalRecord,
      allMenuList,
      getAllMenuListLoading,
      saveOrUpdateRoleLoading
    }

		return (
      <Card bordered={false}>
        <div className="tableList">
          <div className="tableListForm">
            <Form onSubmit={this.handleSearch} layout="inline">
              <Form.Item label="角色名称">
                {getFieldDecorator('roleName')(<Input placeholder="请输入" autoComplete="off"/>)}
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
              loading={getRoleListLoading || deleteRoleLoading}
              dataSource={roleList}
              pagination={false}
              rowKey={record => record.id}>
              <Table.Column title="角色名称" dataIndex="roleName" key="roleName" render={text => text || '-'}/>
              <Table.Column title="角色描述" dataIndex="description" key="description" render={text => text || '-'}/>
              <Table.Column title="创建时间" dataIndex="createTime" key="createTime" render={text => text || '-'}/>
              <Table.Column title="创建者" dataIndex="createBy" key="createBy" render={text => text || '-'}/>
              <Table.Column
                title="操作"
                key="action"
                width={80}
                render={record => (
                  <span>
                    <Tooltip placement="top" title="编辑">
                      <Icon type="edit" theme="twoTone"  onClick={() => this.handleModalVisible(true, 2, record)}/>
                    </Tooltip>
                    <Divider type="vertical"/>
                    <Popconfirm
                      title="是否确定删除?"
                      okType="danger"
                      onConfirm={() => {
                        this.deleteRole(record.id)
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
  roleList: setting.roleList,
  allMenuList: setting.allMenuList,
  getAllMenuListLoading: loading.effects['setting/getAllMenuList'],
  getRoleListLoading: loading.effects['setting/getRoleList'],
  saveOrUpdateRoleLoading: loading.effects['setting/saveOrUpdateRole'],
  deleteRoleLoading: loading.effects['setting/deleteRole']
}))(Form.create()(Role))
