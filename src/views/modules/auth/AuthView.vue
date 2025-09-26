<template>
  <div class="app-container">
    <div class="auth-container">
      <div class="retro-card auth-card">
        <div class="logo-section">
          <h1 class="retro-title">Keep Bouncing</h1>
          <p class="retro-subtitle">
            {{ isLoginMode ? '¡Bienvenido de vuelta!' : '¡Únete a nosotros!' }}
          </p>
        </div>

        <!-- Formulario de Login -->
        <LoginForm v-if="isLoginMode" />

        <!-- Formulario de Registro -->
        <RegisterForm v-else @register-success="handleRegisterSuccess" />

        <!-- Mensajes de error y éxito -->
        <div v-if="errorMessage" class="error-message">
          <span class="error-icon">⚠️</span>
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="success-message">
          <span class="success-icon">✅</span>
          {{ successMessage }}
        </div>

        <!-- Navegación entre formularios -->
        <div class="footer-text">
          <p v-if="isLoginMode" class="retro-text">
            ¿Primera vez aquí?
            <a href="#" @click.prevent="toggleMode" class="retro-link">🌟 Crear cuenta</a>
          </p>
          <p v-else class="retro-text">
            ¿Ya tienes cuenta?
            <a href="#" @click.prevent="toggleMode" class="retro-link">🔑 Iniciar sesión</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import LoginForm from '../../../components/modules/auth/LoginForm.vue'
import RegisterForm from '../../../components/modules/auth/RegisterForm.vue'

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
  min-height: 100vh;
  background: var(--color-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
  font-family: var(--font-body);
  position: relative;
}

.app-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(circle at 25% 25%, var(--color-primary) 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, var(--color-secondary) 2px, transparent 2px);
  background-size: 40px 40px;
  opacity: 0.05;
  pointer-events: none;
}

.auth-container {
  width: 100%;
  max-width: 420px;
  z-index: 1;
}

.auth-card {
  padding: var(--space-2xl);
  margin: var(--space-lg);
}

.logo-section {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.error-message {
  background: var(--color-accent-light);
  color: var(--color-white);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  border: 3px solid var(--color-accent-dark);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: bold;
  margin-top: var(--space-lg);
  box-shadow: var(--shadow-retro);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.success-message {
  background: var(--color-success);
  color: var(--color-white);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  border: 3px solid var(--color-success-dark);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: bold;
  margin-top: var(--space-lg);
  box-shadow: var(--shadow-retro);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.footer-text {
  text-align: center;
  margin-top: var(--space-xl);
}

.retro-text {
  color: var(--color-black);
  font-family: var(--font-secondary);
  font-size: var(--text-sm);
  margin: 0;
}

.retro-link {
  color: var(--color-accent);
  text-decoration: none;
  font-weight: bold;
  font-family: var(--font-primary);
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: var(--transition-bounce);
  border-bottom: 2px solid transparent;
}

.retro-link:hover {
  color: var(--color-accent-dark);
  border-bottom-color: var(--color-accent);
  transform: translateY(-1px);
}

/* Responsive Design */
@media (max-width: 480px) {
  .app-container {
    padding: 15px;
  }

  .auth-card {
    padding: 25px;
  }

  .app-title {
    font-size: 1.6rem;
  }

  .logo {
    font-size: 2.5rem;
  }
}

/* iPhone SE y pantallas muy pequeñas */
@media (max-width: 375px) {
  .auth-card {
    padding: 20px;
  }

  .app-title {
    font-size: 1.4rem;
  }
}
</style>
