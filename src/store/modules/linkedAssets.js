import Asset from '../../api/Asset';

const state = {
  all: []
};

const getters = {
  all: state => state.all,
  getAssetsByParentId: state => id => state.all.find(item => item.parentAssetId === id)
};

const actions = {
  async fetchAssets ({ commit, state }, { templates, parentAssetId }) {
    commit('clearAssets', parentAssetId);
    let data = {
      parentAssetId: parentAssetId,
      data: []
    };
    for (let template of templates) {
      const response = await Asset.fetchByParam(template.template.id, template.paramId, parentAssetId);
      data.data.push({
        template: template.template,
        paramId: template.paramId,
        assets: response
      });
    }
    if (data.data.length > 0) commit('setAsset', data);
  },
  resetAllAssets ({ commit }) { commit('resetAllAssets'); },
  async updateAsset ({ commit }, { parentAssetId, templateId, data }) {
    let response = await Asset.update(data);
    response.forEach(newAsset => { commit('updateAsset', { parentAssetId, templateId, newAsset }); });
  },
  async createAsset ({ commit }, { parentAssetId, templateId, data }) {
    let response = await Asset.create(templateId, data);
    response.forEach(newAsset => {
      commit('addAsset', { parentAssetId, templateId, newAsset });
    });
  },
  async removeAsset ({ commit }, { parentAssetId, templateId, data }) {
    let response = await Asset.delete(data);
    response.forEach(id => { commit('removeAsset', { parentAssetId, templateId, id }); });
  }
};

const mutations = {
  resetAllAssets: state => { state.all = []; },
  setAsset: (state, asset) => { state.all.push(asset); },
  clearAssets: (state, parentAssetId) => {
    const index = state.all.findIndex(item => item.parentAssetId === parseInt(parentAssetId));
    if (index !== -1) state.all.splice(index, 1);
  },
  updateAsset: (state, { parentAssetId, templateId, newAsset }) => {
    let indexParentAsset, indexTemplate, indexAsset;
    indexParentAsset = state.all.findIndex(item => item.parentAssetId === parentAssetId);
    if (indexParentAsset !== -1) indexTemplate = state.all[indexParentAsset].data.findIndex(item => item.template.id === templateId);
    if (indexTemplate !== -1) indexAsset = state.all[indexParentAsset].data[indexTemplate].assets.findIndex(item => item.id === newAsset.id);
    if (indexAsset !== -1) state.all[indexParentAsset].data[indexTemplate].assets.splice(indexAsset, 1, newAsset);
  },
  removeAsset (state, { parentAssetId, templateId, id }) {
    let indexParentAsset, indexTemplate, indexAsset;
    indexParentAsset = state.all.findIndex(item => item.parentAssetId === parentAssetId);
    if (indexParentAsset !== -1) indexTemplate = state.all[indexParentAsset].data.findIndex(item => item.template.id === templateId);
    if (indexTemplate !== -1) indexAsset = state.all[indexParentAsset].data[indexTemplate].assets.findIndex(item => item.id === parseInt(id));
    if (indexAsset !== -1) state.all[indexParentAsset].data[indexTemplate].assets.splice(indexAsset, 1);
  },
  addAsset (state, { parentAssetId, templateId, newAsset }) {
    let indexParentAsset, indexTemplate;
    indexParentAsset = state.all.findIndex(item => item.parentAssetId === parentAssetId);
    if (indexParentAsset !== -1) indexTemplate = state.all[indexParentAsset].data.findIndex(item => item.template.id === templateId);
    state.all[indexParentAsset].data[indexTemplate].assets.push(newAsset);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
