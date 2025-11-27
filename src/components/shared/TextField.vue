<template>
  <div class="flex flex-col mb-4">
    <label v-if="label" :for="inputId" class="mb-1 font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <input
        :id="inputId"
        :type="showPassword ? 'text' : type"
        v-model="innerValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        @blur="validateField"
        class="border rounded-lg p-2 w-full focus:ring-2 focus:outline-none"
        :class="{
          'border-red-500 focus:ring-red-400': errorMessage,
          'border-gray-300 focus:ring-blue-400': !errorMessage,
        }"
      />

      <span
        v-if="type === 'password'"
        class="absolute right-3 top-2.5 cursor-pointer text-gray-500 select-none"
        @click="togglePasswordVisibility"
      >
        {{ showPassword ? '🙈' : '👁️' }}
      </span>
    </div>

    <p v-if="errorMessage" class="text-red-600 text-sm mt-1">
      {{ errorMessage }}
    </p>
    <p v-else-if="helpText" class="text-gray-500 text-sm mt-1">
      {{ helpText }}
    </p>
  </div>
</template>

<script setup>
import { ref, watch, computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  type: { type: String, default: 'text' },
  label: String,
  placeholder: String,
  disabled: Boolean,
  readonly: Boolean,
  required: Boolean,
  minlength: Number,
  helpText: String,
})

const emit = defineEmits(['update:modelValue'])

const innerValue = ref(props.modelValue)
const errorMessage = ref('')
const showPassword = ref(false)

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const validateField = () => {
  errorMessage.value = ''

  if (props.required && !innerValue.value) {
    errorMessage.value = 'Este campo es obligatorio'
  } else if (props.minlength && innerValue.value.length < props.minlength) {
    errorMessage.value = `Debe tener al menos ${props.minlength} caracteres`
  } else if (props.type === 'email' && innerValue.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(innerValue.value)) {
      errorMessage.value = 'Formato de email no válido'
    }
  }
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// Sincroniza valor con el padre
watch(innerValue, (val) => {
  emit('update:modelValue', val)
})
watch(
  () => props.modelValue,
  (val) => {
    innerValue.value = val
  }
)
</script>

<style scoped>
input:disabled {
  background-color: #f9fafb;
  cursor: not-allowed;
}
</style>
