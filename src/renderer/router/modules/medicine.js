import Layout from '@/views/layout/Layout'

const medicineRouter = {

  path: '/demo',
  component: Layout,
  meta: {
    roles: ['med']
  },
  children: [
    {
      path: 'app/2',
      name: 'Medicine',
      component: () => import('@/views/dashboard/index?2'),
      meta: {
        title: '医疗',
        icon: 'medicine',
        roles: ['med']
      }
    }
  ]

}
export default medicineRouter
