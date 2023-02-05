import { createRouter, createWebHistory } from 'vue-router';

const MainView = () => import('@/pages/views/TheMainView.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainView,
      name: 'main',
      meta: { layout: 'main' },
    },
  ],
});

export default router;
