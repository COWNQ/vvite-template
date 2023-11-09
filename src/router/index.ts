import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [{
    path: '/',
    name: 'h1',
    component: () => import('@/views/echarts/bar-echarts.vue'),
  }, {
    path: '/barecharts',
    name: 'barecharts',
    component: () => import('@/views/echarts/bar-echarts.vue'),
  },
  {
    path: '/pieecharts',
    name: 'pieecharts',
    component: () => import('@/views/echarts/pie-echarts.vue'),
  },
  ],
})

export default router
