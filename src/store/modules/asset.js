import Asset from '../../api/Asset';

const state = {
  currentAssets: {},
  removedAssetsList: [],
  addedAssets: []
};

const getters = {
  currentAssets: state => Object.keys(state.currentAssets).map(key => state.currentAssets[key]),
  getAssetsByTemplateId: state => (templateId, param) => {
    let assets = Object.keys(state.currentAssets).map(key => state.currentAssets[key]);
    return assets.filter(item => {
      if (param) {
        return item.templateId === templateId &&
               item.values[param.id] &&
               item.values[param.id] === param.value;
      } else {
        return item.templateId === templateId;
      }
    });
  },
  removedAssetsList: state => state.removedAssetsList
};

const mutations = {
  setAssets: (state, assets) => { state.currentAssets = assets; },
  updateAsset: (state, { id, data }) => {
    state.currentAssets[id].revision = data.revision;
    state.currentAssets[id].lastUpdate = data.lastUpdate;
  },
  addToRemovedAssetsList: (state, id) => { state.removedAssetsList.push(id); },
  removeFromRemovedAssetsList: (state, id) => { state.removedAssetsList = state.removedAssetsList.filter(item => item !== id); },
  resetRemovedAssetsList: (state) => { state.removedAssetsList = []; }
};

const actions = {
  async fetchAssetsByTemplatesIds ({ commit }, ids) {
    const response = await Asset.fetchByTemplates(...ids);
    commit('setAssets', response);
  },
  async updateAssets ({ commit }, data) {
    const response = await Asset.update(data);
    Object.keys(response.data).forEach(id => {
      commit('updateAsset', { id, data: response.data[id] });
    });
  },
  toggleRemovedAssetsList ({ commit, state }, id) {
    state.removedAssetsList.includes(id) ? commit('removeFromRemovedAssetsList', id) : commit('addToRemovedAssetsList', id);
  },
  resetRemovedAssetsList ({ commit }) { commit('resetRemovedAssetsList'); }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
