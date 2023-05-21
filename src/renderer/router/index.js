import Vue from 'vue'
import Router from 'vue-router'
import About from '../views/About.vue'
import Help from '../views/Help.vue'
import Home from '../views/Schedule.vue'
import Students from '../views/Students.vue'

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
      component: Students,
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
