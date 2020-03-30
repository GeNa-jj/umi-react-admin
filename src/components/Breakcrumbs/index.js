import React from 'react'
import { Breadcrumb, Icon } from 'antd'
import {urlToList} from '@/utils'
import styles from './index.less'

class BreadcrumbCustom extends React.Component {

  state = {
    breadcrumbItem: []
  }

  setBreadcrumb = nextProps => {
    const {location: {pathname}, menuData} = nextProps || this.props
    const pathnameList = urlToList(pathname)
    const breadcrumbItem = pathnameList.map(path => this.renderBreadcrumb(menuData, path)).filter(d => d)

    this.setState({breadcrumbItem})
  }

  renderBreadcrumb = (routes, path) => {
    let route = null
    routes.forEach(item => {
      if (item.path === path) {
        route = item
      }
      if (!route && item.children) {
        route = this.renderBreadcrumb(item.children, path)
      }
    })

    return route
  }

  componentDidMount() {
    this.setBreadcrumb()
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setBreadcrumb(nextProps)
  }

  render() {
    const {breadcrumbItem} = this.state

    return (
      breadcrumbItem.length > 0 ? (
        <div className={styles.breadcrumb}>
          <Breadcrumb>
            {
              breadcrumbItem.map(item => (
                <Breadcrumb.Item key={item.id}>
                  {item.icon && <Icon type={item.icon} />}
                  <span>{item.name}</span>
                </Breadcrumb.Item>
              ))
            }
          </Breadcrumb>
          <div className={styles.title}>
            <span>{breadcrumbItem.pop().name}</span>
          </div>
        </div>
      ) : null
    )
  }
}

export default BreadcrumbCustom
