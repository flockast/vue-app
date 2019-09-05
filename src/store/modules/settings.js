const state = {
  sidebarCollapsed: false
};

const getters = {
  isCollapsedSidebar: (state) => state.sidebarCollapsed
};

const mutations = {
  toggleSidebarCollapse (state) {
    state.sidebarCollapsed = !state.sidebarCollapsed;
  },
  setSidebarCollapse (state, value) {
    state.sidebarCollapsed = value;
  }
};

const actions = {
  changeSidebarCollapse ({ commit }, value) {
    value !== undefined
      ? commit('setSidebarCollapse', value)
      : commit('toggleSidebarCollapse');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
