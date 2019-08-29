import templates from '@/api/template';

const state = {
  templates: {}
};

const mutations = {
  setAll: (state, templates) => { state.templates = templates; }
};

const actions = {
  async getAll ({ commit }) {
    const response = await templates.getAll();
    commit('setAll', response);
  }
};

const getters = {
  all: state => state.templates
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
