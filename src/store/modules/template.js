import Template from '../../api/Template';

const state = {
  templates: [],
  template: {},
  childrenTemplates: []
};

const getters = {
  templates: state => state.templates,
  template: state => state.template,
  childrenTemplates: state => state.childrenTemplates,
  getTemplateById: state => (id) => state.templates.find(template => template.id === id)
};

const actions = {
  async getAllTemplates ({ commit }) {
    const response = await Template.fetchAll();
    commit('setTemplates', response);
  }
};

const mutations = {
  setTemplates: (state, templates) => { state.templates = templates; },
  setTemplate: (state, id) => { state.template = state.templates.find(item => item.id === id); },
  setChildrenTemplates: (state, templates) => { state.childrenTemplates = templates; }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
