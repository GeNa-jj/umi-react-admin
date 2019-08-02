import React from 'react'
import BreadcrumbCustom from '../../components/Breadcrumb'
import {Table, Divider, Tag, Card, Row, Col, Input, Button, Form, Icon, Tooltip} from 'antd'
import Pagination from '../../components/Pagination'

const data = [
	{
		key: '1',
		firstName: 'John',
		lastName: 'Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		tags: ['nice', 'developer'],
	},
	{
		key: '2',
		firstName: 'Jim',
		lastName: 'Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		tags: ['loser'],
	},
	{
		key: '3',
		firstName: 'Joe',
		lastName: 'Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	}
]

let arr = [...Array(7).keys()]

arr.forEach(item => {
	data.push({
		key: item + 4,
		firstName: 'Joe',
		lastName: 'Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	})
})

class Text extends React.Component {
	state = {
		total: 13,
		pageNum: 1,
		pageSize: 10
	}
	pageChange = (pageNum, pageSize) => {
		this.setState({
			pageNum,
			pageSize
		}, () => {
			// TODO something
			console.log(this.state)
		})
	}

	getFields = () => {
		const {getFieldDecorator} = this.props.form
		const children = []
		for (let i = 0; i < 4; i++) {
			children.push(
					<Col xl={6} lg={8} md={12} sm={12} xs={24} key={i}>
						<Form.Item label={`Field ${i}`}>
							{getFieldDecorator(`field-${i}`, {
								rules: [
									{
										required: true,
										message: 'Input something!'
									}
								]
							})(<Input placeholder="placeholder"/>)}
						</Form.Item>
					</Col>
			)
		}
		return children
	}

	handleSearch = e => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
		})
	}

	handleReset = () => {
		this.props.form.resetFields()
	}

	render() {
		const formItemLayout = {
			labelCol: {span: 8},
			wrapperCol: {span: 16},
		}
		return (
				<div className="test">
					<BreadcrumbCustom first="权限测试" second="table"/>
					<Card>
						<Form {...formItemLayout} onSubmit={this.handleSearch}>
							<Row gutter={24}>{this.getFields()}</Row>
							<Row>
								<Col span={24}>
									<Form.Item wrapperCol={{span: 24}} style={{textAlign: 'right'}}>
										<Button type="primary" htmlType="submit">
											Search
										</Button>
										<Button style={{marginLeft: 8}} onClick={this.handleReset}>
											Clear
										</Button>
									</Form.Item>
								</Col>
							</Row>
						</Form>

						<Table dataSource={data} pagination={false} bordered>
							<Table.Column title="First Name" dataIndex="firstName" key="firstName"/>
							<Table.Column title="Last Name" dataIndex="lastName" key="lastName"/>
							<Table.Column title="Age" dataIndex="age" key="age"/>
							<Table.Column title="Address" dataIndex="address" key="address"/>
							<Table.Column
									title="Tags"
									dataIndex="tags"
									key="tags"
									render={tags => (
											<span>
												{tags.map(tag => (
														<Tag color="blue" key={tag}>
															{tag}
														</Tag>
												))}
											</span>
									)}
							/>
							<Table.Column
									title="Action"
									key="action"
                  width={80}
									render={(text, record) => (
											<span>
												<Tooltip placement="top" title="编辑">
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
						<Pagination total={this.state.total} pageChange={this.pageChange}/>
					</Card>
				</div>
		)
	}
}

export default Form.create()(Text)
