import store, { uuid } from '../store';

export default {
  mutations: {
    updateSkips(state, skips) {
      state.skips = skips;
      store.set('skips', state.skips);
    },
  },
  state: {
    skips: store.get('skips') ?? {}
  },
  getters: {
    getSkips(state) {
      return state.skips;
    },
  }
};
