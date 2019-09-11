import Object from '../../api/Object';

const state = {
  objects: [],
  childrenObjects: []
};

const getters = {
  objects: state => state.objects,
  childrenObjects: state => state.childrenObjects
};

const mutations = {
  setObjects: (state, objects) => { state.objects = objects; },
  setChildrenObjects: (state, objects) => { state.childrenObjects = objects; }
};

const actions = {
  async fetchObjectsByTemplateId ({ commit }, template) {
    const response = await Object.fetchByTemplate(template);
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
