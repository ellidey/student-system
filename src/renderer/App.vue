<template>
  <div id="app" class="container-fluid is-flex">
    <Menu />
    <div class="content">

      <Transition mode="out-in" name="slide-up">
        <!-- <keep-alive> -->
        <RouterView />
        <!-- </keep-alive> -->
      </Transition>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Menu from './components/Menu'

export default Vue.extend({
  name: 'ImageParsing',
  components: { Menu }
})
</script>

<style lang="scss">
.content {
  padding: 20px 30px !important;
  width: 100%;
}
</style>
