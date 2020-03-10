import Layout from '@/views/layout/Layout'

const internetRouter = {

  path: '/demo',
  component: Layout,
  meta: {
    roles: ['int']
  },
  children: [
    {
      path: 'app/4',
      name: 'Internet',
      component: () => import('@/views/dashboard/index?4'),
      meta: {
        title: '物联网',
        icon: 'example',
        roles: ['int']
      }
    }
  ]

}
export default internetRouter
