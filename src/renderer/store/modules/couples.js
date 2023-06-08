import store, { uuid } from '../store';

export default {
  mutations: {
    addCouple(state, group) {
      group.id = uuid();
      state.couples.push(group);

      store.set('couples', state.couples);
    },
    deleteCouple(state, id) {
      state.couples = state.couples.filter(couple => {
        return couple.id !== id;
      });

      store.set('couples', state.couples);
    },

    updateCouple(state, couple) {
      state.couples = state.couples.map(cp => {
        if (cp.id === couple.id) {
          return { ...couple };
        }

        return cp;
      });

      store.set('couples', state.couples);
    }
  },
  state: {
    couples: store.get('couples') ?? []
  },
  getters: {
    getCouples(state) {
      return state.couples;
    },
    getCouple: (state) => (id) => {
      let couple = {};

      state.couples.forEach(cp => {
        if (cp.id === id) {
          couple = cp;
        }
      });

      return couple;
    }
  }
};
