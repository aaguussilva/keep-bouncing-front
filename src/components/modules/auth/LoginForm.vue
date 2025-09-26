<template>
  <form @submit.prevent="handleLogin" class="auth-form">
    <TextField
      v-model="loginForm.email"
      type="email"
      label="Email"
      placeholder="tu@email.com"
      :disabled="isLoading"
      required
      autocomplete="email"
    />

    <TextField
      v-model="loginForm.password"
      type="password"
      label="Contraseña"
      placeholder="Tu contraseña"
      :disabled="isLoading"
      required
      autocomplete="current-password"
    />

    <Button
      type="submit"
      variant="accent"
      :disabled="isLoading"
      :loading="isLoading"
      loading-text="Iniciando..."
      full-width
    >
      Iniciar Sesión
    </Button>
  </form>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import TextField from '../../shared/TextField.vue'
import Button from '../../shared/Button.vue'

const store = useStore()
const router = useRouter()

const loginForm = reactive({
  email: '',
  password: '',
})

const isLoading = computed(() => store.getters['auth/isLoading'])

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const handleLogin = async () => {
  // Validaciones básicas
  if (!loginForm.email || !loginForm.password) {
    store.commit('auth/SET_ERROR_MESSAGE', 'Por favor completa todos los campos')
    return
  }

  if (!validateEmail(loginForm.email)) {
    store.commit('auth/SET_ERROR_MESSAGE', 'Por favor ingresa un email válido')
    return
  }

  if (loginForm.password.length < 3) {
    store.commit('auth/SET_ERROR_MESSAGE', 'La contraseña debe tener al menos 3 caracteres')
    return
  }

  const result = await store.dispatch('auth/login', loginForm)

  if (result.success) {
    loginForm.email = ''
    loginForm.password = ''
    router.push('/dashboard')
  }
}
</script>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
