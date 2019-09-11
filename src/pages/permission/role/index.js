import React from 'react'
import { Button, Divider, Icon, Table, Tooltip } from 'antd'
import AddRoleModal from './addRoleModal'

const data = [
  {
    key: '1',
    name: 'admin',
    description: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'guest',
    description: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'dev',
    description: 'Sidney No. 1 Lake Park'
  }
]

class Role extends React.Component {
  state = {
    showAddRoleModal: false
  }
  render() {
    const {showAddRoleModal} = this.state
    return (
      <React.Fragment>
        <div style={{marginBottom: 20}}>
          <Button type="primary" onClick={() => {
            this.setState({
              showAddRoleModal: true
            })
          }}>
            新增角色
          </Button>
        </div>
        <Table dataSource={data} pagination={false} bordered bodyStyle={{background: '#fff'}}>
          <Table.Column title="Role Key" dataIndex="key" key="key"/>
          <Table.Column title="Role Name" dataIndex="name" key="name"/>
          <Table.Column title="Description" dataIndex="description" key="description"/>
          <Table.Column
            title="Action"
            key="action"
            width={80}
            render={(text, record) => (
              <span>
                <Tooltip placement="top" title="编辑权限">
                  <Icon type="edit" theme="twoTone" style={{cursor: 'pointer'}}/>
                </Tooltip>
                <Divider type="vertical"/>
                <Tooltip placement="top" title="删除">
                  <Icon type="delete" theme="twoTone" twoToneColor="#ff4d4f" style={{cursor: 'pointer'}}/>
                </Tooltip>
              </span>
            )}
          />
        </Table>
        <AddRoleModal close={() => {
          this.setState({
            showAddRoleModal: false
          })
        }} visible={showAddRoleModal}/>
      </React.Fragment>
    )
  }
}

export default Role
