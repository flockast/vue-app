import User from '../../api/User';

const state = {
  isAuth: false,
  token: ''
};

const mutations = {
  setToken (state, token) {
    state.token = token;
  },
  setAuth (state, status) {
    state.isAuth = status;
  }
};

const actions = {
  async auth ({ commit }) {
    const response = await User.auth();
    if (response.token) {
      commit('setToken', response.token);
      commit('setAuth', true);
    }
  }
};

const getters = {
  isAuth (state) {
    return state.isAuth;
  },
  token (state) {
    return state.token;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
