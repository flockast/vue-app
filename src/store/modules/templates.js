import Template from '../../api/Template';

const state = {
  all: []
};

const getters = {
  all: state => state.all,
  getTemplateById: state => id => state.all.find(item => item.id === id),
  getLinkedTemplatesById: state => id => {
    let linkedTemplates = [];
    state.all.forEach(template => {
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
    return linkedTemplates;
  }
};

const actions = {
  async fetchAll ({ commit }) {
    const response = await Template.fetchAll();
    commit('setTemplates', response);
  }
};

const mutations = {
  setTemplates: (state, templates) => { state.all = templates; }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
