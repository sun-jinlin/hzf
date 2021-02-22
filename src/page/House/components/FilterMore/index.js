import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
  state = {
    seledData: this.props.value
  }
  // 切换点击
  switchClick(item) {
    const { seledData } = this.state
    const newSeledData = [...seledData]
    const index = newSeledData.indexOf(item.value)
    if (index !== -1) {
      newSeledData.splice(index, 1)

    } else {
      newSeledData.push(item.value)
    }
    this.setState({ seledData: newSeledData })
  }
  // 渲染标签
  renderFilters(data) {
    // 高亮类名： styles.tagActive
    const { seledData } = this.state
    return (
      data.map(item => (
        <span onClick={() => { this.switchClick(item) }} key={item.value} className={[styles.tag, seledData.includes(item.value) && styles.tagActive].join(' ')}>{item.label}</span>
      ))
    )
  }

  render() {
    const { data: { roomType, oriented, floor, characteristic }, onCancel, onOk } = this.props
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} onClick={onCancel} />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter onOk={() => { onOk(this.state.seledData) }} onCancel={onCancel} className={styles.footer} />
      </div>
    )
  }
}
