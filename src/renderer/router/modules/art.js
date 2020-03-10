import Layout from '@/views/layout/Layout'

const artRouter = {

  path: '/demo',
  component: Layout,
  meta: {
    roles: ['art']
  },
  children: [
    {
      path: 'app/5',
      name: 'Art',
      component: () => import('@/views/dashboard/index?5'),
      meta: {
        title: '艺术',
        icon: 'paint',
        roles: ['art']
      }
    }
  ]
}
export default artRouter
