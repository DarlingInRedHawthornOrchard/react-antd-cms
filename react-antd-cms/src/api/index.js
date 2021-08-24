// axios发送网络请求获取Mock数据
import { message } from 'antd'
import axios from 'axios'

// 1.配置baseURL

const isDev = process.env.NODE_ENV === 'development'

const service = axios.create(
  {
    baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/289332/api/v1' : '线上地址xxxx'
  }
)

// 2.使用对象的API进行网络请求拦截(1. 拦截请求、传递参数、token验证； 2. 拦截响应)

service.interceptors.request.use((config) => {
  // config为发送给服务器的信息，
  return config
})

service.interceptors.response.use((response) => {
  if(response.code !== 0) {
    return response.data
  }else {
    // 统一处理错误
    message.error('响应错误')
  }
})

// 文章列表接口： http://rap2api.taobao.org/app/mock/289332/api/v1/articles
const getTopics = (page = 1, limit = 5) => {
  return axios.get(`/articles?page=${page}&limit=${limit}`)
}

export {
  getTopics
}