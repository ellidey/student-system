<template>
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
              <h2>{{ event.title }}</h2>
            </div>
          <div class="columns m-2">
            <router-link tag="button"
                         :to="`/couples/${event.couple.id}/edit`"
                         class="button is-success is-small">
              <i class="ri-edit-2-fill"></i>
            </router-link>
            <button tag="button"
                         @click="deleteCouple(event.couple.id)"
                         class="button is-danger is-small ml-2">
              <i class="ri-delete-bin-2-fill"></i>
            </button>
          </div>

          <article class="message is-success mt-4" v-if="event.couple.students.length === 0">
            <div class="message-body">
              <b>Студенты не найдены</b><br>
              Похоже, все были на паре
            </div>
          </article>

          <table class="table is-fullwidth mt-4" v-else>
            <thead>
              <tr>
                <th>Студент</th>
                <th>причина пропуска</th>
                <th>Группа</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="student in event.couple.students" :key="student.student_id">
                <td>{{ getStudent(student.student_id)?.name ?? 'Неизвестно' }}</td>
                <td>{{ student.reason }}</td>
                <td>{{ getGroup(event.couple.group_id)?.name ?? 'Неизвестно' }}</td>
                <td>
                  <button v-if="student.file" @click="image = student.file" class="button is-small is-primary">
                      <span class="icon is-small">
                        <i class="ri-eye-2-fill"></i>
                      </span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </vue-cal>

      <div class="modal" :class="{ 'is-active': !!image }">
        <div class="modal-background"></div>
        <div class="modal-content">
          <p class="image is-4by3">
            <img :src="image" alt="">
          </p>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="image = null"></button>
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

export default Vue.extend({
  name: 'Schedule',
  components: { VueCal, DatePicker },
  computed: {
    ...mapGetters(['getGroup', 'getStudent', 'getCouples']),
    getEvents() {
      const events = [];
      this.getCouples.forEach(couple => {
        try {
          events.push({
            'start': new Date(couple.date),
            'end': new Date(couple.date),
            'title': couple.name,
            'couple': couple,
            class: 'leisure'
          });
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
      image: null,
    }
  },
  methods: {
    ...mapMutations(['deleteCouple']),
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
