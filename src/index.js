import './assets/styles/index.scss';

import axios from 'axios';
import { baseURL } from '../cms.config.js';
import Vue from 'vue';
import router from './router';
import store from './store';
import App from './components/App.vue';

axios.defaults.baseURL = baseURL;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
