import React from 'react'
import {Button} from 'antd'
import img from '../../assets/images/404.png'
import styles from './index.less'
import router from 'umi/router'

class NotFound extends React.Component {
	state = {
		animated: ''
	}

	goBack = () => {
    router.push('/')
  }

	enter = () => {
		this.setState({animated: 'hinge'})
	}

	render() {
		return (
				<div className={styles.notFound}>
					<img src={img} className={`animated swing ${this.state.animated}`} onMouseEnter={this.enter} alt=""/>
					<p style={{marginTop: 60}}>抱歉，你访问的页面不存在。</p>
					<Button type="dashed" shape="round" style={{marginTop: 20}} onClick={this.goBack}>
						Back to home
					</Button>
				</div>
		)
	}
}

export default NotFound
