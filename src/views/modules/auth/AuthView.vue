<template>
  <div class="app-container">
    <AppCard>
      <template #title>Keep Bouncing</template>
      <template #subtitle>
        {{ isLoginMode ? '¡Bienvenido de vuelta!' : '¡Únete a nosotros!' }}
      </template>

      <template #default>
        <!-- Formulario de Login -->
        <LoginForm v-if="isLoginMode" />

        <!-- Formulario de Registro -->
        <RegisterForm v-else @register-success="handleRegisterSuccess" />

        <!-- Mensajes de error y éxito -->
        <div v-if="errorMessage">
          <span>⚠️</span>
          {{ errorMessage }}
        </div>

        <div v-if="successMessage">
          <span>✅</span>
          {{ successMessage }}
        </div>

        <!-- Navegación entre formularios -->
        <div>
          <p v-if="isLoginMode">
            ¿Primera vez aquí?
            <a href="#" @click.prevent="toggleMode">Crear cuenta</a>
          </p>
          <p v-else>
            ¿Ya tienes cuenta?
            <a href="#" @click.prevent="toggleMode">Iniciar sesión</a>
          </p>
        </div>
      </template>
    </AppCard>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import LoginForm from '../../../components/modules/auth/LoginForm.vue'
import RegisterForm from '../../../components/modules/auth/RegisterForm.vue'
import AppCard from '../../../components/shared/CustomCard.vue'

const store = useStore()

const isLoginMode = ref(true)

const errorMessage = computed(() => store.getters['auth/errorMessage'])
const successMessage = computed(() => store.getters['auth/successMessage'])

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value
  store.dispatch('auth/clearMessages')
}

const handleRegisterSuccess = () => {
  isLoginMode.value = true
  store.dispatch('auth/clearMessages')
}
</script>

<style scoped>
.app-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
