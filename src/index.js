import "./styles/index.scss";

import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
