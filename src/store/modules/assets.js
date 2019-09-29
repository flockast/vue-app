import Asset from '../../api/Asset';

const state = {
  template: {},
  assets: [],
  newAssets: []
};

const getters = {
  template: state => state.template,
  all: state => state.assets,
  newAssets: state => state.newAssets
};

const actions = {
  async fetchAssets ({ commit }, template) {
    const response = await Asset.fetchByTemplates(template.id);
    commit('setAssets', response);
    commit('setTemplate', template);
  },
  addToNewAssets ({ commit, state }) {
    let data = {
      values: {}
    };
    state.template.params.forEach(param => {
      data.values[param.id] = '';
    });
    commit('addToNewAssets', data);
  },
  removeFromNewAssets ({ commit }, key) {
    commit('removeFromNewAssets', key);
  },
  resetNewAssets ({ commit }) { commit('resetNewAssets'); },
  async updateAsset ({ commit }, data) {
    let response = await Asset.update(data);
    response.forEach(item => { commit('updateAsset', item); });
  },
  async createAsset ({ commit }, { key, templateId, data }) {
    let response = await Asset.create(templateId, data);
    response.forEach(item => {
      commit('removeFromNewAssets', key);
      commit('addAsset', item);
    });
  },
  async removeAsset ({ commit }, data) {
    let response = await Asset.delete(data);
    response.forEach(item => { commit('removeAsset', item); });
  }
};

const mutations = {
  setTemplate: (state, template) => { state.template = template; },

  // assets
  setAssets: (state, assets) => { state.assets = assets; },
  addAsset: (state, asset) => { state.assets.push(asset); },
  updateAsset: (state, asset) => {
    const index = state.assets.findIndex(item => item.id === asset.id);
    if (index !== -1) state.assets.splice(index, 1, asset);
  },
  removeAsset: (state, id) => {
    const index = state.assets.findIndex(item => item.id === parseInt(id));
    if (index !== -1) state.assets.splice(index, 1);
  },

  // newAssets
  resetNewAssets: state => { state.newAssets = []; },
  addToNewAssets: (state, data) => { state.newAssets.push(data); },
  removeFromNewAssets (state, key) { state.newAssets.splice(key, 1); }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
