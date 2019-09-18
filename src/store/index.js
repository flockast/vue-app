import Vue from 'vue';
import Vuex from 'vuex';
import template from './modules/template';
import asset from './modules/asset';
import user from './modules/user';
import settings from './modules/settings';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    settings,
    template,
    user,
    asset
  },
  strict: false
});
