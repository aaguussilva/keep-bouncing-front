<template>
  <header class="profile-header">
    <div class="header-content">
      <!-- Logo/Título (izquierda) -->
      <div class="app-logo">
        <h2 class="logo-text">Keep Bouncing</h2>
      </div>

      <!-- Perfil (derecha) -->
      <div class="profile-section">
        <div class="profile-info" @click="toggleProfileMenu">
          <div class="avatar-container">
            <AvatarInitials :name="user?.name || 'Usuario'" size="md" />
            <div class="status-indicator"></div>
          </div>
          <div class="user-details">
            <span class="user-name">{{ user?.name || 'Usuario' }}</span>
            <span class="user-status">En línea</span>
          </div>
          <div class="dropdown-icon" :class="{ rotated: showProfileMenu }">▼</div>
        </div>

        <!-- Menú desplegable -->
        <div v-if="showProfileMenu" class="profile-menu retro-card">
          <button @click="goToEditProfile" class="menu-item">
            <span class="menu-icon">✏️</span>
            Editar Perfil
          </button>
          <button @click="goToSettings" class="menu-item">
            <span class="menu-icon">⚙️</span>
            Configuración
          </button>
          <hr class="menu-divider" />
          <button @click="handleLogout" class="menu-item logout-item">
            <span class="menu-icon">🚪</span>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>

    <!-- Overlay para cerrar menú -->
    <div v-if="showProfileMenu" class="menu-overlay" @click="closeProfileMenu"></div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import AvatarInitials from './AvatarInitials.vue'

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
  // TODO: Implementar ruta de configuración
  console.log('Ir a configuración')
}

const handleLogout = () => {
  closeProfileMenu()
  store.dispatch('auth/logout')
  router.push('/auth')
}

// Cerrar menú con ESC
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--color-dark);
  border-bottom: 3px solid var(--color-primary);
  z-index: 100;
  box-shadow: var(--shadow-lg);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
  max-width: 1200px;
  margin: 0 auto;
}

.app-logo .logo-text {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  color: var(--color-primary);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 0px var(--color-dark);
}

.profile-section {
  position: relative;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  padding: var(--space-sm);
  border-radius: var(--radius-md);
  transition: var(--transition-base);
}

.profile-info:hover {
  background: rgba(247, 233, 106, 0.1);
}

.avatar-container {
  position: relative;
}

/* Avatar styles now handled by AvatarInitials component */

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background: var(--color-success);
  border: 2px solid var(--color-dark);
  border-radius: 50%;
}

.user-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.user-name {
  font-family: var(--font-primary);
  font-weight: bold;
  color: var(--color-white);
  font-size: var(--text-sm);
}

.user-status {
  font-family: var(--font-secondary);
  font-size: var(--text-xs);
  color: var(--color-success);
  font-style: italic;
}

.dropdown-icon {
  color: var(--color-primary);
  font-size: var(--text-xs);
  transition: var(--transition-base);
  margin-left: var(--space-xs);
}

.dropdown-icon.rotated {
  transform: rotate(180deg);
}

.profile-menu {
  position: absolute;
  top: 100%;
  right: -10px;
  margin-top: var(--space-sm);
  background: var(--color-white);
  border: 3px solid var(--color-dark);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-retro-large);
  min-width: 220px;
  width: auto;
  white-space: nowrap;
  z-index: 1000;
  overflow: hidden;
  transform-origin: top right;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  width: 100%;
  padding: var(--space-md) var(--space-lg);
  background: transparent;
  border: none;
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  color: var(--color-black);
  cursor: pointer;
  transition: var(--transition-base);
  text-align: left;
  justify-content: flex-start;
}

.menu-item:hover {
  background: var(--color-primary-light);
}

.logout-item:hover {
  background: var(--color-accent-light);
  color: var(--color-white);
}

.menu-icon {
  font-size: var(--text-base);
}

.menu-divider {
  border: none;
  border-top: 2px solid var(--color-gray);
  margin: 0;
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 99;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    padding: var(--space-sm) var(--space-md);
  }

  .app-logo .logo-text {
    font-size: var(--text-lg);
  }

  /* Avatar responsive styles now in AvatarInitials component */

  .user-details {
    display: none; /* Ocultar detalles en móvil */
  }

  .profile-menu {
    right: var(--space-sm);
    min-width: 200px;
    max-width: calc(100vw - var(--space-lg));
  }

  .menu-item {
    padding: var(--space-sm) var(--space-md);
    gap: var(--space-sm);
  }
}
</style>
