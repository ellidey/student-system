<script>
import Vue from 'vue'
import Popper from 'vue-popperjs';
import { mapGetters, mapMutations } from "vuex";

export default Vue.extend({
  name: 'GroupIndex',
  components: { Popper },
  computed: {
    ...mapGetters(['getGroups']),
  },
  data: function () {
    return {

    }
  },
  methods: {
    ...mapMutations(['deleteGroup']),
  }
});

</script>

<template>
  <div>
    <h1>Список групп</h1>
    <div class="box">
      <router-link tag="button" to="/groups/add" class="button is-primary mb-4">
        Добавить
      </router-link>

      <article class="message is-success mt-4" v-if="getGroups.length === 0">
        <div class="message-body">
          <b>Группы не найдены</b><br>
          Пожалуйста, добавьте группы в систему
        </div>
      </article>

      <table class="table is-fullwidth" v-else>
        <thead>
        <tr>
          <th>Название</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="group in getGroups" :key="group.id">
          <td>{{ group.name }}</td>
          <td>
            <popper
              trigger="clickToOpen"
              :options="{
                placement: 'bottom',
                modifiers: { offset: { offset: '0,5px' } }
              }">
              <div class="popper">
                <router-link tag="button" :to="`/groups/${group.id}/edit`">
                  <i class="ri-pencil-line"></i>
                  Редактировать
                </router-link>

                <button @click="deleteGroup(group.id)">
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
