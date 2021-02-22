import React, { Component } from 'react';
// 引入api
import { getCityList, getCityHot } from '../../api/City';
// 引入获取当前城市方法
import { getLocalCity } from '../../utils/method'

// 引入virtualized
import { AutoSizer, List } from 'react-virtualized';

// 引入antd-mobile
import { NavBar, Icon, Toast } from 'antd-mobile';
// 引入css
import './index.scss'

// 引入sessionStorage
import { setStorage } from '../../utils/method'





class CityList extends Component {
  state = {
    cityIndex: [],
    cityList: {},
    activeCity: 0
  }
  componentDidMount() {
    this.getCityList()
  }
  // 获取城市列表数据
  getCityList = async () => {
    const { status, data } = await getCityList()
    if (status === 200) {
      const { cityList, cityIndex } = this.formatCityData(data)
      const { status: Status, data: hot } = await getCityHot()
      if (Status === 200) {
        cityIndex.unshift("hot")
        cityList['hot'] = hot
        const res = await getLocalCity()
        cityIndex.unshift("#")
        cityList['#'] = [res]
        this.setState({ cityList, cityIndex })
      }

    }
  }
  // 格式化城市列表数据
  formatCityData = (data) => {
    let cityList = {}, cityIndex
    data.forEach(item => {
      let firstCity = item.short.slice(0, 1)
      if (!(firstCity in cityList)) {
        cityList[firstCity] = [item]
      } else {
        cityList[firstCity].push(item)
      }
    })
    cityIndex = Object.keys(cityList).sort()
    return { cityList, cityIndex }
  }
  // 格式化键
  formatKey = (data, isTrue) => {
    switch (data) {
      case '#':
        return isTrue ? '当' : '当前城市'
      case 'hot':
        return isTrue ? '热' : '热门城市'
      default:
        return data.toUpperCase()
    }
  }
  // 点击城市
  handelClick = (data) => {
    const hasData = ['北京', '上海', '广州', '深圳'];
    if (hasData.includes(data.label)) {
      setStorage('CURR_CityList', data)
      this.props.history.goBack()
    } else {
      Toast.info('所选城市没有房源，请换一换')
    }
  }
  // 城市列表
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {
    const { cityList, cityIndex } = this.state
    const k = cityIndex[index]
    return (
      <div key={key} style={style} className="city-item">
        <div className="title">{this.formatKey(k)}</div>
        {cityList[k].map((item, i) => (
          <div onClick={() => { this.handelClick(item) }} key={i} className="name">{item.label}</div>
        ))}

      </div>
    )
  }
  // 根据行自动获取行高
  rowHeight = ({ index }) => {
    const { cityList, cityIndex } = this.state
    const k = cityIndex[index]
    return 36 + 50 * cityList[k].length
  }
  // 城市索引
  renderCityIndex = () => {
    const { cityIndex } = this.state;
    return cityIndex.map((item, index) => {
      return (
        <li
          key={item}
          className="city-index-item"
        >
          <span onClick={() => {
            this.ListKey.scrollToRow(index)
          }} className={this.state.activeCity === index ? 'index-active' : ''}>
            {this.formatKey(item, true)}
          </span>
        </li>
      )
    })
  }
  // 滚动屏幕索引联动
  onRowsRendered = ({ overscanStartIndex, overscanStopIndex, startIndex, stopIndex }) => {
    if (this.state.activeCity !== startIndex) {
      this.setState({ activeCity: startIndex })
    }
  }
  render() {
    return (
      <div className="cityBox">
        {/* 导航栏 */}
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >城市列表</NavBar>
        {/* 城市列表 */}
        <div className="citylist">
          <AutoSizer>
            {({ width, height }) => (
              < List
                ref={(ele) => { this.ListKey = ele }}
                width={width}
                height={height}
                rowCount={this.state.cityIndex.length}
                rowHeight={this.rowHeight}
                rowRenderer={this.rowRenderer}
                scrollToAlignment="start"
                onRowsRendered={this.onRowsRendered}
              />
            )}
          </AutoSizer>
          {/* 右侧索引列表 */}
          <ul className="city-index">
            {this.renderCityIndex()}
          </ul>
        </div>

      </div >
    )
  }
}
export default CityList