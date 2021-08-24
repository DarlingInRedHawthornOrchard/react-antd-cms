// 把需要展示的页面级组件按需显示
// import Article from './Article'
// import Dashboard from './Dashboard'
// import Login from './Login'
// import NotFound from './NotFound'
// import Setting from './Setting'

// 路由懒加载
import Loadable from 'react-loadable'
import Loading from '../components/Loading'

const Article = Loadable({
  loader: () => import('./Article'),
  loading: Loading,
})
const Edit = Loadable({
  loader: () => import('./Article/Edit'),
  loading: loading
})

const Dashboard = Loadable({
  loader: () => import('./Dashboard'),
  loading: Loading,
})

const Login = Loadable({
  loader: () => import('./Login'),
  loading: Loading,
})

const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading,
})

const Setting = Loadable({
  loader: () => import('./Setting'),
  loading: Loading,
})

const Notify = Loadable({
  loader: () => import('./Notify'),
  loading: loading
})

export {
  Article,
  Dashboard,
  Login,
  NotFound,
  Setting,
  Edit,
  Notify,
}
