<template>
  <nav class="navigation-bar">
    <div class="nav-content">
      <button
        v-for="item in navigationItems"
        :key="item.id"
        @click="navigateTo(item.route)"
        :class="['nav-item', { active: isActiveRoute(item.route) }]"
        :disabled="item.disabled"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-label">{{ item.label }}</span>
        <div v-if="item.badge" class="nav-badge">{{ item.badge }}</div>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Configuración de elementos de navegación (escalable)
const navigationItems = computed(() => [
  {
    id: 'home',
    label: 'Inicio',
    icon: '🏠',
    route: '/home',
    disabled: false,
  },
  {
    id: 'explore',
    label: 'Explorar',
    icon: '🔍',
    route: '/explore',
    disabled: true, // Deshabilitado hasta implementar
  },
  {
    id: 'favorites',
    label: 'Favoritos',
    icon: '❤️',
    route: '/favorites',
    disabled: true, // Deshabilitado hasta implementar
    badge: '3', // Ejemplo de badge
  },
  {
    id: 'notifications',
    label: 'Avisos',
    icon: '🔔',
    route: '/notifications',
    disabled: true, // Deshabilitado hasta implementar
    badge: '2', // Ejemplo de badge
  },
  {
    id: 'more',
    label: 'Más',
    icon: '⚡',
    route: '/more',
    disabled: true, // Deshabilitado hasta implementar
  },
])

const navigateTo = (routePath) => {
  if (routePath && route.path !== routePath) {
    router.push(routePath)
  }
}

const isActiveRoute = (routePath) => {
  return route.path === routePath
}
</script>

<style scoped>
.navigation-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-dark);
  border-top: 3px solid var(--color-primary);
  z-index: 100;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.3);
}

.nav-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  max-width: 600px;
  margin: 0 auto;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: var(--space-sm);
  border-radius: var(--radius-md);
  transition: var(--transition-bounce);
  position: relative;
  min-width: 60px;
  font-family: var(--font-primary);
}

.nav-item:hover:not(:disabled) {
  background: rgba(247, 233, 106, 0.1);
  transform: translateY(-2px);
}

.nav-item:active:not(:disabled) {
  transform: translateY(0);
}

.nav-item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-item.active {
  background: rgba(247, 233, 106, 0.2);
  border: 2px solid var(--color-primary);
}

.nav-item.active .nav-icon {
  transform: scale(1.2);
  filter: drop-shadow(0 0 8px var(--color-primary));
}

.nav-item.active .nav-label {
  color: var(--color-primary);
  font-weight: bold;
}

.nav-icon {
  font-size: var(--text-xl);
  transition: var(--transition-bounce);
}

.nav-label {
  font-size: var(--text-xs);
  color: var(--color-white);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: var(--transition-base);
}

.nav-item:disabled .nav-label {
  color: var(--color-gray);
}

.nav-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--color-accent);
  color: var(--color-white);
  font-size: var(--text-xs);
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 10px;
  border: 2px solid var(--color-dark);
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(25%, -25%);
  box-shadow: var(--shadow-sm);
}

/* Responsive Design */
@media (max-width: 480px) {
  .nav-content {
    padding: var(--space-xs) var(--space-sm);
  }

  .nav-item {
    min-width: 50px;
    padding: var(--space-xs);
  }

  .nav-icon {
    font-size: var(--text-lg);
  }

  .nav-label {
    font-size: 10px;
  }
}

/* Animación de entrada */
@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.navigation-bar {
  animation: slideUp 0.3s ease-out;
}
</style>
