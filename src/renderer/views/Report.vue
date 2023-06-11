<script>
import Vue from 'vue'
import DatePicker from 'vue2-datepicker';
import {mapGetters} from "vuex";
import xlsx from "json-as-xlsx"

export default Vue.extend({
  components: { DatePicker },
  computed: {
    ...mapGetters(['getGroups', 'getStudents', 'getSkips']),
  },
  data() {
    return {
      date: null,
      group_id: null,
      errors: {},
    }
  },
  methods: {
    saveByteArray(reportName, byte) {
      const url = window.URL.createObjectURL(new Blob([byte]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', reportName + '.xlsx'); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    exportExcel() {
      this.errors = {};

      if (!this.group_id) {
        this.errors.group_id = 'Укажите группу';
      }

      if (!this.date) {
        this.errors.date = 'Укажите период';
      }

      if (Object.keys(this.errors).length > 0) {
        return;
      }


      const content = [];
      const skips = this.getSkipsByDate(this.date);


      this.getStudentsByGroup(this.group_id).forEach((student, index) => {
        const row = {
          number: index + 1,
          student: student.name,
        };

        skips.forEach(skip => {
          if (skip[student.id]) {
            for (const key in skip[student.id]) {
              const status = skip[student.id][key]?.status || 0;
              if (status == 2) {
                row.b_skips = (row.b_skips || 0) + 1;
              } else if (status == 3) {
                row.skips = (row.skips || 0) + 1;
              } else if (status == 4) {
                row.bad_skips = (row.bad_skips || 0) + 1;
              }
            }
          }
        })

        content.push(row);
      });


      const data = [
        {
          sheet: "Adults",
          columns: [
            { label: "N п/п", value: "number" },
            { label: "ФИО студента", value: "student" },
            { label: "Кол-во пропусков всего", value: "total_skips" },
            { label: "По болезни", value: "b_skips" },
            { label: "С уважительной причиной", value: "skips" },
            { label: "Без уважительной причины", value: "bad_skips" },
          ],
          content: content,
        }];

      let settings = {
        writeOptions: {
          type: "buffer",
          bookType: "xlsx",
        },
      }

      console.log(data);
      const result = xlsx(data, settings);
      this.saveByteArray('test', result);
    },
    getStudentsByGroup(group_id) {
      return this.getStudents.filter(student => {
        return student.group_id === group_id;
      });
    },
    getSkipsByDate(date) {
      const result = [];
      const dateStart = date[0].getTime();
      const dateEnd = date[1].getTime();

      for (const key in this.getSkips) {
        const parts = key.split(".");
        const timestamp = new Date(parseInt(parts[2], 10),
          parseInt(parts[1], 10) - 1,
          parseInt(parts[0], 10));


        // console.log(dateStart, dateEnd, timestamp);
        if (timestamp > dateEnd || timestamp < dateStart) {
          continue;
        }

        result.push(this.getSkips[key]);
      }

      return result;
    }
  }
})
</script>

<template>
  <div>
    <h1>Отчет</h1>
    <label class="label">Выберите период</label>

    <div class="is-flex" style="gap: 5px;">
      <div>
        <select class="select" v-model="group_id">
          <option v-for="group in getGroups" :key="group.id" :value="group.id">{{ group.name }}</option>
        </select>
        <p class="help is-danger" v-if="errors.group_id">{{ errors.group_id }}</p>
      </div>

      <div>
        <date-picker
          v-model="date"
          format="DD.MM.YYYY"
          value-type="date"
          range
        />
        <p class="help is-danger" v-if="errors.date">{{ errors.date }}</p>
      </div>
    </div>

    <button class="button is-primary is-block mt-2" @click="exportExcel">Сформировать</button>
  </div>
</template>

<style>

</style>
