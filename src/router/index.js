import Vue from 'vue'
import Router from 'vue-router'
//1.安装插件
const Home = ()=>import('../views/home/Home')
const Category = ()=>import('../views/category/Category')
const Cart = ()=>import('../views/cart/Cart')
const Profile = ()=>import('../views/profile/Profile')
const Detail = ()=>import('../views/detail/Detail')
//2.安装插件
Vue.use(Router)

//配置映射关系
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]
//创建router
const router = new Router({
  routes,
  mode:'history'
})

//导出
export default router

