import Template from '../../api/Template';

const state = {
  templates: [],
  objects: []
};

const getters = {
  templates: state => state.templates,
  objects: state => state.objects
};

const mutations = {
  setAll: (state, templates) => { state.templates = templates; },
  setObjects: (state, objects) => { state.objects = objects; }
};

const actions = {
  async getAllTemplates ({ commit }) {
    const response = await Template.getAll();
    commit('setAll', response);
  },
  async getObjectsById ({ commit }, id) {
    const response = await Template.getObjectsById(id);
    commit('setObjects', response);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
