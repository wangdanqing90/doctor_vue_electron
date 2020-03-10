import Layout from '@/views/layout/Layout'

const industryRouter = {

  path: '/demo',
  component: Layout,
  meta: {
    roles: ['ind']
  },
  children: [
    {
      path: 'app/1',
      name: 'Industry',
      component: () => import('@/views/dashboard/index?1'),
      meta: {
        title: '工业',
        icon: 'factory',
        roles: ['ind']
      }
    }
  ]

}
export default industryRouter
