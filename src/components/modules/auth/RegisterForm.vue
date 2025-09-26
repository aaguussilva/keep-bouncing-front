<template>
  <form @submit.prevent="handleRegister" class="auth-form">
    <TextField
      v-model="registerForm.name"
      type="text"
      label="Nombre Completo"
      placeholder="Tu nombre completo"
      :disabled="isLoading"
      required
      :minlength="2"
      autocomplete="name"
      help-text="Mínimo 2 caracteres"
    />

    <TextField
      v-model="registerForm.email"
      type="email"
      label="Email"
      placeholder="tu@email.com"
      :disabled="isLoading"
      required
      autocomplete="email"
    />

    <TextField
      v-model="registerForm.password"
      type="password"
      label="Contraseña"
      placeholder="Mínimo 6 caracteres"
      :disabled="isLoading"
      required
      :minlength="6"
      autocomplete="new-password"
      help-text="Mínimo 6 caracteres"
    />

    <TextField
      v-model="registerForm.confirmPassword"
      type="password"
      label="Confirmar Contraseña"
      placeholder="Repite tu contraseña"
      :disabled="isLoading"
      required
      :minlength="6"
      autocomplete="new-password"
    />

    <Button
      type="submit"
      variant="success"
      :disabled="isLoading"
      :loading="isLoading"
      loading-text="Creando..."
      full-width
    >
      Crear Cuenta
    </Button>
  </form>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import TextField from '../../shared/TextField.vue'
import Button from '../../shared/Button.vue'

const emit = defineEmits(['register-success'])

const store = useStore()

const registerForm = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const isLoading = computed(() => store.getters['auth/isLoading'])

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const handleRegister = async () => {
  // Validaciones básicas
  if (
    !registerForm.name ||
    !registerForm.email ||
    !registerForm.password ||
    !registerForm.confirmPassword
  ) {
    store.commit('auth/SET_ERROR_MESSAGE', 'Por favor completa todos los campos')
    return
  }

  if (registerForm.name.length < 2) {
    store.commit('auth/SET_ERROR_MESSAGE', 'El nombre debe tener al menos 2 caracteres')
    return
  }

  if (!validateEmail(registerForm.email)) {
    store.commit('auth/SET_ERROR_MESSAGE', 'Por favor ingresa un email válido')
    return
  }

  if (registerForm.password.length < 6) {
    store.commit('auth/SET_ERROR_MESSAGE', 'La contraseña debe tener al menos 6 caracteres')
    return
  }

  if (registerForm.password !== registerForm.confirmPassword) {
    store.commit('auth/SET_ERROR_MESSAGE', 'Las contraseñas no coinciden')
    return
  }

  const result = await store.dispatch('auth/register', registerForm)

  if (result.success) {
    registerForm.name = ''
    registerForm.email = ''
    registerForm.password = ''
    registerForm.confirmPassword = ''

    // Emitir evento para cambiar a login después de 2 segundos
    setTimeout(() => {
      emit('register-success')
    }, 2000)
  }
}
</script>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
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

/* Los estilos de input ahora están en TextField.vue */
</style>
