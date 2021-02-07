import React, { Component } from 'react'
// 引入antd-mobile
import { Carousel, Flex, Grid } from 'antd-mobile';

// 引入api
import { getSwiper, getGrid } from '../../api/Home'

// 引入基地址
import { BASE_URL } from '../../utils/request'

// 引入css文件
import './index.scss'

// 引入nav基本数据
import Nav from '../../utils/Nav'

class Index extends Component {
  state = {
    data: [],
    imgHeight: 212,
    isAuto: false,
    grids: []
  }


  componentDidMount() {
    // 获取轮播图数据
    this.getSwipers()
    // 获取九宫格数据
    this.getGrids()
  }
  // 获取轮播图数据
  getSwipers = async () => {
    const { status, data } = await getSwiper()

    if (status === 200) {
      this.setState({
        data
      }, () => {
        this.setState({
          isAuto: true
        })
      })
    }
  }
  // 渲染轮播图
  RenderSwiper = () => {
    return (
      <Carousel
        autoplay={this.state.isAuto}
        infinite
      >
        {this.state.data.map(val =>
          <a
            key={val.id}
            href="http://www.jd.com"
            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
          >
            <img
              src={`${BASE_URL}${val.imgSrc}`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
          </a>
        )}
      </Carousel>
    )
  }
  // 渲染nav导航
  RenderNav = () => {
    return (
      <Flex className="nav">
        {Nav.map(item =>
          <Flex.Item onClick={() => this.props.history.push(item.path)} key={item.id}>
            <img alt="" src={item.url} />
            <p>{item.title}</p>
          </Flex.Item>
        )
        }
      </Flex>
    )
  }
  // 获取九宫格数据
  getGrids = async () => {
    const { status, data } = await getGrid()
    if (status === 200) {
      this.setState(
        {
          grids: data
        }
      )
    }
  }
  // 渲染租房小屋
  RenderGrid = () => {
    return (
      <div className="group">
        {/* 标题 */}
        <Flex className="group-title" justify="between">
          <h3>租房小组</h3>
          <span>更多</span>
        </Flex>
        {/* 九宫格 */}
        <Grid data={this.state.grids}
          columnNum={2}
          hasLine={false}
          square={false}
          renderItem={item => {
            return (
              // item结构
              <Flex className="grid-item" justify="between">
                <div className="desc">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <img src={`${BASE_URL}${item.imgSrc}`} alt="" />
              </Flex>
            )
          }}
        />
      </div>
    )
  }
  render() {
    return (
      <div>
        {/* 轮播图 */}
        {this.RenderSwiper()}
        {/* nav导航 */}
        {this.RenderNav()}
        {/* 租房小屋 */}
        {this.RenderGrid()}
      </div>

    )
  }
}
export default Index