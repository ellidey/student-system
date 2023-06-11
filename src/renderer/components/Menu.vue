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

<template>
  <aside class="menu">
    <p class="menu-label">
      Меню
    </p>
    <ul class="menu-list">
      <li>
        <router-link to="/schedule" :class="{ 'is-active': $route.path === '/schedule' }">
          Расписание
        </router-link>
      </li>
      <li>
        <router-link to="/students" :class="{ 'is-active': $route.path === '/students' }">
          Студенты
        </router-link>
      </li>
      <li>
        <router-link to="/groups" :class="{ 'is-active': $route.path === '/groups' }">
          Группы
        </router-link>
      </li>
      <li>
        <router-link to="/couples" :class="{ 'is-active': $route.path === '/couples' }">
          Пары
        </router-link>
      </li>
      <li>
        <router-link to="/export" :class="{ 'is-active': $route.path === '/export' }">
          Отчет
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
  .menu {
    padding: 20px 0 !important;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.01);
    min-width: 220px;
  }
</style>
