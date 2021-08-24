import React, { Component } from 'react'
import { Form, Row, Col, Icon, Input, Button, Card } from 'antd'

import { withRouter } from 'react-router'

class Edit extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    const { id } = this.props.location.query
    onFinish = (id) => {
      // 提交时,根据id发送POST请求...
      
    }
    return (
      <Row>
        <Col span={8} offset={8}>
          {/* 卡片右上角有一个取消 */}
          <Card title='文章编辑' extra={ <Button type='danger' onClick={ () => { this.props.history.goBack() } }>取消</Button> }>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={ this.onFinish }
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default withRouter(Edit)
