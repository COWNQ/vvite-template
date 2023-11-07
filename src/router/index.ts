import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [{
    path: '/',
    name: 'h1',
    component: () => import('@/views/h1.vue'),
    children: [
      {
        path: '/',
        name: 'h2',
        component: () => import('@/views/h2.vue'),
      },
    ],
  }],
})

export default router
