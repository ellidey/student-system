<template>
  <div class="section">
    <h1 class="title is-4">About</h1>
    <div class="box">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <div>
              <h2 class="subtitle is-5 mb-1">Программа разработана:</h2>
              N4D - Толя Сидельцев
              <br />
            </div>
          </div>
        </div>
      </article>
    </div>

    <h2 class="subtitle is-4">Системная информация</h2>
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
