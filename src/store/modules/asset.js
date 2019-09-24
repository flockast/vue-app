import Asset from '../../api/Asset';

const state = {
  currentAssets: [],
  removedAssetsList: [],
  addedAssets: []
};

const getters = {
  currentAssets: state => state.currentAssets,
  getAssetsByTemplateId: state => (templateId, param) => {
    return state.currentAssets.filter(item => {
      if (param) {
        return item.templateId === templateId &&
               item.values[param.id] &&
               item.values[param.id] === param.value;
      } else {
        return item.templateId === templateId;
      }
    });
  }
};

const mutations = {
  setAssets: (state, assets) => { state.currentAssets = assets; },
  updateAsset: (state, { id, data }) => {
    if (state.currentAssets[id]) {
      const currentAssets = Object.assign({}, state.currentAssets);
      currentAssets[id] = data;
      state.currentAssets = currentAssets;
    }
  },
  removeAsset: (state, id) => {
    if (state.currentAssets[id]) {
      const currentAssets = Object.assign({}, state.currentAssets);
      delete currentAssets[id];
      state.currentAssets = currentAssets;
    }
  }
};

const actions = {
  async fetchCurrentAssets ({ commit }, id) {
    const response = await Asset.fetchByTemplates(id);
    commit('setAssets', response);
  },
  async updateAssets ({ commit }, data) {
    const response = await Asset.update(data);
    Object.keys(response.data).forEach(id => {
      commit('updateAsset', { id, data: response.data[id] });
    });
  },
  async deleteAssets ({ commit }, ids) {
    const response = await Asset.delete(...ids);
    Object.keys(response.data).forEach(id => {
      commit('removeAsset', parseInt(id));
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
