import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// 引入一级路由
import Home from './page/Home'
import CityList from './page/CityList'
import Map from './page/Map'
import NotFound from './page/NotFound'
import HouseDetail from './components/HouseDetail'
import Login from './page/Login'
import Rent from './page/Rent/index'
import RentAdd from './page/Rent/Add';
import RentSearch from './page/Rent/Search'
function App() {
  return (
    <Router>

      {/* 路由配置 */}
      <Switch>
        {/* 路由转向 */}
        <Redirect exact from="/" to="/home" ></Redirect>
        {/* 主页 */}
        <Route className='home' path="/home" component={Home} ></Route>
        {/* 城市列表 */}
        <Route className='citylist' path="/citylist" component={CityList} ></Route>
        {/* 地图 */}
        <Route className='map' path="/map" component={Map} ></Route>
        {/* 房屋详情 */}
        <Route className='detail' path="/detail/:id" component={HouseDetail} ></Route>
        {/* 登录 */}
        <Route className='login' path="/login" component={Login} ></Route>
        {/* 房源列表 */}
        <Route exact className='rent' path="/rent" component={Rent} ></Route>
        {/* 发布房源 */}
        <Route className='rentAdd' path="/rent/add" component={RentAdd} ></Route>
        {/* 房源小区搜索 */}
        <Route className='rentSearch' path="/rent/search" component={RentSearch} ></Route>
        {/* 404 */}
        <Route className='notFound' component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
