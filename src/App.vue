<script setup>
import { onMounted } from 'vue'
import { appConfig } from './config'

onMounted(() => {
  // Aplicar el título de la app
  document.title = appConfig.name

  // Agregar meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', appConfig.description)
  } else {
    const meta = document.createElement('meta')
    meta.name = 'description'
    meta.content = appConfig.description
    document.getElementsByTagName('head')[0].appendChild(meta)
  }
})
</script>

<template>
  <div id="app" class="retro-app">
    <router-view />
  </div>
</template>

<style>
/* Estilos específicos de la app (el tema se inyecta automáticamente) */
#app {
  min-height: 100vh;
  background: var(--gradient-dark);
  font-family: var(--font-body);
  color: var(--color-white);
}

.retro-app {
  position: relative;
  overflow-x: hidden;
}

/* Patrón de fondo retro opcional */
.retro-app::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(circle at 25% 25%, var(--color-primary) 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, var(--color-secondary) 2px, transparent 2px);
  background-size: 50px 50px;
  opacity: 0.03;
  z-index: -1;
  pointer-events: none;
}

/* Scrollbar personalizada retro */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: var(--color-black);
  border-radius: var(--radius-md);
}

::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: var(--radius-md);
  border: 2px solid var(--color-black);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-primary-dark);
}

/* Firefox */
html {
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary) var(--color-black);
}
</style>
