<script setup>
import { onMounted } from 'vue'
import { appConfig } from './config'

onMounted(() => {
  document.title = appConfig.name

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
  <div id="app">
    <router-view />
  </div>
</template>
