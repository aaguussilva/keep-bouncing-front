<template>
  <div class="input-group">
    <label v-if="label" :for="inputId" class="input-label">
      {{ label }}
      <span v-if="required" class="required-asterisk">*</span>
    </label>
    <div class="input-wrapper">
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        class="input-field"
        :class="{
          'input-error': hasError,
          'input-success': hasSuccess,
          'input-disabled': disabled,
        }"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :maxlength="maxlength"
        :minlength="minlength"
        :min="min"
        :max="max"
        :step="step"
      />
      <div v-if="showPasswordToggle" class="password-toggle" @click="togglePasswordVisibility">
        <span class="password-icon">{{ showPassword ? '👁️' : '👁️‍🗨️' }}</span>
      </div>
    </div>

    <!-- Mensaje de error -->
    <div v-if="errorMessage && showError" class="error-text">
      <span class="error-icon">⚠️</span>
      {{ errorMessage }}
    </div>

    <!-- Mensaje de éxito -->
    <div v-if="successMessage && showSuccess" class="success-text">
      <span class="success-icon">✅</span>
      {{ successMessage }}
    </div>

    <!-- Texto de ayuda -->
    <div v-if="helpText" class="help-text">
      {{ helpText }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) =>
      ['text', 'email', 'password', 'number', 'tel', 'url', 'search'].includes(value),
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
  errorMessage: {
    type: String,
    default: '',
  },
  successMessage: {
    type: String,
    default: '',
  },
  helpText: {
    type: String,
    default: '',
  },
  showError: {
    type: Boolean,
    default: true,
  },
  showSuccess: {
    type: Boolean,
    default: true,
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  maxlength: {
    type: [String, Number],
    default: null,
  },
  minlength: {
    type: [String, Number],
    default: null,
  },
  min: {
    type: [String, Number],
    default: null,
  },
  max: {
    type: [String, Number],
    default: null,
  },
  step: {
    type: [String, Number],
    default: null,
  },
  id: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'input'])

const showPassword = ref(false)
const isFocused = ref(false)

// ID único para el input
const inputId = computed(() => {
  return props.id || `input-${Math.random().toString(36).substr(2, 9)}`
})

// Mostrar toggle de contraseña
const showPasswordToggle = computed(() => {
  return props.type === 'password'
})

// Tipo de input actual (cambia para password toggle)
const currentType = computed(() => {
  if (props.type === 'password' && showPassword.value) {
    return 'text'
  }
  return props.type
})

// Estados de validación
const hasError = computed(() => {
  return !!(props.errorMessage && props.showError)
})

const hasSuccess = computed(() => {
  return !!(props.successMessage && props.showSuccess)
})

// Métodos
const handleInput = (event) => {
  const value = event.target.value
  emit('update:modelValue', value)
  emit('input', event)
}

const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}

const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// Actualizar el tipo de input cuando cambie showPassword
watch(showPassword, () => {
  const input = document.getElementById(inputId.value)
  if (input) {
    input.type = currentType.value
  }
})
</script>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-sm);
}

.input-label {
  font-family: var(--font-primary);
  font-weight: bold;
  color: var(--color-black);
  margin-bottom: var(--space-sm);
  font-size: var(--text-sm);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.required-asterisk {
  color: var(--color-accent);
  font-weight: bold;
  font-size: var(--text-lg);
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-field {
  width: 100%;
  padding: var(--space-md);
  border: 3px solid var(--color-dark);
  border-radius: var(--radius-md);
  font-family: var(--font-primary);
  font-size: var(--text-base);
  background: var(--color-white);
  color: var(--color-black);
  outline: none;
  box-shadow: inset 2px 2px 4px rgba(47, 27, 20, 0.2);
  transition: var(--transition-base);
}

.input-field:focus {
  border-color: var(--color-primary);
  background: var(--color-white);
  box-shadow:
    inset 2px 2px 4px rgba(47, 27, 20, 0.2),
    0 0 0 3px var(--color-primary-light);
  transform: translate(-1px, -1px);
}

.input-field:hover:not(:disabled):not(:focus) {
  border-color: var(--color-primary-dark);
  transform: translate(-1px, -1px);
}

/* Estados */
.input-error {
  border-color: var(--color-accent) !important;
  background: rgba(242, 75, 58, 0.1) !important;
  animation: retro-shake 0.5s ease-in-out;
}

.input-error:focus {
  border-color: var(--color-accent) !important;
  box-shadow:
    inset 2px 2px 4px rgba(242, 75, 58, 0.2),
    0 0 0 3px var(--color-accent-light) !important;
}

.input-success {
  border-color: var(--color-success) !important;
  background: rgba(107, 156, 93, 0.1) !important;
}

.input-success:focus {
  border-color: var(--color-success) !important;
  box-shadow:
    inset 2px 2px 4px rgba(107, 156, 93, 0.2),
    0 0 0 3px var(--color-success-light) !important;
}

.input-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: var(--color-gray) !important;
  color: var(--color-dark-gray) !important;
  transform: none !important;
}

.input-disabled:hover {
  border-color: var(--color-dark);
  transform: none;
}

/* Toggle de contraseña */
.password-toggle {
  position: absolute;
  right: var(--space-md);
  cursor: pointer;
  user-select: none;
  padding: var(--space-xs);
  border-radius: var(--radius-sm);
  background: var(--color-secondary-light);
  border: 2px solid var(--color-dark);
  transition: var(--transition-bounce);
}

.password-toggle:hover {
  background: var(--color-secondary);
  transform: translate(-1px, -1px);
  box-shadow: var(--shadow-sm);
}

.password-icon {
  font-size: var(--text-lg);
  color: var(--color-black);
}

/* Mensajes */
.error-text {
  color: var(--color-accent);
  font-family: var(--font-primary);
  font-size: var(--text-xs);
  font-weight: bold;
  margin-top: var(--space-xs);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.success-text {
  color: var(--color-success);
  font-family: var(--font-primary);
  font-size: var(--text-xs);
  font-weight: bold;
  margin-top: var(--space-xs);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.help-text {
  color: var(--color-dark-gray);
  font-family: var(--font-secondary);
  font-size: var(--text-xs);
  font-style: italic;
  margin-top: var(--space-xs);
  line-height: 1.4;
}

.error-icon,
.success-icon {
  font-size: var(--text-sm);
}

/* Responsive */
@media (max-width: 480px) {
  .input-field {
    padding: 12px;
    font-size: 0.95rem;
  }

  .input-label {
    font-size: 0.85rem;
  }

  .password-toggle {
    right: 10px;
  }

  .password-icon {
    font-size: 1.1rem;
  }
}

/* Animaciones */
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-4px);
  }
  75% {
    transform: translateX(4px);
  }
}

.input-error {
  animation: shake 0.3s ease-in-out;
}
</style>
