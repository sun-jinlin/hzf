import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
// 引入一级路由
import Home from './page/Home'
import CityList from './page/CityList'
import Map from './page/Map'
import NotFound from './page/NotFound'



function App() {
  return (
    <Router>

      {/* 路由配置 */}
      <Switch>
        <Redirect exact from="/" to="/home" ></Redirect>
        <Route path="/home" component={Home} ></Route>
        <Route path="/citylist" component={CityList} ></Route>
        <Route path="/map" component={Map} ></Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
