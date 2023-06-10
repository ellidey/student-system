<template>
  <div style="height: 85vh">
    <h1>Расписание занятий</h1>
    <div class="schedule">
      <date-picker
        v-model="selectedDate"
        class="schedule__datepicker"
        format="DD.MM.YYYY"
        value-type="date"
        @input="$refs.cal.switchView('day')"
      />
      <button class="schedule__today button" @click="$refs.cal.switchView('day', new Date())">Сегодня</button>

      <vue-cal :disable-views="['years', 'week']"
               class="schedule__dates"
               ref="cal"
               :selected-date="selectedDate"
               :time="false"
               active-view="year" locale="ru"
               :events="getEvents"
      >
        <template #event="{ event, view }">
          <div class="my-4" style="text-align: center">
            <div>
              <select class="schedule__group-select" v-model="group_id" style="height: 35px;">
                <option selected disabled value="">Выберите группу</option>
                <option v-for="group in getGroupsByDate(event.start)" :key="group.id" :value="group.id">
                  {{ group.name }}
                </option>
              </select>
            </div>
          </div>

          <article class="message is-success mt-4" v-if="!group_id">
            <div class="message-body">
              <b>Студенты не найдены</b><br>
              Выберите группу
            </div>
          </article>

          <article class="message is-success mt-4" v-else-if="getStudentsByGroup().length === 0">
            <div class="message-body">
              <b>Студенты не найдены</b><br>
              У этой группы нет студентов
            </div>
          </article>

          <table class="table is-fullwidth mt-4" v-else>
            <thead>
            <tr>
              <th>Студент</th>
              <th v-for="couple in getCouplesByDate(event.start)" :key="couple.id">
                {{ couple.name }}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="student in getStudentsByGroup()" :key="student.student_id">
              <td>{{ student.name ?? 'Неизвестно' }}</td>
              <td v-for="couple in getCouplesByDate(event.start)" :key="couple.id">
                <div style="display: flex; gap: 3px;">
                  <select @change="updateSkipStatus(event.start, student, couple, $event)"
                          class="schedule__select-form"
                  >
                    <option value="1">-</option>
                    <option :selected="isSkipStatus(event.start, student, couple, '2')" value="2">Б</option>
                    <option :selected="isSkipStatus(event.start, student, couple, '3')" value="3">У</option>
                    <option :selected="isSkipStatus(event.start, student, couple, '4')" value="4">НБ</option>
                  </select>

                  <div v-if="getSkipFile(event.start, student, couple)">
                    <button class="button is_small is-success"
                            @click="openImage(event.start, student, couple)"
                            style="
                                height: 23px;
                                min-width: auto;
                                max-width: 20px;
                                padding: 0 12px;
                            "
                    >
                      <i class="ri-eye-2-fill"></i>
                    </button>
                  </div>

                  <div class="file is-small" v-else>
                    <label class="file-label">
                      <input class="file-input"
                             type="file" accept="image/*"
                             @change="updateSkipFile(event.start, student, couple, $event)"
                      >
                      <span class="file-cta">
                      <span class="">
                        <i class="ri-file-upload-fill"></i>
                      </span>
                    </span>
                    </label>
                  </div>
                </div>
              </td>
<!--              <td>-->
<!--                <button v-if="student.file" @click="image = student.file" class="button is-small is-primary">-->
<!--                      <span class="icon is-small">-->
<!--                        <i class="ri-eye-2-fill"></i>-->
<!--                      </span>-->
<!--                </button>-->
<!--              </td>-->
            </tr>
            </tbody>
          </table>
        </template>
      </vue-cal>

      <div class="modal" :class="{ 'is-active': !!selectSkip }">
        <div class="modal-background"></div>
        <div class="modal-content">
          <img :src="selectSkip?.file" alt="">
        </div>
        <button class="modal-close is-large" aria-label="close" @click="selectSkip = null"></button>
        <button class="button mt-4 is-danger" @click="delete selectSkip.file; updateSkips(skips); selectSkip = null">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/locale/ru';
import {mapGetters, mapMutations} from "vuex";
import GroupAdd from "./groups/GroupAdd.vue";

export default Vue.extend({
  name: 'Schedule',
  components: { GroupAdd, VueCal, DatePicker },
  computed: {
    ...mapGetters(['getGroup', 'getStudent', 'getCouples', 'getGroups', 'getStudents', 'getSkips']),
    getEvents() {
      const events = [];
      const dates = [];
      this.getCouples.forEach(couple => {
        try {
          const date = new Date(couple.date);
          const key = date.toLocaleDateString('ru-RU');

          if (dates.includes(key)) {
            return;
          }

          events.push({
            'start': date,
            'end': date,
            'title': couple.name,
            'couple': couple,
            class: 'leisure'
          });

          dates.push(key);
        } catch (error) {
          console.log(error);
        }
      });
      return events;
    }
  },
  data: function () {
    return {
      activeView: 'day',
      selectedDate: new Date(),
      selectSkip: null,
      group_id: null,
      skips: {},
    }
  },
  mounted() {
    this.skips = { ...this.getSkips };
  },
  methods: {
    ...mapMutations(['deleteCouple', 'updateSkips']),
    getStudentsByGroup() {
      const result = [];
      return this.getStudents.filter(std => {
        return std.group_id === this.group_id;
      });
    },
    getGroupsByDate(date) {
      const key = new Date(date).toLocaleDateString('ru-RU');
      const groups = [];
      this.getCouples.filter(couple => {
        if (new Date(couple.date).toLocaleDateString('ru-RU') === key) {
          const group = this.getGroup(couple.group_id);
          if (!groups.includes(group)) {
            groups.push(group);
          }
        }
      });

      return groups;
    },
    getCouplesByDate(date) {
      const key = new Date(date).toLocaleDateString('ru-RU');
      return this.getCouples.filter(couple => {
        return new Date(couple.date).toLocaleDateString('ru-RU') === key &&
          couple.group_id === this.group_id;
      });
    },
    updateSkipStatus(date, student, couple, event) {
      const key = new Date(date).toLocaleDateString('ru-RU');
      if (!this.skips[key]) {
        this.skips[key] = {};
      }

      if (!this.skips[key][student.id]) {
        this.skips[key][student.id] = {};
      }

      if (!this.skips[key][student.id][couple.id]) {
        this.skips[key][student.id][couple.id] = {};
      }

      this.skips[key][student.id][couple.id].status = event.target.options[event.target.selectedIndex].value;
      this.updateSkips(this.skips);
    },
    updateSkipFile(date, student, couple, event) {
      const files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        return;
      }

      const key = new Date(date).toLocaleDateString('ru-RU');
      if (!this.skips[key]) {
        this.skips[key] = {};
      }

      if (!this.skips[key][student.id]) {
        this.skips[key][student.id] = {};
      }

      if (!this.skips[key][student.id][couple.id]) {
        this.skips[key][student.id][couple.id] = {};
      }

      this.createImage(files[0], this.skips[key][student.id][couple.id]);
    },
    createImage(file, skip) {
      const reader = new FileReader();

      reader.onload = (e) => {
        skip.file = e.target.result;
        this.updateSkips(this.skips);
        this.$forceUpdate();
      };

      reader.readAsDataURL(file);
    },
    isSkipStatus(date, student, couple, status) {
      const key = new Date(date).toLocaleDateString('ru-RU');
      if (!this.skips[key] || !this.skips[key][student.id] || !this.skips[key][student.id][couple.id]) {
        return false;
      }

      if (this.skips[key][student.id][couple.id].status === status) {
        return true;
      }

      return false;
    },
    getSkipFile(date, student, couple) {
      const key = new Date(date).toLocaleDateString('ru-RU');
      if (!this.skips[key] || !this.skips[key][student.id]
        || !this.skips[key][student.id][couple.id] || !this.skips[key][student.id][couple.id].file) {
        return false;
      }

      return this.skips[key][student.id][couple.id].file;
    },
    openImage(date, student, couple) {
      const key = new Date(date).toLocaleDateString('ru-RU');
      if (!this.skips[key] || !this.skips[key][student.id]
        || !this.skips[key][student.id][couple.id] || !this.skips[key][student.id][couple.id].file) {
        return false;
      }

      this.selectSkip = this.skips[key][student.id][couple.id];
    }
  }
})
</script>

<style>
.vuecal__menu, .vuecal__cell-events-count {background-color: #42afb9;}
.vuecal__title-bar {background-color: #e4f5ef;}
.vuecal__cell--today, .vuecal__cell--current {background-color: rgba(240, 240, 255, 0.4);}
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {background-color: rgba(235, 255, 245, 0.4);}
.vuecal__cell--selected:before {border-color: rgba(66, 185, 167, 0.5);}
/* Cells and buttons get highlighted when an event is dragged over it. */
.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {background-color: rgba(195, 255, 228, 0.5);}
.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {background-color: rgba(136, 236, 228, 0.25);}
.vuecal__event {
  font-size: 14px !important;
  line-height: 15px !important;
  padding: 10px;
  border: 1px solid rgba(66, 175, 185, 0.8);
  background-color: rgba(66, 175, 185, 0.5);
}
.vuecal__event-content {
  font-size: 12px;
}
</style>
