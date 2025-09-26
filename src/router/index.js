import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

// Importar vistas
import AuthView from '../views/modules/auth/AuthView.vue'
import DashboardView from '../views/modules/dashboard/DashboardView.vue'

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
      // Si ya está autenticado, redirigir al dashboard
      if (store.getters['auth/isAuthenticated']) {
        next('/dashboard')
      } else {
        next()
      }
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
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
