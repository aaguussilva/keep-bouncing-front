<template>
  <div class="app-container">
    <div class="dashboard-container">
      <DashboardCard />
    </div>
  </div>
</template>

<script setup>
import DashboardCard from '../../../components/modules/dashboard/DashboardCard.vue'
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: var(--color-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: var(--font-body);
  position: relative;
}

.app-container::before {
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

.dashboard-container {
  width: 100%;
  max-width: 400px;
}

/* Responsive Design */
@media (max-width: 480px) {
  .app-container {
    padding: 15px;
  }
}
</style>
