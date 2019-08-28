import './assets/styles/index.scss';

import Vue from 'vue';
import Fragment from 'vue-fragment';
import router from './router';
import store from './store';
import App from './components/App.vue';

Vue.use(Fragment.Plugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
