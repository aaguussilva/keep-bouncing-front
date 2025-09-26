<template>
  <div class="retro-card dashboard-card">
    <div class="user-profile">
      <h2 class="retro-title user-name">¡Hola{{ user ? ', ' + user.name : '' }}! 👋</h2>
      <p class="retro-subtitle user-email">{{ user?.email || 'Cargando...' }}</p>
    </div>

    <div class="dashboard-content retro-card">
      <h3 class="content-title">🎮 Dashboard Retro</h3>
      <p class="retro-text">
        ¡Bienvenido a Keep Bouncing! Estás logueado correctamente en nuestra experiencia retro.
      </p>
    </div>

    <Button @click="handleLogout" variant="accent" full-width> Cerrar Sesión </Button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Button from '../../shared/Button.vue'

const store = useStore()
const router = useRouter()

const user = computed(() => store.getters['auth/getUser'])

const handleLogout = () => {
  store.dispatch('auth/logout')
  router.push('/auth')
}
</script>

<style scoped>
.dashboard-card {
  width: 100%;
  max-width: 450px;
  padding: var(--space-2xl);
}

.user-profile {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.user-name {
  margin: 0 0 var(--space-sm) 0;
}

.user-email {
  margin: 0;
}

.dashboard-content {
  background: var(--color-secondary);
  padding: var(--space-xl);
  margin-bottom: var(--space-xl);
  border: 3px solid var(--color-secondary-dark);
}

.content-title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  color: var(--color-black);
  margin: 0 0 var(--space-md) 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 0px var(--color-white);
}

.retro-text {
  color: var(--color-black);
  margin: 0 0 var(--space-lg) 0;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 480px) {
  .dashboard-card {
    padding: 25px;
  }
}

@media (max-width: 375px) {
  .dashboard-card {
    padding: 20px;
  }
}
</style>
