import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

// Importar vistas
import AuthView from '../views/modules/auth/AuthView.vue'
import HomeView from '../views/modules/home/HomeView.vue'
import EditProfileView from '../views/modules/profile/EditProfileView.vue'

const routes = [
  {
    path: '/',
    redirect: '/auth',
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView,
    beforeEnter: (to, from, next) => {
      // Si ya está autenticado, redirigir al home
      if (store.getters['auth/isAuthenticated']) {
        next('/home')
      } else {
        next()
      }
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    beforeEnter: (to, from, next) => {
      // Si no está autenticado, redirigir al auth
      if (!store.getters['auth/isAuthenticated']) {
        next('/auth')
      } else {
        next()
      }
    },
  },
  {
    path: '/profile/edit',
    name: 'EditProfile',
    component: EditProfileView,
    beforeEnter: (to, from, next) => {
      // Si no está autenticado, redirigir al auth
      if (!store.getters['auth/isAuthenticated']) {
        next('/auth')
      } else {
        next()
      }
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
