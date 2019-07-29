import React from 'react'
import { Pagination } from 'antd'
import styles from './index.less'

class PaginationCustom extends React.Component {
	render() {
		const {
			total = 0,
			defaultCurrent = 1,
			defaultPageSize = 10,
			pageSizeOptions = ['10', '20', '30', '40'],
			showSizeChanger = true,
			showQuickJumper = true,
			showTotal = total => `共 ${total} 条`
		} = this.props
		return (
				<div className={styles.pagination}>
					{ total > 0 ? (
							<Pagination total={total} defaultCurrent={defaultCurrent} defaultPageSize={defaultPageSize} showTotal={showTotal} pageSizeOptions={pageSizeOptions} showSizeChanger={showSizeChanger} showQuickJumper={showQuickJumper} onChange={this.props.pageChange} onShowSizeChange={this.props.pageChange} />
					) : ''}
				</div>
		)
	}
}

export default PaginationCustom
