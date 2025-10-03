<template>
  <div>
    <label v-if="label" :for="inputId">
      {{ label }}
      <span v-if="required">*</span>
    </label>
    <div>
      <input
        :id="inputId"
        :type="showPassword ? 'text' : type"
        :value="modelValue"
        @input="handleInput"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
      />
      <div v-if="showPasswordToggle" @click="togglePasswordVisibility">
        <span>{{ showPassword ? '👁️' : '👁️‍🗨️' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])

const showPassword = ref(false)

// computed
const inputId = computed(() => {
  return `input-${Math.random().toString(36).substr(2, 9)}`
})
const showPasswordToggle = computed(() => {
  return props.type === 'password'
})

// methods
const handleInput = (event) => {
  const value = event.target.value
  emit('update:modelValue', value)
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<style scoped></style>
