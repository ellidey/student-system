<template>
  <div class="box">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Пакет</th>
          <th>Версия</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Платформа</td>
          <td>{{ platform }}</td>
        </tr>
        <tr v-for="lib in Object.keys(versions)" :key="lib">
          <td>{{ lib }}</td>
          <td>{{ versions[lib] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      versions: process.versions,
      platform: require('os').platform(),
    }
  },

  created() {},
})
</script>

<style></style>
