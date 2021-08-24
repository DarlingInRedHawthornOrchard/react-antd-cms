import React, { Component } from 'react'
import { Button, Card, List, Avatar } from 'antd'

import { connect } from 'react-redux'

class Notify extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listData: []
    }
  }

  decDotCount = () => {
    // 让 dotCount - 1,并提交action
    let dotCount = this.props.dotCount
    
    // 拿到store中的state后，提交action触发reducer,即重新存储state
    this.props.decrementDotCountAction(payload)   // 自减1无需payload
  }

  componentDidMount() {
    // 调listData接口
  }

  render() {
    return (
      <Card title='通知中心' extra={<Button>全部标记为已读</Button>}>
        <List
          itemLayout="horizontal"
          dataSource={listData}
          renderItem={item => (
            <List.Item extra={<Button onClick={ this.decDotCount }>标记为已读</Button>}>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />,
      </Card>
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


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notify)
