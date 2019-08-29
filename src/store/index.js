import Vue from 'vue';
import Vuex from 'vuex';
import template from './modules/template';
import counter from './modules/counter';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    template,
    counter
  },
  strict: process.env.NODE_ENV !== 'production'
});
