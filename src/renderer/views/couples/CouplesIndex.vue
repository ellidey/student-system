<script>
import Vue from 'vue'
import Popper from 'vue-popperjs';
import { mapGetters, mapMutations } from "vuex";

export default Vue.extend({
  name: 'CouplesIndex',
  components: { Popper },
  computed: {
    ...mapGetters(['getCouples']),
  },
  data: function () {
    return {

    }
  },
  methods: {
    ...mapMutations(['deleteCouple']),
    formatDate(date) {
      try {
        return new Date(date)?.toLocaleDateString('ru-RU');
      } catch (error) {
        return error.message;
      }
    }
  }
});

</script>

<template>
  <div>
    <div class="box">
      <router-link tag="button" to="/couples/add" class="button is-primary mb-4">
        Добавить
      </router-link>

      <article class="message is-success mt-4" v-if="getCouples.length === 0">
        <div class="message-body">
          <b>Группы не найдены</b><br>
          Пожалуйста, добавьте пары в систему
        </div>
      </article>

      <table class="table is-fullwidth" v-else>
        <thead>
        <tr>
          <th>Название</th>
          <th>Группа</th>
          <th>Дата</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="couple in getCouples" :key="couple.id">
          <td>{{ couple.name }}</td>
          <td>{{ $store.getters.getGroup(couple.group_id)?.name || 'Неизвестно' }}</td>
          <td>{{ formatDate(couple.date)}}</td>
          <td>
            <popper
              trigger="clickToOpen"
              :options="{
                placement: 'bottom',
                modifiers: { offset: { offset: '0,5px' } }
              }">
              <div class="popper">
                <router-link tag="button" :to="`/couples/${couple.id}/edit`">
                  <i class="ri-pencil-line"></i>
                  Редактировать
                </router-link>

                <button @click="deleteCouple(couple.id)">
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
