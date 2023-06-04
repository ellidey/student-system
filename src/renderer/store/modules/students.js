import store, { uuid } from '../store';

export default {
  mutations: {
    addStudent(state, student) {
      student.id = uuid();
      state.students.push(student);

      store.set('students', state.students);
    },

    deleteStudent(state, id) {
      state.students = state.students.filter(student => {
        return student.id !== id;
      });

      store.set('students', state.students);
    },

    updateStudent(state, student) {
      state.students = state.students.map(st => {
        if (st.id === student.id) {
          return { ...student };
        }

        return st;
      });

      store.set('students', state.students);
    }
  },
  state: {
    students: store.get('students') ?? []
  },
  getters: {
    getStudents(state) {
      return state.students;
    },
    getStudent: (state) => (id) => {
      let student = {};

      state.students.forEach(st => {
        if (st.id === id) {
          student = st;
        }
      });

      return student;
    }
  }
};
