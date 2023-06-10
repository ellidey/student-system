<script>
import Vue from 'vue'
import Popper from 'vue-popperjs';
import { mapGetters, mapMutations } from "vuex";

export default Vue.extend({
  name: 'Students',
  components: { Popper },
  computed: {
    ...mapGetters(['getStudents', 'getGroups']),
    filterStudents() {
      const students = this.getStudents;
      if (this.group_id) {
        return students.filter(student => {
          return student.group_id === this.group_id;
        })
      }

      return students;
    }
  },
  data: function () {
    return {
      selectStudent: null,
      group_id: null,
      parentTypes: {
        1: 'Мама',
        2: 'Папа',
        3: 'Опекун'
      }
    }
  },
  methods: {
    ...mapMutations(['deleteStudent']),
  }
});

</script>

<template>
  <div>
    <h1>Список студентов</h1>
    <div class="box">
      <div style="display: flex; gap: 5px;">
        <router-link tag="button" to="/students/add" class="button is-primary mb-4">
          Добавить
        </router-link>

        <div class="select is-small">
          <select v-model="group_id" style="width: 200px; height: 35px;">
            <option selected value="">Все</option>
            <option v-for="group in getGroups" :key="group.id" :value="group.id">
              {{ group.name }}
            </option>
          </select>
        </div>
      </div>

      <article class="message is-success mt-4" v-if="getStudents.length === 0">
        <div class="message-body">
          <b>Студенты не найдены</b><br>
          Пожалуйста, добавьте группы в систему
        </div>
      </article>

      <table class="table is-fullwidth" v-else>
        <thead>
        <tr>
          <th>ФИО</th>
          <th>Возраст</th>
          <th>Пол</th>
          <th>Группа</th>
          <th>Телефон</th>
          <th>Дата рождения</th>
          <th>Паспорт</th>
          <th>Снилс</th>
          <th>Учет</th>
          <th>Место прописки</th>
          <th>Место жительства</th>
          <th>Родители</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="student in filterStudents" :key="student.id">
          <td>{{ student.name || '-' }}</td>
          <td>{{ student.age || '-' }}</td>
          <td>{{ student.gender || '-' }}</td>
          <td>{{ $store.getters.getGroup(student.group_id)?.name || 'Неизвестно' }}</td>
          <td>{{ student.phone || '-' }}</td>
          <td>{{ student.date || '-' }}</td>
          <td>{{ student.passport || '-' }}</td>
          <td>{{ student.snils || '-' }}</td>
          <td>{{ student.data || '-' }}</td>
          <td>{{ student.place || '-' }}</td>
          <td>{{ student.place_live || '-' }}</td>
          <td>
            <button @click="selectStudent = student" class="button is-small is-primary" style="padding: 0 10px;">
              <i class="ri-eye-2-fill"></i>
            </button>
          </td>
          <td>
            <popper
              trigger="clickToOpen"
              :options="{
                placement: 'bottom',
                modifiers: { offset: { offset: '0,5px' } }
              }">
              <div class="popper">
                <router-link tag="button" :to="`/students/${student.id}/edit`">
                  <i class="ri-pencil-line"></i>
                  Редактировать
                </router-link>

                <button @click="deleteStudent(student.id)">
                  <i class="ri-delete-bin-7-line"></i>
                  Удалить
                </button>
              </div>

              <button slot="reference" class="btn more">
                <i class="ri-more-2-line"></i>
              </button>
            </popper>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="modal" :class="{ 'is-active': selectStudent }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Родители {{ selectStudent?.name }}</p>
          <button @click="selectStudent = null" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <article class="message is-success mt-4" v-if="selectStudent?.parents?.length === 0">
            <div class="message-body">
              <b>Родители не найдены</b><br>
              Пожалуйста, добавьте родителей
            </div>
          </article>

          <table class="table is-fullwidth" v-else>
            <thead>
            <tr>
              <th>Родитель</th>
              <th>ФИО</th>
              <th>Телефон</th>
              <th>Образование</th>
              <th>Место работы</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(parent, index) in selectStudent?.parents" :key="index">
              <td>{{ parentTypes[parent.type] || '-' }}</td>
              <td>{{ parent.name || '-' }}</td>
              <td>{{ parent.phone || '-' }}</td>
              <td>{{ parent.education || '-' }}</td>
              <td>{{ parent.job || '-' }}</td>
            </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  </div>
</template>
