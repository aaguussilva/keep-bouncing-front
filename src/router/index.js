import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

// Importar vistas
import AuthView from '../views/modules/auth/AuthView.vue'
import HomeView from '../views/modules/home/HomeView.vue'
import EditProfileView from '../views/modules/profile/EditProfileView.vue'
import RegisterPegueView from '../views/modules/pegue/RegisterPegueView.vue'

const routes = [
  {
    path: '/',
    redirect: '/auth',
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView,
    meta: { requiresGuest: true } // sólo accesible sin login
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true }, // 🔒 necesita login
  },
  {
    path: '/profile/edit',
    name: 'EditProfile',
    component: EditProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: '/pegue/register',
    name: 'RegisterPegue',
    component: RegisterPegueView,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token')
  const isAuthenticated = !!token

  // Verificar si el token sigue siendo válido (opcional)
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])) // decodifica el payload del JWT
      const exp = payload.exp * 1000 // tiempo en milisegundos
      const now = Date.now()

      if (now >= exp) {
        console.warn('Token expirado')
        localStorage.removeItem('token')
        return next('/auth')
      }
    } catch (error) {
      console.error('Token inválido', error)
      localStorage.removeItem('token')
      return next('/auth')
    }
  }

  // Rutas protegidas: requieren login
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/auth')
  }

  // Rutas para invitados: si ya está logueado, lo mando a home
  if (to.meta.requiresGuest && isAuthenticated) {
    return next('/home')
  }

  next()
})

export default router
