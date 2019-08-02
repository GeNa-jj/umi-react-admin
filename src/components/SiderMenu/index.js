import React from 'react'
import SiderMenu from './SiderMenu'
import {Drawer} from 'antd'

const SiderMenuWrapper = props =>
  props.isMobile ? (
    <Drawer
      visible={!props.collapsed}
      placement="left"
      closable={false}
      onClose={() => {
        props.onCollapse(true)
      }}
      bodyStyle={{padding: 0, fontSize: 15}}
    >
      <SiderMenu {...props} collapsed={false} />
    </Drawer>
  ) : (
    <SiderMenu {...props} />
  )

export default SiderMenuWrapper
