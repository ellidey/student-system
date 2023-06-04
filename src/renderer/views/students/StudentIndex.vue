<script>
import Vue from 'vue'
import Popper from 'vue-popperjs';
import { mapGetters, mapMutations } from "vuex";

export default Vue.extend({
  name: 'Students',
  components: { Popper },
  computed: {
    ...mapGetters(['getStudents']),
  },
  data: function () {
    return {

    }
  },
  methods: {
    ...mapMutations(['deleteStudent']),
  }
});

</script>

<template>
  <div>
    <div class="box">
      <router-link tag="button" to="/students/add" class="button is-primary mb-4">
        Добавить
      </router-link>

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
          <th>Группа</th>
          <th>Родитель</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="student in getStudents" :key="student.id">
          <td>{{ student.name }}</td>
          <td>{{ student.age }}</td>
          <td>{{ $store.getters.getGroup(student.group_id)?.name || 'Неизвестно' }}</td>
          <td>{{ student.parent }}</td>
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
  </div>
</template>
