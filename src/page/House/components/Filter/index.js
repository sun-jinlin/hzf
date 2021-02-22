import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'
// 引入api

import { getSelected } from '../../../../api/House'
// 获取定位信息
import { getLocalCity } from '../../../../utils/method'

// 标题类型选中默认全部取消选中
const titleData = {
  area: false,
  mode: false,
  price: false,
  more: false
}
// 回显基础数据
const defaultData = {
  area: ["area", "null"],
  mode: ["null"],
  price: ["null"],
  more: []
}
export default class Filter extends Component {
  state = {
    titleDataAll: { ...titleData },
    openTitle: '',
  }
  componentDidMount() {
    // 获取选择栏数据
    this.getSelectedData()
    this.defaultData = { ...defaultData }
  }
  // 获取选择栏数据
  getSelectedData = async () => {
    const id = await getLocalCity()
    const { status, data } = await getSelected(id.value)
    if (status === 200) {
      this.selectedData = data
    }
  }
  // 点击选中高亮回调函数
  selectedTitle = (type) => {
    this.setState({
      titleDataAll: { ...titleData, [type]: true },
      openTitle: type
    })
  }
  // 对比数据高亮
  diffData = () => {
    const newdata = {}
    for (let k in this.defaultData) {
      this.defaultData[k].forEach((item, i) => {

        newdata[k] = false;
        if (item !== defaultData[k][i]) {
          newdata[k] = true;
        }
      })
    }
    return newdata
  }
  // 调整确认入参条件数据
  handlerOk = () => {
    const { area, mode, price, more } = this.defaultData
    const filter = {}
    let areaKey = area[0], areaval
    if (area.length == 3 && area[2] !== 'null') {
      areaval = area[2]
    } else {
      areaval = area[1]
    }
    filter[areaKey] = areaval
    filter.rentType = mode[0]
    filter.price = price[0]
    filter.more = more.join(',')
    return filter
  }
  // 点击picker确定
  onOk = (value) => {
    const { openTitle } = this.state
    this.defaultData[openTitle] = value
    this.setState({
      openTitle: '',
      titleDataAll: this.diffData()
    }, () => {
      this.props.cb(this.handlerOk())
    })
  }
  // 点击picker取消
  onCancel = () => {
    this.setState({
      openTitle: '',
      titleDataAll: this.diffData()
    })
  }
  // 渲染蒙层和picker选择
  renderPicker() {
    const { openTitle } = this.state
    if (openTitle === 'area' || openTitle === 'mode' || openTitle === 'price') {
      const { area, price, rentType, subway } = this.selectedData

      let selectedData = [], cols = 1
      switch (openTitle) {
        case 'area':
          selectedData = [area, subway]
          cols = 3
          break
        case 'mode':
          selectedData = rentType
          break
        default:
          selectedData = price
      }
      // 回显数据
      const data = this.defaultData[openTitle]
      return <FilterPicker key={openTitle} data={data} cols={cols} selectedData={selectedData} onOk={this.onOk} onCancel={this.onCancel} />
    } else {
      return null
    }
  }
  // 渲染更多
  renderMore() {
    const { openTitle } = this.state
    if (openTitle === 'more') {
      const value = this.defaultData[openTitle]
      const { roomType, oriented, floor, characteristic } = this.selectedData
      const data = { roomType, oriented, floor, characteristic }

      return (<FilterMore data={data} value={value} onOk={this.onOk} onCancel={this.onCancel} />)
    }

  }
  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {this.renderPicker() ? <div onClick={() => { this.setState({ openTitle: '' }) }} className={styles.mask} /> : null}


        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle titleDataAll={this.state.titleDataAll} selectedTitle={this.selectedTitle} />

          {/* 前三个菜单对应的内容： */}
          {this.renderPicker()}

          {/* 最后一个菜单对应的内容： */}
          {this.renderMore()}
        </div>
      </div>
    )
  }
}
