import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import zhCN from 'antd/lib/locale/zh_CN';   // 中文
import { ConfigProvider } from 'antd';

// 开启路由操作
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { commonRoutes } from './router'

import { Provider } from "react-redux"
import store from './store';


import './css/index.less'

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Router>
      {/* 路由映射表(App组件和 公共路由配置 -> 公共路由渲染Redirect) */}
      <Switch>
        
        <Route path='/admin' render={(rootProps) => {
          // 做授权检测

          return <Provider store={store}><App {...rootProps}/></Provider>
        }}></Route>

        {/* 公共路由配置 */}
        {
          commonRoutes.map((item, index) => {
            return (
              <Route key={item.pathname} path={item.pathname} component={item.component} />
            )
          })
        }

        {/* 配置not found和重定向,输入/ 导向/admin, 乱输入无匹配组件 导向/404 */}
        <Redirect from='/' to='/admin' exact />  
        <Redirect to='/404' />

      </Switch>
      
    </Router>
  </ConfigProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
