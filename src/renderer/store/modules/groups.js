import store, { uuid } from '../store';

export default {
  mutations: {
    addGroup(state, group) {
      group.id = uuid();
      state.groups.push(group);

      store.set('groups', state.groups);
    },
    deleteGroup(state, id) {
      state.groups = state.groups.filter(student => {
        return student.id !== id;
      });

      store.set('groups', state.groups);
    },

    updateGroup(state, group) {
      state.groups = state.groups.map(gr => {
        if (gr.id === group.id) {
          return { ...group };
        }

        return gr;
      });

      store.set('groups', state.groups);
    }
  },
  state: {
    groups: store.get('groups') ?? []
  },
  getters: {
    getGroups(state) {
      return state.groups;
    },
    getGroup: (state) => (id) => {
      let group = {};

      console.log(state.groups)
      state.groups.forEach(gr => {
        if (gr.id === id) {
          group = gr;
        }
      });

      return group;
    }
  }
};
