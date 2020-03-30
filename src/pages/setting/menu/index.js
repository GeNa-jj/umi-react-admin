import React from 'react'
import {connect} from 'dva'
import { Button, Card, Form, Input, Table, Modal, Col, Row, TreeSelect, message, Tooltip, Icon, Divider, Popconfirm, InputNumber } from 'antd'

const CreateForm = Form.create()(props => {
  const { modalVisible, modalTitleStatus, modalRecord, allMenuList, form, saveOrUpdateMenu, handleModalVisible, getAllMenuList, saveOrUpdateMenuLoading } = props

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return

      const values = {
        ...fieldsValue,
        id: modalRecord.id
      }

      saveOrUpdateMenu(values)
    })
  }

  const setTreeNode = (item = [], disabled = false) => (
    item.map(ite => {
      const disSelectable = ite.id === modalRecord.id || disabled
      return (
        <TreeSelect.TreeNode value={ite.id} title={ite.name} key={ite.id} disabled={disSelectable}>
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
      title={modalTitleStatus === 1 ? '新增菜单' : '编辑菜单'}
      visible={modalVisible}
      maskClosable={false}
      okButtonProps={{loading: saveOrUpdateMenuLoading}}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <Form {...formItemLayout}>
        <Row>
          <Col xs={24} sm={12}>
            <Form.Item label="菜单名称">
              {form.getFieldDecorator('name', {
                initialValue: modalRecord.name,
                rules: [{ required: true, message: '请输入菜单名称' }]
              })(<Input placeholder="请输入" maxLength={20} autoComplete="off"/>)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="上级菜单">
              {form.getFieldDecorator('parentId', {
                initialValue: modalRecord.parentId,
                rules: [{ required: true, message: '请选择上级菜单' }]
              })(<TreeSelect
                placeholder="请选择"
                allowClear
                treeDefaultExpandAll
                dropdownStyle={{ maxHeight: 250, maxWidth: 217, overflow: 'auto' }}
                onFocus={getAllMenuList}>
                <TreeSelect.TreeNode value={0} title="无" key={0} />
                {setTreeNode(allMenuList)}
              </TreeSelect>)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="路径">
              {form.getFieldDecorator('path', {
                initialValue: modalRecord.path,
                rules: [{ required: true, message: '请输入路径' }]
              })(<Input placeholder="请输入" disabled={!!modalRecord.path} autoComplete="off"/>)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="图标">
              {form.getFieldDecorator('icon', {
                initialValue: modalRecord.icon
              })(<Input placeholder="请输入" autoComplete="off"/>)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="排序">
              {form.getFieldDecorator('orderNumber', {
                initialValue: modalRecord.orderNumber,
                rules: [{ message: '请输入大于等于0的数字', pattern: /^\+?[0-9]\d*$/ }]
              })(<InputNumber min={0} />)}
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

class Menu extends React.Component {

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

      this.getMenuList(fieldsValue)
    })
  }

  // 获取菜单列表
  getMenuList = (searchs = {}) => {
    const {dispatch} = this.props

    dispatch({
      type: 'setting/getMenuList',
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
    !!flag && this.getAllMenuList()
  }

  // 新增或更新菜单信息
  saveOrUpdateMenu = (fields = {}) => {
    const {dispatch} = this.props

    dispatch({
      type: 'setting/saveOrUpdateMenu',
      payload: {
        ...fields
      },
      callback: () => {
        message.success(fields.id ? '修改成功！' : '新建成功！')
        this.setData()
      }
    })
  }

  // 删除菜单
  deleteMenu = id => {
    const {dispatch} = this.props
    dispatch({
      type: 'setting/deleteMenu',
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
        allMenuList: []
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

  componentDidMount() {
    this.handleSearch()
  }

  render() {
    const {modalVisible, modalTitleStatus, modalRecord} = this.state
    const { form: {getFieldDecorator}, menuList, allMenuList, getMenuListLoading, saveOrUpdateMenuLoading, deleteMenuLoading } = this.props

    const parentMethodsAndProds = {
      getAllMenuList: this.getAllMenuList,
      saveOrUpdateMenu: this.saveOrUpdateMenu,
      handleModalVisible: this.handleModalVisible,
      modalVisible,
      modalTitleStatus,
      modalRecord,
      allMenuList,
      saveOrUpdateMenuLoading
    }

		return (
      <Card bordered={false}>
        <div className="tableList">
          <div className="tableListForm">
            <Form onSubmit={this.handleSearch} layout="inline">
              <Form.Item label="菜单名称">
                {getFieldDecorator('name')(<Input placeholder="请输入" autoComplete="off"/>)}
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
              loading={getMenuListLoading || deleteMenuLoading}
              dataSource={menuList}
              pagination={false}
              rowKey={record => record.id}>
              <Table.Column title="菜单名称" dataIndex="name" key="name" render={text => text || '-'}/>
              <Table.Column title="路径" dataIndex="path" key="path" render={text => text || '-'}/>
              <Table.Column title="图标" dataIndex="icon" key="icon" width={65} render={text => text ? <Icon type={text} /> : '-'}/>
              <Table.Column title="备注" dataIndex="description" key="description" render={text => text || '-'}/>
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
                        this.deleteMenu(record.id)
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
  menuList: setting.menuList,
  allMenuList: setting.allMenuList,
  getMenuListLoading: loading.effects['setting/getMenuList'],
  saveOrUpdateMenuLoading: loading.effects['setting/saveOrUpdateMenu'],
  deleteMenuLoading: loading.effects['setting/deleteMenu']
}))(Form.create()(Menu))
