<template>
  <header class="profile-header">
    <!-- Logo/Título (izquierda) -->
    <div>
      <h2>Keep Bouncing</h2>
    </div>

    <!-- Perfil (derecha) -->
    <div @click="toggleProfileMenu" class="profile-menu">
      <div>
        <span>{{ user?.name || 'Usuario' }}</span>
      </div>
      <div>{{ showProfileMenu ? '▲' : '▼' }}</div>
    </div>

    <!-- Menú desplegable -->
    <div v-if="showProfileMenu">
      <button @click="goToEditProfile">Editar Perfil</button>
      <button @click="goToSettings">Configuración</button>
      <hr />
      <button @click="handleLogout">Cerrar Sesión</button>
    </div>

    <!-- Overlay para cerrar menú -->
    <div v-if="showProfileMenu" @click="closeProfileMenu"></div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const showProfileMenu = ref(false)
const user = computed(() => store.getters['auth/getUser'])

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value
}

const closeProfileMenu = () => {
  showProfileMenu.value = false
}

const goToEditProfile = () => {
  closeProfileMenu()
  router.push('/profile/edit')
}

const goToSettings = () => {
  closeProfileMenu()
  console.log('Ir a configuración')
}

const handleLogout = () => {
  closeProfileMenu()
  store.dispatch('auth/logout')
  router.push('/auth')
}

const handleEscape = (event) => {
  if (event.key === 'Escape') {
    closeProfileMenu()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.profile-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.profile-menu {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
