<template>
  <button :disabled="disabled" @click="$emit('click', $event)">
    <span v-if="!loading">
      <slot />
    </span>
    <span v-else>
      <div></div>
      Cargando...
    </span>
  </button>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])
</script>

<style scoped></style>
