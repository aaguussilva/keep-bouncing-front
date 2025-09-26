<template>
  <button :type="type" :disabled="disabled" :class="buttonClasses" @click="$emit('click', $event)">
    <span v-if="!loading" class="button-content">
      <slot />
    </span>
    <span v-else class="loading-spinner">
      <div class="spinner"></div>
      {{ loadingText || 'Cargando...' }}
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary', // primary, secondary, accent, success
    validator: (value) => ['primary', 'secondary', 'accent', 'success'].includes(value),
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
    default: '',
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])

const buttonClasses = computed(() => {
  return [
    'retro-button',
    `retro-button--${props.variant}`,
    `retro-button--${props.size}`,
    {
      'retro-button--loading': props.loading,
      'retro-button--disabled': props.disabled,
      'retro-button--full-width': props.fullWidth,
    },
  ]
})
</script>

<style scoped>
.retro-button {
  background: var(--color-primary);
  color: var(--color-black);
  border: 3px solid var(--color-dark);
  border-radius: var(--radius-md);
  font-family: var(--font-primary);
  font-weight: bold;
  font-size: var(--text-base);
  cursor: pointer;
  box-shadow: var(--shadow-retro);
  transition: var(--transition-bounce);
  text-transform: uppercase;
  letter-spacing: 1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  position: relative;
  overflow: hidden;
}

.retro-button:hover:not(:disabled):not(.retro-button--loading) {
  background: var(--color-primary-dark);
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-retro-large);
}

.retro-button:active:not(:disabled):not(.retro-button--loading) {
  transform: translate(2px, 2px);
  box-shadow: var(--shadow-sm);
}

.retro-button:disabled,
.retro-button--disabled,
.retro-button--loading {
  background: var(--color-gray);
  color: var(--color-dark-gray);
  cursor: not-allowed;
  transform: none;
  box-shadow: var(--shadow-base);
}

/* Variants */
.retro-button--primary {
  background: var(--color-primary);
  border-color: var(--color-dark);
}

.retro-button--primary:hover:not(:disabled):not(.retro-button--loading) {
  background: var(--color-primary-dark);
}

.retro-button--secondary {
  background: var(--color-secondary);
  color: var(--color-black);
  border-color: var(--color-dark);
}

.retro-button--secondary:hover:not(:disabled):not(.retro-button--loading) {
  background: var(--color-secondary-dark);
}

.retro-button--accent {
  background: var(--color-accent);
  color: var(--color-white);
  border-color: var(--color-accent-dark);
}

.retro-button--accent:hover:not(:disabled):not(.retro-button--loading) {
  background: var(--color-accent-dark);
}

.retro-button--success {
  background: var(--color-success);
  color: var(--color-white);
  border-color: var(--color-success-dark);
}

.retro-button--success:hover:not(:disabled):not(.retro-button--loading) {
  background: var(--color-success-dark);
}

/* Sizes */
.retro-button--sm {
  padding: var(--space-sm) var(--space-md);
  font-size: var(--text-sm);
}

.retro-button--md {
  padding: var(--space-md) var(--space-lg);
  font-size: var(--text-base);
}

.retro-button--lg {
  padding: var(--space-lg) var(--space-xl);
  font-size: var(--text-lg);
}

/* Full width */
.retro-button--full-width {
  width: 100%;
}

/* Loading state */
.loading-spinner {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid var(--color-dark-gray);
  border-top: 3px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Content wrapper */
.button-content {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

/* Focus styles for accessibility */
.retro-button:focus {
  outline: none;
  box-shadow:
    var(--shadow-retro),
    0 0 0 3px var(--color-primary-light);
}
</style>
