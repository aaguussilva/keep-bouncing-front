import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

// Importar vistas
import AuthView from '../views/modules/auth/AuthView.vue'
import HomeView from '../views/modules/home/HomeView.vue'
import ProfileView from '../views/modules/profile/ProfileView.vue'
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
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: { requiresAuth: true },
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

  // If we're already going to auth, don't check token
  if (to.path === '/auth') {
    // If user is authenticated and trying to access auth, redirect to home
    if (isAuthenticated) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        const exp = payload.exp * 1000
        const now = Date.now()
        
        if (now < exp) {  // Only redirect if token is still valid
          return next('/home')
        }
      } catch (error) {
        console.error('Token inválido', error)
        localStorage.removeItem('access_token')
      }
    }
    return next()
  }

  // Check token validity for authenticated routes
  if (isAuthenticated) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const exp = payload.exp * 1000
      const now = Date.now()

      if (now >= exp) {
        console.warn('Token expirado')
        localStorage.removeItem('access_token')
        return next('/auth')
      }
    } catch (error) {
      console.error('Token inválido', error)
      localStorage.removeItem('access_token')
      return next('/auth')
    }
  }

  // Protected routes
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/auth')
  }

  // Guest routes
  if (to.meta.requiresGuest && isAuthenticated) {
    return next('/home')
  }

  next()
})

export default router
