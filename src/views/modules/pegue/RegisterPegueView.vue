<template>
  <div>
    <header>
      <CustomButton @click="goBack">← Volver</CustomButton>
      <h1>Registrar Nuevo Pegue</h1>
      <div></div>
    </header>

    <main>
      <div>
        <h2>Detalles de la Sesión</h2>
        <p>Completa la información de tu pegue</p>

        <form @submit.prevent="handleRegisterPegue">
          <div>
            <div>
              <label for="equipment">Equipo Utilizado *</label>
              <select v-model="pegueForm.equipment" id="equipment" required>
                <option value="">Selecciona un equipo</option>
                <option value="slackline">Slackline</option>
                <option value="highline">Highline</option>
                <option value="trickline">Trickline</option>
                <option value="waterline">Waterline</option>
              </select>
            </div>

            <div>
              <label for="date">Fecha y Hora *</label>
              <input v-model="pegueForm.date" type="datetime-local" id="date" required />
            </div>
          </div>

          <div>
            <div>
              <label for="duration">Duración (minutos)</label>
              <input
                v-model="pegueForm.duration"
                type="number"
                id="duration"
                placeholder="ej: 45"
                min="1"
              />
            </div>
          </div>

          <div>
            <div>
              <label for="tricks">Trucos Realizados</label>
              <select v-model="pegueForm.tricks" id="tricks" multiple :disabled="tricksLoading">
                <option v-if="tricksLoading" disabled>Cargando trucos...</option>
                <option v-else-if="tricksError" disabled>Error al cargar trucos</option>
                <option v-else v-for="trick in availableTricks" :key="trick.id" :value="trick.id">
                  {{ trick.name }} (Nivel {{ trick.level }})
                </option>
              </select>
            </div>
          </div>

          <div>
            <label for="notes">Notas de la Sesión</label>
            <textarea
              v-model="pegueForm.notes"
              id="notes"
              rows="4"
              placeholder="Describe cómo fue la sesión, qué practicaste, condiciones del clima, etc..."
            ></textarea>
          </div>

          <div>
            <CustomButton type="submit" :loading="isLoading"> 📄 Registrar Pegue </CustomButton>
            <CustomButton @click="goBack" type="button"> Cancelar </CustomButton>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import CustomButton from '../../../components/shared/CustomButton.vue'

const router = useRouter()
const store = useStore()
const isLoading = ref(false)

const pegueForm = reactive({
  equipment: '',
  date: new Date().toISOString().slice(0, 16),
  duration: '',
  tricks: [],
  notes: '',
})

// Getters del store
const availableTricks = computed(() => store.getters['tricks/tricks'])
const tricksLoading = computed(() => store.getters['tricks/isLoading'])
const tricksError = computed(() => store.getters['tricks/errorMessage'])

const handleRegisterPegue = async () => {
  if (!pegueForm.equipment || !pegueForm.date) {
    alert('Por favor completa los campos obligatorios')
    return
  }

  isLoading.value = true

  try {
    console.log('Registrando pegue:', pegueForm)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    alert('¡Pegue registrado exitosamente!')

    Object.assign(pegueForm, {
      equipment: '',
      date: new Date().toISOString().slice(0, 16),
      duration: '',
      tricks: [],
      notes: '',
    })

    router.push('/home')
  } catch {
    alert('Error al registrar el pegue')
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.push('/home')
}

// Cargar trucos disponibles desde el store
const loadTricks = async () => {
  await store.dispatch('tricks/fetchTricks')
}

onMounted(() => {
  loadTricks()
})
</script>
