import React, { Component } from 'react';
import { Route } from 'react-router-dom'
// 引入antd-mobile组件
import { TabBar } from 'antd-mobile'
// 引入二级组件
import Index from '../Index';
import House from '../House';
import Profile from '../Profile';

// 引入css
import './index.css';

// 引入TabBarList数据
import TabBarList from '../../utils/TabBarList';


class Home extends Component {
  state = {
    selectedTab: this.props.location.pathname,
  };

  // TabBar模版
  getTabBar() {
    return (
      <div className='barBox'>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          {TabBarList.map(item => (<TabBar.Item
            title={item.title}
            key={item.id}
            icon={<i className={`iconfont ${item.icon}`}></i>}
            selectedIcon={<i className={`iconfont ${item.icon}`}></i>}
            selected={this.state.selectedTab === item.path}
            onPress={() => {
              this.props.history.push(item.path)
              this.setState({
                selectedTab: item.path,
              });
            }}
          >
          </TabBar.Item>
          ))}
        </TabBar>
      </div>
    )
  }
  render() {
    return (
      <div>
        {/* 二级路由配置 */}

        <Route exact path="/home" component={Index} ></Route>
        <Route path="/home/house" component={House} ></Route>
        <Route path="/home/profile" component={Profile} ></Route>


        {/* TabBar */}
        { this.getTabBar()}

      </div>
    )
  }
}
export default Home