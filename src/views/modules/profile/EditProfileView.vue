<template>
  <div>
    <header class="flex items-center justify-between mb-4">
      <Button @click="goBack" variant="secondary" size="sm">← Volver</Button>
      <h1 class="text-xl font-semibold">✏️ Editar Perfil</h1>
      <div></div>
    </header>

    <main>
      <EditProfileForm />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import EditProfileForm from '../../../components/modules/profile/EditProfileForm.vue'
import Button from '../../../components/shared/CustomButton.vue'

const router = useRouter()

const goBack = () => {
  router.push('/home')
}
</script>
