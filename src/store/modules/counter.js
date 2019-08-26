const state = {
  count: 0
};

const mutations = {
  increment (state) {
    state.count++;
  },
  decrement (state) {
    state.count--;
  },
  incrementBy (state, { num }) {
    state.count += num;
  }
};

const actions = {
  up ({ commit }) {
    commit('increment');
  },
  down ({ commit }) {
    commit('decrement');
  },
  by ({ commit }, num) {
    commit('incrementBy', { num: num });
  }
};

const getters = {
  is_positive: (state) => state.count === 0 ? state.count : state.count >= 0,
  count: state => {
    return state.count;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
