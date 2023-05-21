<template>
  <div class="section">
    <h1 class="title is-4">
      Информация
    </h1>
    <h2 class="subtitle is-6 mt-1">
      Тут будет располагаться информация о программе
    </h2>

    <h2 class="title is-5 mt-6 mb-0">
      Системные характеристики
    </h2>
    <SystemInformation />
    <br />
  </div>
</template>

<script>
import SystemInformation from '../components/SystemInformation.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'About',
  components: { SystemInformation },
})
</script>

<style>
.block.has-text-centered figure {
  margin: 0 auto;
}
</style>
