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
        <router-link to="/schedule">
          Пары
        </router-link>
      </li>
    </ul>
<!--    <ul class="menu-list">-->
<!--      <li><a>Team Settings</a></li>-->
<!--      <li>-->
<!--        <a class="is-active">Manage Your Team</a>-->
<!--        <ul>-->
<!--          <li><a>Members</a></li>-->
<!--          <li><a>Plugins</a></li>-->
<!--          <li><a>Add a member</a></li>-->
<!--        </ul>-->
<!--      </li>-->
<!--      <li><a>Invitations</a></li>-->
<!--      <li><a>Cloud Storage Environment Settings</a></li>-->
<!--      <li><a>Authentication</a></li>-->
<!--    </ul>-->
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
