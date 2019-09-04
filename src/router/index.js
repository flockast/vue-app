import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Template from './views/Template.vue';
import PageNotFound from './views/PageNotFound.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/template/:id',
      name: 'template',
      component: Template
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]
});
