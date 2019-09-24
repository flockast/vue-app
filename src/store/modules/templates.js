import Template from '../../api/Template';

const state = {
  templates: [],
  currentTemplate: {},
  currentLinkedTemplates: []
};

const getters = {
  templates: state => state.templates,
  currentTemplate: state => state.currentTemplate,
  currentLinkedTemplates: state => state.currentLinkedTemplates,
  getTemplateById: state => id => state.templates.find(item => item.id === id)
};

const actions = {
  async getAllTemplates ({ commit }) {
    const response = await Template.fetchAll();
    commit('setTemplates', response);
  },
  changeCurrentTemplate ({ commit, state }, id) {
    const currentTemplate = state.templates.find(item => item.id === id);
    if (currentTemplate) {
      let linkedTemplates = [];
      state.templates.forEach(template => {
        if (!template.params) return;
        template.params.forEach(param => {
          if (
            param.type.type === 'link' &&
            param.type.parentCanShowMe &&
            param.type.linkId === id
          ) {
            linkedTemplates.push({
              template: template,
              paramId: param.id
            });
          }
        });
      });
      commit('setCurrentTemplate', currentTemplate);
      commit('setCurrentLinkedTemplates', linkedTemplates);
    } else {
      commit('setCurrentTemplate', {});
      commit('setCurrentLinkedTemplates', []);
    }
  }
};

const mutations = {
  setTemplates: (state, templates) => { state.templates = templates; },
  setCurrentTemplate: (state, data) => { state.currentTemplate = data; },
  setCurrentLinkedTemplates: (state, templates) => { state.currentLinkedTemplates = templates; }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
