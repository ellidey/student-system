<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Students',
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
            <button class="button is-primary">Редактировать</button>
            <button class="button is-danger">Удалить</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
</style>
