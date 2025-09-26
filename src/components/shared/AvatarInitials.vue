<template>
  <div
    :class="['avatar-initials', `avatar-${size}`]"
    :style="{ backgroundColor: backgroundColor }"
    :title="fullName"
  >
    <span class="initials-text">{{ initials }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'md', // xs, sm, md, lg, xl
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value),
  },
  customColor: {
    type: String,
    default: '',
  },
})

// Generar iniciales del nombre
const initials = computed(() => {
  if (!props.name) return '?'

  const words = props.name.trim().split(' ')
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase()
  }

  // Tomar primera letra del primer y último nombre
  const firstInitial = words[0].charAt(0).toUpperCase()
  const lastInitial = words[words.length - 1].charAt(0).toUpperCase()

  return firstInitial + lastInitial
})

// Generar color de fondo basado en el nombre
const backgroundColor = computed(() => {
  if (props.customColor) return props.customColor

  // Colores retro de la paleta del tema
  const colors = [
    '#F7E96A', // Amarillo primario
    '#D4C1E0', // Morado secundario
    '#F24B3A', // Rojo accent
    '#6B9C5D', // Verde success
    '#FAF0A4', // Amarillo claro
    '#E6D9F0', // Morado claro
    '#F56B5C', // Rojo claro
    '#8BB07E', // Verde claro
    '#E6D147', // Amarillo oscuro
    '#C4A8D6', // Morado oscuro
  ]

  // Usar el nombre para generar un índice consistente
  let hash = 0
  for (let i = 0; i < props.name.length; i++) {
    hash = props.name.charCodeAt(i) + ((hash << 5) - hash)
  }

  const index = Math.abs(hash) % colors.length
  return colors[index]
})

// Color del texto basado en el fondo
const textColor = computed(() => {
  const bg = backgroundColor.value

  // Colores claros usan texto negro
  const lightColors = ['#F7E96A', '#FAF0A4', '#E6D9F0', '#8BB07E', '#E6D147', '#C4A8D6']

  return lightColors.includes(bg) ? '#2F1B14' : '#FFFFFF'
})

const fullName = computed(() => props.name)
</script>

<style scoped>
.avatar-initials {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-family: var(--font-primary);
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 3px solid var(--color-dark);
  box-shadow: var(--shadow-retro);
  transition: var(--transition-bounce);
  cursor: default;
  user-select: none;
}

.avatar-initials:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-retro-large);
}

.initials-text {
  color: v-bind(textColor);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

/* Tamaños */
.avatar-xs {
  width: 24px;
  height: 24px;
  font-size: 10px;
  border-width: 2px;
}

.avatar-sm {
  width: 32px;
  height: 32px;
  font-size: 12px;
  border-width: 2px;
}

.avatar-md {
  width: 40px;
  height: 40px;
  font-size: 14px;
  border-width: 3px;
}

.avatar-lg {
  width: 56px;
  height: 56px;
  font-size: 18px;
  border-width: 3px;
}

.avatar-xl {
  width: 80px;
  height: 80px;
  font-size: 24px;
  border-width: 4px;
}

/* Estados especiales */
.avatar-initials[title=''] .initials-text,
.avatar-initials[title=' '] .initials-text {
  opacity: 0.6;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .avatar-xs {
    width: 20px;
    height: 20px;
    font-size: 9px;
  }
  .avatar-sm {
    width: 28px;
    height: 28px;
    font-size: 11px;
  }
  .avatar-md {
    width: 35px;
    height: 35px;
    font-size: 13px;
  }
  .avatar-lg {
    width: 48px;
    height: 48px;
    font-size: 16px;
  }
  .avatar-xl {
    width: 64px;
    height: 64px;
    font-size: 20px;
  }
}

/* Animación de entrada */
@keyframes avatarFadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.avatar-initials {
  animation: avatarFadeIn 0.3s ease-out;
}
</style>
