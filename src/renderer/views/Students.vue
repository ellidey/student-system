<script>
import Vue from 'vue'
import Popper from 'vue-popperjs';

export default Vue.extend({
  name: 'Students',
  components: { Popper },
  data: function () {
    return {
      students: [
        {
          name: 'Вася Пупкин',
          id: 1,
          group: 'ИСиП-19',
          parent: 'Василиса Пупкина',
          age: '18'
        },{
          name: 'Вася Пупкин',
          id: 2,
          group: 'ИСиП-19',
          parent: 'Василиса Пупкина',
          age: '18'
        },{
          name: 'Вася Пупкин',
          id: 3,
          group: 'ИСиП-19',
          parent: 'Василиса Пупкина',
          age: '18'
        },{
          name: 'Вася Пупкин',
          id: 4,
          group: 'ИСиП-19',
          parent: 'Василиса Пупкина',
          age: '18'
        },{
          name: 'Вася Пупкин',
          id: 5,
          group: 'ИСиП-19',
          parent: 'Василиса Пупкина',
          age: '18'
        },{
          name: 'Вася Пупкин',
          id: 6,
          group: 'ИСиП-19',
          parent: 'Василиса Пупкина',
          age: '18'
        },{
          name: 'Вася Пупкин',
          id: 7,
          group: 'ИСиП-19',
          parent: 'Василиса Пупкина',
          age: '18'
        }
      ]
    }
  }
});

</script>

<template>
  <div>
    <div class="box">
      <button class="button is-primary mb-4">Добавить</button>
      <table class="table is-fullwidth">
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
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.name }}</td>
          <td>{{ student.age }}</td>
          <td>{{ student.group }}</td>
          <td>{{ student.parent }}</td>
          <td>
            <popper
              trigger="focus"
              :options="{
                placement: 'bottom',
                modifiers: { offset: { offset: '0,5px' } }
              }">
              <div class="popper">
                <button>
                  <i class="ri-pencil-line"></i>
                  Редактировать
                </button>

                <button>
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
