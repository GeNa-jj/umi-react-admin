import React from 'react'
import { Card, Divider, Icon, Table, Tabs, Tag, Tooltip } from 'antd';
import styles from './index.less'
import ReactEcharts from 'echarts-for-react'
import {connect} from 'dva'
import {routeCoordinate} from '@/services'
import pioImg from '@/assets/images/poi.png'

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

class Setting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultActiveKey: '0'
    }
    this.map = null
  }


  getOption1 = () => {
    return {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisPointer: {
          type: 'none'
        }
      },
      yAxis: {
        type: 'value',
        minInterval: 1
      },
      grid: {
        left: 40,
        right: 0,
        top: 20,
        bottom: 50
      },
      series: [
        {
          name: '数量',
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#5AADF1'
            }
          },
          data: [1000, 2000, 150, 3000, 200, 1200, 800, 1000, 2000, 1500, 3000, 2000]
        }
      ]
    }
  }

  // 创建地图
  creatMap = () => {
    // eslint-disable-next-line
    this.map = new AMap.Map('map', {
      zoom: 12,
      resizeEnable: true,
      center: [113.4562078312, 23.1884279470],
      viewMode: '3D',
      mapStyle: 'amap://styles/light'
    })
  }

  renderTab = tab => {
    switch (tab) {
      case 0:
        return (
          <ReactEcharts
            option={this.getOption1()}
            notMerge={true}
            lazyUpdate={true}
            style={{width: '100%', height: '100%', padding: 20}}
          />
        )
      case 1:
        return (
          <div id="map" style={{height: '100%'}}/>
        )
      default:
        return `Content of tab ${tab}`
    }
  }

  getRouteCoordinate = () => {
    routeCoordinate({}).then(data => {
      if (data && data.header === '000') {
        this.renderRouteCoordinate(data.data)
      }
    })
  }

  // 画路线
  renderRouteCoordinate = routeCoordinate => {
    /* eslint-disable */
    let polyline = new AMap.Polyline({
      path: routeCoordinate.map(item => {
        return [item.longitude, item.latitude]
      }),
      strokeColor: '#1DA57A',
      strokeWeight: 2,
      strokeStyle: 'solid'
    })
    polyline.setMap(this.map)
    this.drawPoint(routeCoordinate)
  }

  // 画站点
  drawPoint = routeCoordinate => {
    if (routeCoordinate.length > 0) {
      let poi = []
      routeCoordinate.forEach(item => {
        if (item.remark) {
          var marker = new AMap.Marker({
            position: new AMap.LngLat(item.longitude, item.latitude),
            // 将一张图片的地址设置为 icon
            icon: new AMap.Icon({
              size: new AMap.Size(20, 20),
              imageSize: new AMap.Size(20, 20),
              image: pioImg
            }),
            offset: new AMap.Pixel(-10, -10)
          })
          poi.push(marker)
          marker.content = item.remark
          marker.on('click', e => {
            var infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -5) })
            infoWindow.setContent(`<span style="color: #646466">${e.target.content}</span>`)
            infoWindow.open(this.map, e.target.getPosition())
          })
        }
      })

      this.map.add(poi)

      this.map.setFitView(poi)
    }
    /* eslint-enable */
  }

  onChangeTab = activeKey => {
    if (activeKey === '1' && !this.map) {
      setTimeout(() => {
        this.creatMap()
        this.getRouteCoordinate()
      }, 30)
    }
  }

  componentDidMount() {
    if (this.state.defaultActiveKey === '1' && !this.map) {
      this.creatMap()
      this.getRouteCoordinate()
    }
  }

  render() {
    const { clientWidth } = this.props
    const { defaultActiveKey } = this.state
    let mode = 'right'
    if (clientWidth < 768) {
      mode = 'top'
    }
    const className = mode ==='top' ? styles.tabsContainTop : styles.tabsContain
    return (
      <Card bodyStyle={{padding: 0}}>
        <Tabs defaultActiveKey={defaultActiveKey} tabPosition={mode} tabBarStyle={{padding: '16 0'}} className={styles.tabs} onChange={this.onChangeTab}>
          <Tabs.TabPane tab="图表" key="0">
            <div className={className}>
              <ReactEcharts
                option={this.getOption1()}
                notMerge={true}
                lazyUpdate={true}
                style={{width: '100%', height: '100%', padding: 20}}
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="线路简图" key="1">
            <div className={className}>
              <div id="map" style={{height: '100%'}}/>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="运维信息" key="2">
            <div className={className}>
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
            </div>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    )
  }
}

export default connect(({global}) => ({
  clientWidth: global.clientWidth
}))(Setting)
