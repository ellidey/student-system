import Vue from 'vue'
import Router from 'vue-router'
import About from '../views/About.vue'
import Help from '../views/Help.vue'
import Home from '../views/Schedule.vue'
import StudentIndex from '../views/students/StudentIndex.vue'
import StudentAdd from '../views/students/StudentAdd.vue'
import StudentEdit from '../views/students/StudentEdit.vue'

import GroupIndex from '../views/groups/GroupIndex.vue'
import GroupAdd from '../views/groups/GroupAdd.vue'
import GroupEdit from '../views/groups/GroupEdit.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/schedule',
    },
    {
      path: '/schedule',
      meta: {
        title: 'Расписание',
        icon: 'fa-home',
      },
      component: Home,
    },
    {
      path: '/students',
      meta: {
        title: 'Студенты',
        icon: 'fa-home',
      },
      component: StudentIndex,
    },
    {
      path: '/students/add',
      meta: {
        title: 'Добавление студентов',
        icon: 'fa-home',
      },
      component: StudentAdd,
    },
    {
      path: '/students/:id/edit',
      meta: {
        title: 'Редактирование студента',
        icon: 'fa-home',
      },
      component: StudentEdit,
    },
    {
      path: '/groups',
      meta: {
        title: 'Группы',
        icon: 'fa-home',
      },
      component: GroupIndex,
    },
    {
      path: '/groups/add',
      meta: {
        title: 'Добавление студентов',
        icon: 'fa-home',
      },
      component: GroupAdd,
    },
    {
      path: '/groups/:id/edit',
      meta: {
        title: 'Редактирование студента',
        icon: 'fa-home',
      },
      component: GroupEdit,
    },
    {
      path: '/about',
      meta: {
        title: 'О программе',
        icon: 'fa-info-circle',
      },
      component: About,
    },
    {
      path: '/help',
      meta: {
        title: 'Информация',
        icon: 'fa-info-circle',
      },
      component: Help,
    },
    {
      path: '*',
      redirect: '/schedule',
    },
  ],
})

// dynamically set application title to current view
router.afterEach((to) => {
  let title =
    to.path === '/home'
      ? process.env.PRODUCT_NAME
      : `${to.meta.title} - ${process.env.PRODUCT_NAME}`

  if (!title) {
    title = 'Home'
  }

  document.title = title
})

export default router
