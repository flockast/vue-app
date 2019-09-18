import Asset from '../../api/Asset';

const state = {
  currentAssets: {}
};

const getters = {
  currentAssets: state => Object.keys(state.currentAssets).map(key => state.currentAssets[key]),
  getAssetsByTemplateId: (state) => (templateId, param) => {
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
  }
};

const mutations = {
  setAssets: (state, assets) => { state.currentAssets = assets; },
  updateAssetValue: (state, objInput) => {
    state.currentAssets[objInput.assetId].values[objInput.paramId] = objInput.value;
  },
  updateAssetProperty: (state, objInput) => {
    state.currentAssets[objInput.assetId][objInput.property] = objInput.value;
  }
};

const actions = {
  async fetchAssetsByTemplatesIds ({ commit }, ids) {
    const response = await Asset.fetchByTemplates(...ids);
    commit('setAssets', response);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
