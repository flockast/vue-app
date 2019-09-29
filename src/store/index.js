import Vue from 'vue';
import Vuex from 'vuex';
import templates from './modules/templates';
import assets from './modules/assets';
import linkedAssets from './modules/linkedAssets';
import user from './modules/user';
import settings from './modules/settings';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    settings,
    templates,
    assets,
    linkedAssets,
    user
  },
  strict: process.env.NODE_ENV !== 'production'
});
