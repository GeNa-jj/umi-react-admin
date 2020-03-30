import React from 'react'
import styles from './index.less'
import {connect} from 'dva'

class Home extends React.Component {

  render() {
		return (
		  <div className={styles.home}>umi后台管理系统模版</div>
		)
	}
}

export default connect(() => ({
}))(Home)
