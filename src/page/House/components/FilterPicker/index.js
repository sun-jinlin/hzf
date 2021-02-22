import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'




export default class FilterPicker extends Component {

  state = {
    value: this.props.data
  }

  render() {
    return (
      <>
        {/* 选择器组件： */}
        <PickerView onChange={(v) => { this.setState({ value: v }) }} data={this.props.selectedData} value={this.state.value} cols={this.props.cols} />

        {/* 底部按钮 */}
        <FilterFooter onOk={() => {
          this.props.onOk(this.state.value)
        }} onCancel={this.props.onCancel} />
      </>
    )
  }
}
