import Vue from 'vue';
import Vuex from 'vuex';
import templates from './modules/templates';
import template from './modules/template';
import asset from './modules/asset';
import user from './modules/user';
import settings from './modules/settings';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    settings,
    templates,
    template,
    user,
    asset
  },
  strict: process.env.NODE_ENV !== 'production'
});
