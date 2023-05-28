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
               :events="events"
      />
    </div>
</template>

<script>
import Vue from 'vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/locale/ru';

export default Vue.extend({
  name: 'Schedule',
  components: { VueCal, DatePicker },
  data: function () {
    return {
      activeView: 'day',
      selectedDate: new Date(),
      events: [
        {
          start: '2023-05-22',
          end: '2023-05-22',
          title: 'Пара по праву',
          content: 'Группа ИСиП-19',
          class: 'leisure'
        },
        {
          start: '2023-05-22',
          end: '2023-05-22',
          title: 'Пара по географии',
          content: 'Группа ИСиП-22',
          class: 'leisure'
        },
        {
          start: '2023-05-23',
          end: '2023-05-23',
          title: 'Пара по чему-то',
          content: 'Группа ИСиП-10',
          class: 'leisure'
        },
      ]
    }
  },
  methods: {
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
