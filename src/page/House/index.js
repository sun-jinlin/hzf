import React from 'react'

import { Flex, Toast } from 'antd-mobile'

import Filter from './components/Filter'
// 导入样式
import styles from './index.module.css'
// 当前城市id
import { getLocalCity } from '../../utils/method'
// 获取列表数据 
import { getFilterData } from '../../api/House/index'
// 引入virtualized
import { AutoSizer, List, InfiniteLoader } from 'react-virtualized';
// 引入列表组件
import HouseItem from '../../components/HouseItem'
// 引入基地址
import { BASE_URL } from '../../utils/request'
// 引入无数据时的组件状态
import NoHouse from '../../components/NoHouse'

export default class HouseList extends React.Component {
  state = {
    count: 0,
    list: []
  }
  // 条件选中数据
  cb = (filter) => {
    this.filter = filter
    this.getFilterData()
  }
  // 获取列表数据
  getFilterData = async () => {
    const { data: { count, list } } = await getFilterData(this.cityId, this.filter)
    if (count !== 0) {
      Toast.success(`获取到${count}条房源数据`, .5)
    }
    this.setState({
      count,
      list
    })
  }
  async componentDidMount() {
    const { value } = await getLocalCity()
    this.cityId = value
    this.getFilterData()
  }
  // 判断是否加载完毕
  isRowLoaded = ({ index }) => {
    return !!this.state.list[index];
  }
  // 获取下一页数据
  loadMoreRows = ({ startIndex, stopIndex }) => {
    return getFilterData(this.cityId, this.filter, startIndex, stopIndex).then(res => {
      if (res.status === 200) {
        this.setState({
          list: [...this.state.list, ...res.data.list]
        })
      }
    })
  }
  // 模版数据
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {
    const { list } = this.state
    const item = list[index]
    if (!item) {
      return (
        <div style={style} key={key}>
          <p className={styles.loading}></p>
        </div>
      )
    }
    item.src = `${BASE_URL}${item.houseImg}`
    return (
      <HouseItem onClick={() => { this.props.history.push({ pathname: `/detail/${item.houseCode}` }) }} {...item} key={key} style={style} />
    )
  }
  renderList = () => {
    return (
      this.state.count ? <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={this.state.count}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer>
            {({ width, height }) => (
              < List
                onRowsRendered={onRowsRendered}
                ref={registerChild}
                className={styles.houseList}
                width={width}
                height={height}
                rowCount={this.state.count}
                rowHeight={130}
                rowRenderer={this.rowRenderer}

              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader> : <NoHouse>所选地区暂无房源信息</NoHouse>
    )
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 条件筛选栏 */}
        <Filter cb={this.cb} />
        {/* 渲染列表数据 */}
        {this.renderList()}
      </div>
    )
  }
}
