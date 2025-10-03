<template>
  <div class="home-view">
    <ProfileHeader />

    <main class="home-view-main">
      <div>
        <!-- Espacio vacío listo para contenido futuro -->
      </div>
    </main>

    <NavigationBar />
  </div>
</template>

<script setup>
import ProfileHeader from '../../../components/shared/ProfileHeader.vue'
import NavigationBar from '../../../components/shared/NavigationBar.vue'
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

.home-view-main {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 20px; /* Ajustar según la altura real de NavigationBar */
}

.home-view :deep(nav) {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
