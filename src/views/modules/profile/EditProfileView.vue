<template>
  <div class="edit-profile-container">
    <!-- Header simple -->
    <header class="edit-header">
      <Button @click="goBack" variant="secondary" size="sm"> ← Volver </Button>
      <h1 class="retro-title header-title">✏️ Editar Perfil</h1>
      <div></div>
      <!-- Espaciador para flexbox -->
    </header>

    <!-- Contenido principal -->
    <main class="edit-content">
      <div class="retro-card profile-form-container">
        <div class="avatar-section">
          <div class="current-avatar">
            <AvatarInitials :name="profileForm.name || 'Usuario'" size="xl" />
          </div>
        </div>

        <form @submit.prevent="handleSaveProfile" class="profile-form">
          <TextField
            v-model="profileForm.name"
            type="text"
            label="Nombre Completo"
            placeholder="Tu nombre completo"
            :disabled="isLoading"
            required
            :minlength="2"
            autocomplete="name"
          />

          <TextField
            v-model="profileForm.email"
            type="email"
            label="Email"
            placeholder="tu@email.com"
            :disabled="isLoading"
            required
            autocomplete="email"
          />

          <!-- Sección de contraseña -->
          <div class="password-section">
            <h3 class="section-title">🔒 Cambiar Contraseña</h3>
            <p class="section-description">Deja en blanco si no quieres cambiarla</p>

            <TextField
              v-model="profileForm.currentPassword"
              type="password"
              label="Contraseña Actual"
              placeholder="Tu contraseña actual"
              :disabled="isLoading"
              autocomplete="current-password"
            />

            <TextField
              v-model="profileForm.newPassword"
              type="password"
              label="Nueva Contraseña"
              placeholder="Nueva contraseña"
              :disabled="isLoading"
              :minlength="6"
              autocomplete="new-password"
              help-text="Mínimo 6 caracteres"
            />

            <TextField
              v-model="profileForm.confirmPassword"
              type="password"
              label="Confirmar Nueva Contraseña"
              placeholder="Repite la nueva contraseña"
              :disabled="isLoading"
              :minlength="6"
              autocomplete="new-password"
            />
          </div>

          <!-- Botones de acción -->
          <div class="form-actions">
            <Button
              type="submit"
              variant="success"
              :loading="isLoading"
              loading-text="Guardando..."
              full-width
            >
              💾 Guardar Cambios
            </Button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import TextField from '../../../components/shared/TextField.vue'
import Button from '../../../components/shared/Button.vue'
import AvatarInitials from '../../../components/shared/AvatarInitials.vue'

const store = useStore()
const router = useRouter()

const isLoading = ref(false)

const user = computed(() => store.getters['auth/getUser'])

const profileForm = reactive({
  name: '',
  email: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const initializeForm = () => {
  if (user.value) {
    profileForm.name = user.value.name || ''
    profileForm.email = user.value.email || ''
  }
}

const handleSaveProfile = async () => {
  // Validaciones
  if (!profileForm.name || !profileForm.email) {
    store.commit('auth/SET_ERROR_MESSAGE', 'Nombre y email son obligatorios')
    return
  }

  // Validar contraseñas si se quiere cambiar
  if (profileForm.newPassword || profileForm.confirmPassword) {
    if (!profileForm.currentPassword) {
      store.commit('auth/SET_ERROR_MESSAGE', 'Ingresa tu contraseña actual para cambiarla')
      return
    }

    if (profileForm.newPassword !== profileForm.confirmPassword) {
      store.commit('auth/SET_ERROR_MESSAGE', 'Las nuevas contraseñas no coinciden')
      return
    }

    if (profileForm.newPassword.length < 6) {
      store.commit('auth/SET_ERROR_MESSAGE', 'La nueva contraseña debe tener al menos 6 caracteres')
      return
    }
  }

  isLoading.value = true

  try {
    // TODO: Implementar llamada al backend para actualizar perfil
    console.log('Guardando perfil:', profileForm)

    // Simular guardado
    await new Promise((resolve) => setTimeout(resolve, 1500))

    store.commit('auth/SET_SUCCESS_MESSAGE', '¡Perfil actualizado exitosamente!')

    // Limpiar contraseñas
    profileForm.currentPassword = ''
    profileForm.newPassword = ''
    profileForm.confirmPassword = ''
  } catch (error) {
    store.commit('auth/SET_ERROR_MESSAGE', 'Error al actualizar el perfil')
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.push('/home')
}

onMounted(() => {
  initializeForm()
})
</script>

<style scoped>
.edit-profile-container {
  min-height: 100vh;
  background: var(--color-dark);
  position: relative;
}

.edit-profile-container::before {
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

.edit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-lg);
  border-bottom: 3px solid var(--color-primary);
  background: var(--color-dark);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-title {
  margin: 0;
  font-size: var(--text-2xl);
}

.edit-content {
  padding: var(--space-lg);
  max-width: 600px;
  margin: 0 auto;
}

.profile-form-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  padding: var(--space-xl);
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-xl);
  margin-bottom: var(--space-xl);
  border-bottom: 3px solid var(--color-dark);
}

.current-avatar {
  position: relative;
  cursor: pointer;
}

/* Avatar preview styles now handled by AvatarInitials component */

.profile-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.password-section {
  background: rgba(247, 233, 106, 0.1);
  padding: var(--space-lg);
  border-radius: var(--radius-md);
  border: 2px solid var(--color-primary);
}

.section-title {
  font-family: var(--font-display);
  color: var(--color-primary);
  margin: 0 0 var(--space-sm) 0;
  font-size: var(--text-lg);
}

.section-description {
  color: var(--color-white);
  margin: 0 0 var(--space-lg) 0;
  font-size: var(--text-sm);
  opacity: 0.8;
}

.form-actions {
  margin-top: var(--space-xl);
}

/* Responsive Design */
@media (max-width: 768px) {
  .edit-header {
    padding: var(--space-md);
  }

  .header-title {
    font-size: var(--text-xl);
  }

  .edit-content {
    padding: var(--space-md);
  }

  .profile-form-container {
    padding: var(--space-lg);
  }

  .avatar-section {
    padding: var(--space-lg);
    margin-bottom: var(--space-lg);
  }
}
</style>
