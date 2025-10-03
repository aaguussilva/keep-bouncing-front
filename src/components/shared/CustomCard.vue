<template>
  <div>
    <!-- Card Header -->
    <div v-if="$slots.title || $slots.subtitle">
      <h1 v-if="$slots.title">
        <slot name="title" />
      </h1>
      <p v-if="$slots.subtitle">
        <slot name="subtitle" />
      </p>
    </div>

    <!-- Card Content -->
    <div v-if="$slots.default">
      <slot />
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
