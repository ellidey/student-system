<script>
import Vue from 'vue'
import { mapMutations } from "vuex";

export default Vue.extend({
  name: 'StudentAdd',
  data: function () {
    return {
      student: {},
      errors: {}
    }
  },
  mounted() {
   this.student = this.$store.getters.getStudent(this.$route.params.id);
  },
  methods: {
    ...mapMutations(['addStudent']),
    save() {
      this.errors = {};
      if (!this.student.name) {
        this.errors.name = 'Введите имя';
      }
      if (!this.student.age) {
        this.errors.age = 'Введите возрост';
      }
      if (!this.student.group_id) {
        this.errors.group_id = 'Введите группу';
      }
      if (!this.student.parent) {
        this.errors.parent = 'Введите ФИО родителя студента';
      }

      if (this.errors.length > 0) {
        return;
      }

      this.addStudent(this.student);
      this.$router.push('/students');
    }
  }
});
</script>

<template>
  <div>
    <div class="box">
      <div class="mb-5">
        <label class="label">ФИО</label>
        <input class="input" type="text" placeholder="Введите ФИО студента" v-model="student.name">
        <p class="help is-danger" v-if="errors.name">{{ errors.name }}</p>
      </div>

      <div class="mb-5">
        <label class="label">Возраст</label>
        <input class="input" type="number" placeholder="Введите возраст студента" v-model="student.age">
        <p class="help is-danger" v-if="errors.age">{{ errors.age }}</p>
      </div>

      <div class="mb-5">
        <label class="label">Группа</label>
        <input class="input" type="text" placeholder="Введите группу студента" v-model="student.group_id">
        <p class="help is-danger" v-if="errors.group_id">{{ errors.group_id }}</p>
      </div>

      <div class="mb-5">
        <label class="label">Родитель</label>
        <input class="input" type="text" placeholder="Введите ФИО родителя студента" v-model="student.parent">
        <p class="help is-danger" v-if="errors.parent">{{ errors.parent }}</p>
      </div>

      <button class="button is-success" @click="save">Сохранить</button>
      <router-link tag="button" to="/students" class="button is-danger">Отмена</router-link>
    </div>
  </div>
</template>

<style>

</style>
