import Vue from 'vue';
import Router from 'vue-router';

const Dashboard = () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue');
const Arena = () => import(/* webpackChunkName: "arena" */ './views/Arena.vue');
const Settings = () => import(/* webpackChunkName: "settings" */ './views/Settings.vue');

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
      path: '/arena',
      name: 'arena',
      component: Arena,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
  ],
});
