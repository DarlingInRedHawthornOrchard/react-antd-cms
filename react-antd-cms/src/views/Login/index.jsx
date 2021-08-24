import React, { Component } from 'react'

export default class Login extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={8} offset={8}>
            <Card title='登录' >
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
      </div>
    )
  }
}
