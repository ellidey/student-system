<script>
import Vue from 'vue'
import { mapMutations } from "vuex";

export default Vue.extend({
  name: 'GroupEdit',
  data: function () {
    return {
      group: {},
      errors: {}
    }
  },
  mounted() {
   this.group = { ...this.$store.getters.getGroup(this.$route.params.id) ?? {} };
  },
  methods: {
    ...mapMutations(['updateGroup']),
    save() {
      this.errors = {};
      if (!this.group.name) {
        this.errors.name = 'Введите имя';
      }

      if (Object.keys(this.errors).length > 0) {
        return;
      }

      this.updateGroup(this.group);
      this.$router.push('/groups');
    }
  }
});
</script>

<template>
  <div>
    <div class="box">
      <div class="mb-5">
        <label class="label">Название</label>
        <input class="input" type="text" placeholder="Введите название группы" v-model="group.name">
        <p class="help is-danger" v-if="errors.name">{{ errors.name }}</p>
      </div>

      <button class="button is-success" @click="save">Сохранить</button>
      <router-link tag="button" to="/groups" class="button is-danger">Отмена</router-link>
    </div>
  </div>
</template>

<style>

</style>
