import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon, Col, Row, Badge } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

import { privateRoutes } from '../../router';
import { withRouter } from 'react-router-dom';
import Avatar from 'antd/lib/avatar/avatar';

import {connect} from 'react-redux'
import { decrementDotCountAction } from '../../store/actions/dotActions';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

// 布局组件

class FrameOut extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dotCount: props.dotCount    // 从redux拿
    }
  }

  render() {

    // const topMenus = privateRoutes.filter((item) => {
    //   return item.isTop === true
    // })

    // 动态渲染路由函数
    generateMenu = (privateRoutes) => {
      return (
        <div>
          {
            privateRoutes.map((item) => {
              if(item.children) {
                return(
                  // 如果item有children的话，把item作为SubMenu
                  <SubMenu key={item.pathname} title={item.title}>
                    <Icon type={item.icon} />
                    <Menu.Item key={item.pathname}>{this.generateMenu(item.children)}</Menu.Item>
                  </SubMenu>
                )
              }else {
                if(!item.hidden) {
                  return(
                    // 没有children的item就作为Menu.Item
                    <Menu.Item key={item.key}>
                      <Icon type={item.icon} />
                      <Link to={item.pathname}></Link>
                    </Menu.Item>
                  )
                }
              }
            })
          }
        </div>
      )
    }

    menusHandler = ({ item, key, keyPath, domEvent }) => {
      console.log({item, key, keyPath, domEvent})
      // 参数为配置对象,key是pathname
      this.props.history.push(key)
    }

    dropMenuHandler = ({ key }) => {
      this.props.history.push({
        pathname: key
      })
    }

    menu = () => {
      return (
        <Menu onClick={this.dropMenuHandler}>
          <Menu.Item key='/admin/notify'>
            {/* 有消息时的小红点dot */}
            <Badge dot>  
              通知中心
            </Badge>
          </Menu.Item>
          <Menu.Item key='/admin/setting'>
            <Icon type='setting' />
            设置
          </Menu.Item>
          <Menu.Item key='/login'>
            退出
          </Menu.Item>
        </Menu>
      );
    }


    return (
      // 第一个Layout是顶部导航
      <Layout style={{ minHeight: '100%' }}>
        <Header className="header">
          {/* 不需要顶部导航 */}
          <Row>
            <Col span={8}>
              <h2 style={{fontSize: 14, color: '#fff'}}>CMS 管理系统</h2>
            </Col>
            <Col span={3} offset={13}>
              {/* Dropdown下拉框 */}
              <Dropdown overlay={this.menu()}>
                {/* 气泡数 */}
                <Badge count={this.state.dotCount}>
                  <div>
                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    欢迎您，xxx<Icon type='down' />
                  </div>
                </Badge>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        {/* 第二个Layout是侧边 */}
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              onClick={this.menusHandler}
              mode="inline"
              selectedKeys={[ this.props.location.pathname ]}    // 当前路由的信息在location中，key绑定pathname
              style={{ height: '100%', borderRight: 0 }}
            >
              {/* {
                topMenus.map((item, index) => {
                  return (
                    <Menu.Item key={item.pathname}><Icon type={item.icon} /></Menu.Item>
                  )
                })
              } */}

              {/* 递归实现动态渲染 */}

              {
                this.generateMenu(privateRoutes)
              }

            </Menu>
          </Sider>
          {/* 第三个Layout是面包屑导航 */}
          <Layout style={{ padding: '0 24px 24px' }}>
            
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {/* 子组件的所有内容 */}
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dotCount: state.dotState.dotCount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    decrementDotCountAction: (payload) => dispatch(decrementDotCountAction(payload))
  }
}

// 高阶组件，给oldComponent => FrameOut 传3个prop, history、location、match
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FrameOut))


