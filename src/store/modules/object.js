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
  setChildrenObjects: (state, objects) => { state.childrenObjects = objects; },
  updateObject: (state, index, data) => { state.objects[index] = data; }
};

const actions = {
  async fetchObjectsByTemplateId ({ commit }, template) {
    const response = await Object.fetchByTemplate(template);
    commit('setObjects', response);
  },
  update ({ commit, state }, data) {
    let index = state.childrenObjects.findIndex(item => item.id === data.id);
    if (index) {
      commit('updateObject', index, data);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
