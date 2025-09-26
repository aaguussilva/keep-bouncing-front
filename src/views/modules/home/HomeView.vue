<template>
  <div class="home-container">
    <!-- Header con perfil -->
    <ProfileHeader />

    <!-- Contenido principal -->
    <main class="main-content">
      <div class="home-content">
        <!-- Espacio vacío listo para contenido futuro -->
      </div>
    </main>

    <!-- Navegación inferior -->
    <NavigationBar />
  </div>
</template>

<script setup>
import ProfileHeader from '../../../components/shared/ProfileHeader.vue'
import NavigationBar from '../../../components/shared/NavigationBar.vue'
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-dark);
  position: relative;
}

.home-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(circle at 25% 25%, var(--color-primary) 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, var(--color-secondary) 2px, transparent 2px);
  background-size: 40px 40px;
  opacity: 0.05;
  pointer-events: none;
}

.main-content {
  flex: 1;
  padding: var(--space-lg);
  padding-top: calc(80px + var(--space-lg)); /* Espacio para header */
  padding-bottom: calc(80px + var(--space-lg)); /* Espacio para navegación */
  overflow-y: auto;
}

.home-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-content {
    padding: var(--space-md);
    padding-top: calc(70px + var(--space-md));
    padding-bottom: calc(70px + var(--space-md));
  }

  .welcome-title {
    font-size: var(--text-2xl);
  }

  .placeholder-card {
    padding: var(--space-xl);
  }
}
</style>
