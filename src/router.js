import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Review from '@/views/Review.vue';
import OdomLineTest from '@/views/OdomLineTest.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
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
