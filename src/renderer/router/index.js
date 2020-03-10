import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/* Router Modules */

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    // hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '工作台',
        icon: 'dashboard',
        roles: ['doctor']
      }
    }]
  },

  {
    path: '/detail/index',
    name: 'DetailInform',
    component: () => import('@/views/detail/index.vue'),
    meta: {
      title: '基本信息',
      keepAlive: false
    }
  },

  {
    path: '/result',
    name: 'result',
    component: () => import('@/views/result/index.vue'),
    meta: {
      title: '操作结果',
      keepAlive: false
    }
  },

  {
    path: '/training/list',
    name: 'trainingList',
    component: () => import('@/views/training/list.vue'),
    meta: {
      title: '训练列表',
      keepAlive: false
    }
  },

  {
    path: '/training/advice',
    name: 'trainingAdvice',
    component: () => import('@/views/training/advice.vue'),
    meta: {
      title: '医嘱',
      keepAlive: false
    }
  },

  {
    path: '/training/application',
    name: 'traingingApplication',
    component: () => import('@/views/training/application.vue'),
    meta: {
      title: '申请详情',
      keepAlive: false
    }
  },

  {
    path: '/training/report',
    name: 'trainingReport',
    component: () => import('@/views/training/report.vue'),
    meta: {
      title: '训练报告',
      keepAlive: false
    }
  },

  {
    path: '/training/appointment',
    name: 'trainingAppointment',
    component: () => import('@/views/training/appointment.vue'),
    meta: {
      title: '时间预约'
    }
  },

  {
    path: '/training/slider',
    name: 'trainingSlider',
    component: () => import('@/views/training/slider.vue'),
    meta: {
      title: '训练模式选择'
    }
  },

  {
    path: '/training/setting',
    name: 'trainingAdjust',
    component: () => import('@/views/training/setting.vue'),
    meta: {
      title: '训练控件数字调节'
    }
  },

  {
    path: '/training/review',
    name: 'trainingReview',
    component: () => import('@/views/training/review.vue'),
    meta: {
      title: '本次训练计划'

    }
  },

  {
    path: '/forgetPassword',
    name: 'forgetPassword',
    component: () => import('@/views/login/forgetPassword.vue'),
    meta: {
      title: '忘记密码',
      keepAlive: false
    }
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login/register.vue'),
    meta: {
      title: '注册',
      keepAlive: false
    }
  },
  /* r
  {
    path: '/news',
    component: Layout,
    redirect: '/news',
    name: 'News',
    // hidden: true,
    children: [{
      path: 'news',
      component: () => import('@/views/news/index'),
      meta: { title: '新闻',
        icon: 'dashboard',
        roles: ['admin']
      }
    }]
  },
*/

  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

]
