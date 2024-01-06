import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Review from '@/views/Review.vue';
import OdomLineTest from '@/views/OdomLineTest.vue';

const router = createRouter({
  history: createWebHistory('/'),
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/review',
      name: 'review',
      component: Review,
    },
    {
      path: '/odom-line-test',
      name: 'line test',
      component: OdomLineTest,
    },
  ],
});

export default router;