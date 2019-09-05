import './assets/styles/index.scss';

import Vue from 'vue';
import VueShortKey from 'vue-shortkey';
import router from './router';
import store from './store';
import App from './components/App.vue';

Vue.use(VueShortKey);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
