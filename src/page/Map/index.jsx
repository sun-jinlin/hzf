import React, { Component } from 'react'

// 引入antd-mobile
import { NavBar, Icon } from 'antd-mobile';

// 引入css样式
import './index.scss'


class Map extends Component {

  componentDidMount() {
    this.initMap()
  }
  // 初始化地图
  initMap = () => {
    const { BMap } = window
    const map = new BMap.Map("container");
    var point = new BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
  }
  render() {

    return (
      <div className="mapbox">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          地图找房
        </NavBar>
        <div id="container"></div>
      </div>
    )
  }
}
export default Map