import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

class BreadcrumbCustom extends React.Component {
    render() {
        const first = <Breadcrumb.Item>{this.props.first}</Breadcrumb.Item> || ''
        const second = <Breadcrumb.Item>{this.props.second}</Breadcrumb.Item> || ''
        return (
            <Breadcrumb style={{ margin: '0 0 12px' }}>
              <Breadcrumb.Item><Link to={'/'}>首页</Link></Breadcrumb.Item>
              {first}
              {second}
            </Breadcrumb>
        )
    }
}

export default BreadcrumbCustom
