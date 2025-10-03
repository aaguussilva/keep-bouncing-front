<template>
  <nav>
    <button
      v-for="item in navigationItems"
      :key="item.id"
      @click="navigateTo(item.route)"
      :disabled="item.disabled"
    >
      <span>{{ item.label }}</span>
      <div v-if="item.badge">{{ item.badge }}</div>
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const navigationItems = computed(() => [
  { id: 'home', label: 'Inicio', route: '/home', disabled: false },
  { id: 'register-pegue', label: 'Registrar Pegue', route: '/pegue/register', disabled: false },
  { id: 'profile', label: 'Perfil', route: '/profile/edit', disabled: false },
])

const navigateTo = (routePath) => {
  if (routePath && route.path !== routePath) {
    router.push(routePath)
  }
}
</script>
