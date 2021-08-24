import { Login, NotFound, Setting, Article, Dashboard, Edit, Notify } from '../views'


// 公共路由(Login NotFound)

const commonRoutes = [
  {
    pathname: '/login',
    component: Login,
  },
  {
    pathname: '/404',
    component: NotFound,
  },
]



// 权限路由(dashboard article setting)

const privateRoutes = [
  {
    pathname: '/admin/dashboard',
    component: Dashboard,
    title: '仪表盘',
    icon: 'home',
    isTop: true   // 代表是一级菜单
  },
  {
    pathname: '/admin/article',
    component: Article,
    title: '文章管理',
    icon: 'edit',
    isTop: true,
    exact: true,
    children: [
      {
        pathname: '/admin/article/edit',
        component: Edit,
        title: '编辑文章',
        hidden: true
      }
    ]
  },
  {
    pathname: '/admin/setting',
    component: Setting,
    title: '系统设置',
    icon: 'setting',
    isTop: true
  },
  {
    pathname: '/admin/notify',
    component: Notify,
    title: '通知中心',
    isTop: false
  },
]

export {
  commonRoutes,
  privateRoutes
}