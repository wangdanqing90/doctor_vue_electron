import Layout from '@/views/layout/Layout'

const communicationRouter = {

  path: '/demo',
  component: Layout,
  meta: {
    roles: ['com']
  },
  children: [
    {
      path: 'app/3',
      name: 'Communication',
      component: () => import('@/views/dashboard/index?3'),
      meta: {
        title: '通讯',
        icon: 'international',
        roles: ['com']
      }
    }
  ]

}
export default communicationRouter
