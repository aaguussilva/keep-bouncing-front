<template>
  <form @submit.prevent="handleSaveProfile" class="space-y-4 max-w-md mx-auto">
    <TextField
      v-model="form.name"
      type="text"
      label="Nombre Completo"
      placeholder="Tu nombre completo"
      :disabled="isLoading"
      required
      :minlength="4"
      autocomplete="name"
    />

    <TextField
      v-model="form.email"
      type="email"
      label="Email"
      placeholder="tu@email.com"
      :disabled="isLoading"
      required
      autocomplete="email"
    />

    <div class="mt-6">
      <h3 class="font-medium text-gray-700">🔒 Cambiar Contraseña</h3>
      <p class="text-sm text-gray-500 mb-2">Deja en blanco si no quieres cambiarla</p>

      <TextField
        v-model="form.currentPassword"
        type="password"
        label="Contraseña Actual"
        placeholder="Tu contraseña actual"
        :disabled="isLoading"
        autocomplete="current-password"
      />

      <TextField
        v-model="form.newPassword"
        type="password"
        label="Nueva Contraseña"
        placeholder="Nueva contraseña"
        :disabled="isLoading"
        :minlength="6"
        autocomplete="new-password"
        help-text="Mínimo 6 caracteres"
      />

      <TextField
        v-model="form.confirmPassword"
        type="password"
        label="Confirmar Nueva Contraseña"
        placeholder="Repite la nueva contraseña"
        :disabled="isLoading"
        :minlength="6"
        autocomplete="new-password"
      />
    </div>

    <div class="mt-6">
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

    <!-- Mensajes dinámicos con transición -->
    <transition name="fade">
      <div v-if="profileError || profileSuccess" class="mt-4">
        <p v-if="profileError" class="text-red-600 text-sm font-medium">
          {{ profileError }}
        </p>
        <p v-if="profileSuccess" class="text-green-600 text-sm font-medium">
          {{ profileSuccess }}
        </p>
      </div>
    </transition>
  </form>
</template>

<script setup>
import { reactive, ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import TextField from '../../../components/shared/TextField.vue'
import Button from '../../../components/shared/CustomButton.vue'

const store = useStore()
const isLoading = ref(false)

const authUser = computed(() => store.getters['auth/getUser'])
const profile = computed(() => store.getters['profile/getUserProfile'])
const profileError = computed(() => store.getters['profile/getProfileError'])
const profileSuccess = computed(() => store.getters['profile/getProfileSuccess'])

const form = reactive({
  name: '',
  email: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const initializeForm = () => {
  const data = profile.value || authUser.value
  if (data) {
    form.name = data.name || ''
    form.email = data.email || ''
  }
}

onMounted(async () => {
  store.commit('profile/CLEAR_PROFILE_MESSAGES')
  if (authUser.value?.id) {
    await store.dispatch('profile/fetchUserProfile', authUser.value.id)
    initializeForm()
  }
})

const handleSaveProfile = async () => {
  store.commit('profile/CLEAR_PROFILE_MESSAGES')

  if (!form.name || !form.email) {
    store.commit('profile/SET_PROFILE_ERROR', 'Nombre y email son obligatorios')
    return
  }

  if (form.newPassword || form.confirmPassword) {
    if (!form.currentPassword) {
      store.commit('profile/SET_PROFILE_ERROR', 'Ingresa tu contraseña actual para cambiarla')
      return
    }

    if (form.newPassword !== form.confirmPassword) {
      store.commit('profile/SET_PROFILE_ERROR', 'Las nuevas contraseñas no coinciden')
      return
    }

    if (form.newPassword.length < 6) {
      store.commit('profile/SET_PROFILE_ERROR', 'La nueva contraseña debe tener al menos 6 caracteres')
      return
    }
  }

  isLoading.value = true
  try {
    suppressClear.value = true
    await store.dispatch('profile/updateUserProfile', {
      userId: authUser.value.id,
      name: form.name,
      email: form.email,
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
    })

    form.currentPassword = ''
    form.newPassword = ''
    form.confirmPassword = ''

    setTimeout(() => (suppressClear.value = false), 300)
  } catch (error) {
    store.commit('profile/SET_PROFILE_ERROR', error.message || 'Error al actualizar el perfil')
  } finally {
    isLoading.value = false
  }
}

const suppressClear = ref(false)

watch(form, () => {
  if (!suppressClear.value) {
    store.commit('profile/CLEAR_PROFILE_MESSAGES')
  }
})

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
