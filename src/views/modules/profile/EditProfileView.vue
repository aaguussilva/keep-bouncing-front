<template>
  <div>
    <header>
      <Button @click="goBack" variant="secondary" size="sm"> ← Volver </Button>
      <h1>✏️ Editar Perfil</h1>
      <div></div>
    </header>

    <main>
      <div>
        <div>
          <div>
            <div>
              {{ (profileForm.name || 'Usuario').charAt(0).toUpperCase() }}
            </div>
          </div>
        </div>

        <form @submit.prevent="handleSaveProfile">
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

          <div>
            <h3>🔒 Cambiar Contraseña</h3>
            <p>Deja en blanco si no quieres cambiarla</p>

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

          <div>
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
import Button from '../../../components/shared/CustomButton.vue'

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
  if (!profileForm.name || !profileForm.email) {
    store.commit('auth/SET_ERROR_MESSAGE', 'Nombre y email son obligatorios')
    return
  }

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
    console.log('Guardando perfil:', profileForm)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    store.commit('auth/SET_SUCCESS_MESSAGE', '¡Perfil actualizado exitosamente!')
    profileForm.currentPassword = ''
    profileForm.newPassword = ''
    profileForm.confirmPassword = ''
  } catch {
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
