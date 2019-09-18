import Template from '../../api/Template';

const state = {
  templates: {},
  currentTemplateId: '',
  currentLinkedTemplates: []
};

const getters = {
  templates: state => Object.keys(state.templates).map(key => state.templates[key]),
  currentTemplate: state => state.templates[state.currentTemplateId],
  currentLinkedTemplates: state => state.currentLinkedTemplates,
  getTemplateById: state => templateId => state.templates[templateId]
};

const actions = {
  async getAllTemplates ({ commit }) {
    const response = await Template.fetchAll();
    commit('setTemplates', response);
  },
  changeCurrentTemplate ({ commit, state }, id) {
    if (state.templates[id]) {
      let linkedTemplates = [];
      Object.keys(state.templates).forEach(key => {
        if (!state.templates[key].params) return;
        state.templates[key].params.forEach(param => {
          if (
            param.type.type === 'link' &&
            param.type.parentCanShowMe &&
            param.type.linkId === id
          ) {
            linkedTemplates.push({
              templateId: state.templates[key].id,
              paramId: param.id
            });
          }
        });
      });
      commit('setCurrentTemplateId', id);
      commit('setCurrentLinkedTemplates', linkedTemplates);
    } else {
      commit('setCurrentTemplateId', '');
      commit('setCurrentLinkedTemplates', []);
    }
  }
};

const mutations = {
  setTemplates: (state, templates) => { state.templates = templates; },
  setCurrentTemplateId: (state, id) => { state.currentTemplateId = id; },
  setCurrentLinkedTemplates: (state, templates) => { state.currentLinkedTemplates = templates; }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
