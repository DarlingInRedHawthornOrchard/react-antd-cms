import React,{Component} from 'react'
import { Button } from 'antd'

import { privateRoutes } from './router'
import { Route, Switch, Redirect } from 'react-router-dom'

import FrameOut from './components/FrameOut'

// import * as Redux from 'redux'   // 全部导出为Redux

export default class App extends Component {

  constructor(props) {
    super(props)
    this.props.history.listen((location) => {
      // 地址栏的hash发生变化，就会触发
      let {pathname} = location
      const resRoute =  privateRoutes.find(item => {
        return item.pathname === pathname
      })
      // 路由变化，window标题也跟着变化
      window.document.title = resRoute && resRoute.title
    })
  }

  render() {
    // 显示私有路由 /admin/dashboard二级路由 在App组件中显示
    // 在一级(外壳)组件中，配置二级路由映射
    return (
      // 注册路由映射关系(私有路由配置 -> 私有路由渲染FrameOut)
      <FrameOut>
        <Switch>
          {
            privateRoutes.map((item) => {
              return (
                <Route key={item.pathname} exact={item.exact} path={item.pathname}  render={(rootProps) => {
                  // 授权检测

                  let PrivateComp = item.component  // 组件名称开头要大写，不能用item.component
                  return <PrivateComp {...rootProps} />
                }} />
              )
            })
          }

          {/* 配置默认的/admin和not found */}
          <Redirect from='/admin' to={privateRoutes[0].pathname} exact />
          <Redirect to='/404' />
        </Switch>
      </FrameOut>
      
    )
  }
}
