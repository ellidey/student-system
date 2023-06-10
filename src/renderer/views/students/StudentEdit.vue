<script>
import Vue from 'vue'
import {mapGetters, mapMutations} from "vuex";

export default Vue.extend({
  name: 'StudentAdd',
  data: function () {
    return {
      student: {
        parents: []
      },
      errors: {}
    }
  },
  computed: {
    ...mapGetters(['getGroups']),
  },
  mounted() {
   this.student = { ...this.$store.getters.getStudent(this.$route.params.id) ?? {} };
  },
  methods: {
    ...mapMutations(['updateStudent']),
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

      if (Object.keys(this.errors).length > 0) {
        return;
      }

      this.updateStudent(this.student);
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
        <label class="label">Паспорт</label>
        <input class="input" type="text" placeholder="Введите паспорт" v-model="student.passport">
        <p class="help is-danger" v-if="errors.passport">{{ errors.passport }}</p>
      </div>

      <div class="mb-5">
        <label class="label">Телефон</label>
        <input class="input" type="text" placeholder="Введите телефон" v-model="student.phone">
        <p class="help is-danger" v-if="errors.phone">{{ errors.phone }}</p>
      </div>

      <div class="mb-5">
        <label class="label">Дата рождения</label>
        <input class="input" type="text" placeholder="Введите дату рождения" v-model="student.date">
        <p class="help is-danger" v-if="errors.date">{{ errors.date }}</p>
      </div>

      <div class="mb-5">
        <label class="label">Снилс</label>
        <input class="input" type="text" placeholder="Введите Снилс" v-model="student.snils">
        <p class="help is-danger" v-if="errors.snils">{{ errors.snils }}</p>
      </div>

      <div class="mb-5">
        <label class="label">Пол</label>
        <div class="select is-small">
          <select v-model="student.gender">
            <option selected value="М">Мужской</option>
            <option selected value="Ж">Женский</option>
          </select>
        </div>
        <p class="help is-danger" v-if="errors.group_id">{{ errors.group_id }}</p>
      </div>

      <div class="mb-5">
        <label class="label">Учет</label>
        <input class="input" type="text" placeholder="Введите учет" v-model="student.data">
        <p class="help is-danger" v-if="errors.data">{{ errors.data }}</p>
      </div>

      <div class="mb-5">
        <label class="label">Место прописки</label>
        <input class="input" type="text" placeholder="Введите место прописки" v-model="student.place">
        <p class="help is-danger" v-if="errors.place">{{ errors.place }}</p>
      </div>

      <div class="mb-5">
        <label class="label">Место жительства</label>
        <input class="input" type="text" placeholder="Введите место жительства" v-model="student.place_live">
        <p class="help is-danger" v-if="errors.place_live">{{ errors.place_live }}</p>
      </div>

      <div class="mb-5">
        <label class="label">Группа</label>
        <div class="select is-small">
          <select v-model="student.group_id">
            <option disabled selected value="">Выберите группу</option>
            <option v-for="group in getGroups" :key="group.id" :value="group.id">
              {{ group.name }}
            </option>
          </select>
        </div>
        <p class="help is-danger" v-if="errors.group_id">{{ errors.group_id }}</p>
      </div>

      <h3>Родители</h3>

      <div class="mb-5" style="border: 1px solid rgba(0, 0, 0, 0.5); padding: 10px" v-for="(parent, index) in student.parents" :key="index">
        <div class="columns">
          <div class="column">
            <label class="label">Родитель</label>
            <div class="select is-fullwidth is-small" style="height: 35px">
              <select v-model="parent.type" style="height: 35px">
                <option selected value="1">Мама</option>
                <option value="2">Папа</option>
                <option value="3">Опекун</option>
              </select>
            </div>
          </div>
          <div class="column">
            <label class="label">Телефон</label>
            <input class="input" type="text" placeholder="Введите телефон" v-model="parent.phone">
          </div>
        </div>

        <div class="mb-5">
          <label class="label">ФИО</label>
          <input class="input" type="text" placeholder="Введите ФИО" v-model="parent.name">
        </div>

        <div class="mb-5">
          <label class="label">Образование</label>
          <input class="input" type="text" placeholder="Введите образование" v-model="parent.education">
        </div>

        <div class="mb-1">
          <label class="label">Место работы</label>
          <input class="input" type="text" placeholder="Введите место работы" v-model="parent.job">
        </div>

        <div style="text-align: right">
          <button class="button is-small is-danger"
                  style="height: 35px;"
                  @click="student.parents = student.parents.filter(pr => {
                 return pr !== parent;
              })"
          >
        <span class="icon is-small">
          <i class="ri-delete-bin-2-fill"></i>
        </span>
          </button>
        </div>
      </div>

      <div class="mb-3">
        <button class="button is-small" @click="student.parents.push({})">
      <span class="icon is-small">
        <i class="ri-add-fill"></i>
      </span>
        </button>
      </div>

      <button class="button is-success" @click="save">Сохранить</button>
      <router-link tag="button" to="/students" class="button is-danger">Отмена</router-link>
    </div>
  </div>
</template>

<style>

</style>
