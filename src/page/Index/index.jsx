import React, { Component } from 'react'
// 引入antd-mobile
import { Carousel, Flex, Grid, WingBlank, SearchBar } from 'antd-mobile';

// 引入api
import { getSwiper, getGrid, getNews } from '../../api/Home'

// 引入获取当前城市方法
import { getLocalCity } from '../../utils/method'

// 引入基地址
import { BASE_URL } from '../../utils/request'

// 引入css文件
import './index.scss'

// 引入nav基本数据
import Nav from '../../utils/Nav'


class Index extends Component {
  state = {
    swiper: [],
    imgHeight: 212,
    isAuto: false,
    grids: [],
    news: [],
    keyword: '',
    cityList: {
      "label": '',
      "value": ''
    }
  }


  componentDidMount() {
    // 获取所有数据
    this.getAllData()
    this.getLocalCity()
  }
  // 获取当前位置
  getLocalCity = async () => {
    const res = await getLocalCity()
    this.setState({
      cityList: res
    })
  }
  // 获取所有数据
  getAllData = () => {
    Promise.all([getSwiper(), getGrid(), getNews()]).then(res => {
      this.setState({
        swiper: res[0].data,
        grids: res[1].data,
        news: res[2].data
      }, () => {
        this.setState({
          isAuto: true
        })
      })
    })
  }
  // 渲染轮播图
  RenderSwiper = () => {
    return (
      <div>
        <Carousel
          autoplay={this.state.isAuto}
          infinite
        >
          {this.state.swiper.map(val =>
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
      </div>
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
  // 渲染最新资讯
  renderNews = () => {
    return this.state.news.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`${BASE_URL}${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }
  // 渲染顶部导航
  renderTopNav = () => {
    return (
      <Flex justify="around" className="topNav">
        <div className="searchBox">
          <div className="city" onClick={() => { this.props.history.push('/citylist') }}>
            {this.state.cityList.label}<i className="iconfont icon-arrow" />
          </div>
          <SearchBar
            value={this.state.keyword}
            onChange={(v) => this.setState({ keyword: v })}
            placeholder="请输入小区或地址"
          />
        </div>
        <div className="map" onClick={() => { this.props.history.push('/map') }}>
          <i key="0" className="iconfont icon-map" />
        </div>
      </Flex>
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
        {/* 最新资讯 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
        {/* 渲染顶部导航 */}
        {this.renderTopNav()}

      </div>

    )
  }
}
export default Index