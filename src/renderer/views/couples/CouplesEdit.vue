<script>
import Vue from 'vue'
import {mapGetters, mapMutations} from "vuex";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/locale/ru';

export default Vue.extend({
  name: 'CouplesEdit',
  components: { DatePicker },
  data: function () {
    return {
      couple: { },
      errors: { }
    }
  },
  mounted() {
    this.couple = { ...this.$store.getters.getCouple(this.$route.params.id) ?? {} };
  },
  computed: {
    ...mapGetters(['getGroups', 'getStudents']),
    filteredStudents() {
      return this.getStudents.filter(student => {
        return student.group_id === this.couple.group_id
      });
    }
  },
  methods: {
    ...mapMutations(['updateCouple']),
    save() {
      this.errors = { };

      if (!this.couple.name) {
        this.errors.name = 'Введите название пары';
      }

      if (!this.couple.date) {
        this.errors.date = 'Введите дату';
      }

      if (!this.couple.group_id) {
        this.errors.group = 'Выберите группу';
      }

      // this.couple.students.forEach((student, index) => {
      //   const studentErrors = {};
      //   if (!student.student_id) {
      //     studentErrors.student_id = 'Выберите студента';
      //   }
      //
      //   if (!student.reason) {
      //     studentErrors.reason = 'Укажите причину пропуска';
      //   }
      //
      //   if (Object.keys(studentErrors).length > 0) {
      //     this.errors.students[index] = studentErrors;
      //   }
      // });
      //
      // if (Object.keys(this.errors).length > 1 || Object.keys(this.errors.students).length > 0) {
      //   return;
      // }

      if (Object.keys(this.errors).length > 0) {
        return;
      }

        this.updateCouple(this.couple);
      this.$router.push('/couples');
    },
    onFileChange(e, student) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;

      this.createImage(files[0], student);
    },
    createImage(file, student) {
      const reader = new FileReader();

      reader.onload = (e) => {
        student.file = e.target.result;
        this.$forceUpdate();
      };

      reader.readAsDataURL(file);
    },
  }
});
</script>

<template>
  <div>
    <div class="box">
      <div class="columns">
        <div class="column">
          <label class="label">Название</label>
          <input class="input" type="text" placeholder="Введите название пары" v-model="couple.name">
          <p class="help is-danger" v-if="errors.name">{{ errors.name }}</p>
        </div>

        <div class="column">
          <label class="label">Группа</label>
          <div class="select is-small" style="width: 100%">
            <select v-model="couple.group_id" style="height: 35px;">
              <option selected disabled value="">Выберите группу</option>
              <option v-for="group in getGroups" :key="group.id" :value="group.id">
                {{ group.name }}
              </option>
            </select>
            <p class="help is-danger" v-if="errors.group">{{ errors.group }}</p>
          </div>
        </div>

        <div class="column">
          <label class="label">Дата</label>
          <date-picker
            v-model="couple.date"
            style="width: 100%"
            format="DD.MM.YYYY"
            placeholder="Введите дату"
            value-type="date"
          />
          <p class="help is-danger" v-if="errors.date">{{ errors.date }}</p>
        </div>
      </div>

<!--      <div class="mb-5">-->
<!--        <span style="font-weight: bold">Студенты</span>-->
<!--        <div class="columns mt-3" v-for="(student, index) in couple.students" :key="index">-->
<!--          <div class="column">-->
<!--            <label class="label">Студент</label>-->
<!--            <div class="select is-small" style="width: 100%">-->
<!--              <select v-model="student.student_id" style="height: 35px;">-->
<!--                <option selected disabled value="">Выберите студента</option>-->
<!--                <option v-for="std in filteredStudents" :key="std.id" :value="std.id">-->
<!--                  {{ std.name }}-->
<!--                </option>-->
<!--              </select>-->
<!--            </div>-->
<!--            <p class="help is-danger"-->
<!--               v-if="errors.students[index]?.student_id">-->
<!--              {{ errors.students[index]?.student_id }}-->
<!--            </p>-->
<!--          </div>-->

<!--          <div class="column">-->
<!--            <label class="label">Причина пропуска</label>-->
<!--            <input class="input" type="text" placeholder="Введите причину пропуска" v-model="student.reason">-->
<!--            <p class="help is-danger"-->
<!--               v-if="errors.students[index]?.reason">-->
<!--              {{ errors.students[index]?.reason }}-->
<!--            </p>-->
<!--          </div>-->

<!--          <div class="column">-->
<!--            <template v-if="student.file">-->
<!--              <button class="button is-warning"-->
<!--                      style="margin-top: 27px; height: 35px; width: 100%;"-->
<!--                      @click="delete student.file; $forceUpdate()">Удалить файл</button>-->
<!--            </template>-->
<!--            <template v-else>-->
<!--              <label class="label">Подтверждение пропуска</label>-->
<!--              <div class="file is-fullwidth">-->
<!--                <label class="file-label is-fullwidth">-->
<!--                  <input class="file-input is-fullwidth" type="file" accept="image/*" @change="onFileChange($event, student)">-->
<!--                  <span class="file-cta" style="width: 100%;">-->
<!--                <span class="file-icon">-->
<!--                  <i class="fas fa-upload"></i>-->
<!--                </span>-->
<!--                <span class="file-label" style="justify-content: center">-->
<!--                  Выберите файл-->
<!--                </span>-->
<!--              </span>-->
<!--                </label>-->
<!--              </div>-->
<!--            </template>-->
<!--          </div>-->
<!--          <div>-->
<!--            <button class="button is-small is-danger"-->
<!--                    style="margin-top: 39px; height: 35px"-->
<!--                    @click="couple.students = couple.students.filter(std => {-->
<!--                       return std !== student;-->
<!--                    })">-->
<!--          <span class="icon is-small">-->
<!--            <i class="ri-delete-bin-2-fill"></i>-->
<!--          </span>-->
<!--            </button>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="mt-3">-->
<!--          <button class="button is-small" @click="couple.students.push({})">-->
<!--          <span class="icon is-small">-->
<!--            <i class="ri-add-fill"></i>-->
<!--          </span>-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->

      <button class="button is-success" @click="save">Сохранить</button>
      <router-link tag="button" to="/couples" class="button is-danger">Отмена</router-link>
    </div>
  </div>
</template>

<style>

</style>
