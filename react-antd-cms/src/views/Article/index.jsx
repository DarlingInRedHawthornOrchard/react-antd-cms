import React, { Component } from 'react'
import { Button, Card, Table, Tag, Tooltip, Modal, message } from 'antd'
import ButtonGroup from 'antd/lib/button/button-group';
import { withRouter } from 'react-router';

import { getTopics } from '../../api'

// const dataSource = [
//   {
//     key: '1',
//     name: '胡彦斌',
//     age: 32,
//     address: '西湖区湖底公园1号',
//   },
//   {
//     key: '2',
//     name: '胡彦祖',
//     age: 42,
//     address: '西湖区湖底公园2号',
//   },
// ];

// const columns = [
//   {
//     title: '姓名',
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: '年龄',
//     dataIndex: 'age',
//     key: 'age',
//   },
//   {
//     title: '住址',
//     dataIndex: 'address',
//     key: 'address',
//   },
//   {
//     title: '操作',
//     dataIndex: 'actions',
//     key: 'actions',
//     render: (text, record, index) => {
//       // record为当前row的JSON, index为当前row的下标
//       return (
//         <ButtonGroup>
//           <Button type='primary'>修改</Button>
//           <Button type='danger'>删除</Button>
//         </ButtonGroup>
//       )
//     }
//   }
// ];





class Article extends Component {


  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      total: 100,
      columns: [],
      isLoading: false,
      page: 1,
      pageSize: 10
    }
  }

  editHandler = (record) => {
    // 构建 编辑表单 路由
    this.props.history.push({
      pathname: '/admin/article/edit',
      query: {
        id: record.id
      }
    })
  }

  delHandler = (record) => {
    Modal.confirm({
      title: '标题',
      content: `确认删除[${record.title}吗]？此操作不可逆`,
      onCancel: () => {
        message.success('用户取消了')
      },
      onOk: () => {
        // 确认删除这条数据,record.id

      }
    })
  }

  getArticleTopics = (page, limit) => {
    this.setState({
      isLoading: true
    })
    getTopics(page, limit).then(res => {
      console.log(res)
      const firstData = res.data[0]
      let keyArr = Object.keys(firstData)   // 把JSON转为键名数组
      const columns = keyArr.map((item) => {
        if(item === 'visit_count') {
          return { 
            title: item,
            dataIndex: item,
            key: item,
            render: (text, record, index) => {   // columns中的render拿到当前行的数据
              return (
                <Tooltip title={record.visit_count >= 1000 ? '书本较为火爆' : '书本较为冷门'}>
                  <Tag color={record.visit_count >= 1000 ? 'red' : 'green'}>{record.visit_count}</Tag>
                </Tooltip> 
              )
            }
          }
        }
        
      })
      columns.push({
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record, index) => {
          return (
            <ButtonGroup>
              <Button size='small' type='primary' onClick={this.editHandler(record)}>修改</Button>
              <Button size='small' type='danger' onClick={this.delHandler(record)}>删除</Button>
            </ButtonGroup>
          )
        }
      })
      this.setState({
        dataSource: res.data,
        columns: columns
      })
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      this.setState({
        isLoading: false   // 网络请求完毕取消loading
      })
    })
  }

  changeHandler = (page, pageSize) => {
    this.setState({
      page,
      pageSize
    })
    this.getArticleTopics(page, pageSize)
  }

  componentDidMount() {
    this.getArticleTopics(this.state.page, this.state.pageSize)
  }



  render() {
    
    const { dataSource, total, columns, isLoading, page, pageSize } = this.state

    return (
      <Card title="文章列表" extra={ <Button type='dashed'>导出Excel</Button>}>
        {/* columns为表格头JSON数组，dataSource为数据JSON数组; dataIndex可以指定要对应的dataSource中的key */}
        <Table 
          loading={ isLoading }
          rowKey={ record => record.id }
          dataSource={dataSource} 
          columns={columns}
          pagination={{ total: total, pageSize: pageSize, current: page, onChange: this.changeHandler }}
        />
      </Card>
    )
  }
}
export default withRouter(Article)
