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
    <div v-if="showProfileMenu" class="profile-dropdown">
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
  position: relative;
  padding: 1rem;
}

.profile-menu {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
}

.profile-menu:hover {
  background-color: #f0f0f0;
}

.profile-dropdown {
  position: absolute;
  top: 100%;
  right: 1rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 150px;
}

.profile-dropdown button {
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
}

.profile-dropdown button:hover {
  background-color: #f5f5f5;
}
</style>
