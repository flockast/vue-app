import Vue from 'vue';
import Vuex from 'vuex';
import template from './modules/template';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    template,
    user
  },
  strict: process.env.NODE_ENV !== 'production'
});
