import React from 'react'
import styles from './index.less'
import {Button} from 'antd'
import router from 'umi/router'

class Nofound extends React.Component {
  render() {
    return (
      <div className={`${styles.nofound} bgImg`}>
        <div className={styles.img}>
          <img src={require('@/assets/images/404.png')} alt="" />
          <img src={require('@/assets/images/404_child.png')} className={styles.left} alt="" />
          <img src={require('@/assets/images/404_child.png')} className={styles.mid} alt="" />
          <img src={require('@/assets/images/404_child.png')} className={styles.right} alt="" />
        </div>
        <div className={styles.text}>
          <p>抱歉，你访问的页面不存在。</p>
          <div className={styles.btn}>
            <Button type="primary" onClick={() => router.push('/')}>返回首页</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Nofound
