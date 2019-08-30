import Template from '../../api/Template';

const state = {
  templates: {}
};

const mutations = {
  setAll: (state, templates) => { state.templates = templates; }
};

const actions = {
  async getAll ({ commit }) {
    const response = await Template.getAll();
    commit('setAll', response);
  }
};

const getters = {
  templates: state => state.templates
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
