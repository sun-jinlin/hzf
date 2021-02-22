import React, { Component } from 'react'

import { SearchBar } from 'antd-mobile'


import styles from './index.module.css'
import { getLocalCity } from '../../../utils/method'
// 引入api
import { getCommunity } from '../../../api/Rent'

export default class Search extends Component {

  state = {
    // 搜索框的值
    searchTxt: '',
    tipsList: []
  }

  async componentDidMount() {
    // 获取城市ID
    const { value } = await getLocalCity();
    this.cityId = value;
  }
  // 搜索框值改变
  handlerChange = (val) => {
    let v = val.trim()
    const { searchTxt } = this.state
    if (v === searchTxt) {
      return
    } else {
      this.setState({
        searchTxt: v
      }, () => {
        clearTimeout(this.timer)
        this.timer = setTimeout(async () => {
          const { status, data } = await getCommunity(this.cityId, v)
          if (status === 200) {
            this.setState({
              tipsList: data
            })
          }
        }, 600)
      })
    }

  }
  // 点击列表
  handlerClick = (item) => {
    this.props.history.replace({ pathname: '/rent/add', data: { id: item.community, name: item.communityName } })

  }
  // 渲染搜索结果列表
  renderTips = () => {
    const { tipsList } = this.state

    return tipsList.map(item => (
      <li onClick={() => { this.handlerClick(item) }} key={item.community} className={styles.tip}>
        {item.communityName}
      </li>
    ))
  }

  render() {
    const { history } = this.props
    const { searchTxt } = this.state

    return (
      <div className={styles.root}>
        {/* 搜索框 */}
        <SearchBar
          placeholder="请输入小区或地址"
          onChange={this.handlerChange}
          value={searchTxt}
          showCancelButton={true}
          onCancel={() => history.replace('/rent/add')}
        />

        {/* 搜索提示列表 */}
        <ul className={styles.tips}>{this.renderTips()}</ul>
      </div>
    )
  }
}
