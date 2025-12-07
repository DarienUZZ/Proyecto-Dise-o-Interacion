<template>
  <div class="dashboard">
    <!-- Page Title -->
    <h1 class="page-title mb-4">Support & Communication</h1>
    
    <!-- Componente de Chat de Soporte -->
    <SupportChat />
  </div>
</template>

<script setup>
import SupportChat from '../../components/admin/support/SupportChat.vue';
</script>

<style scoped>
.dashboard {
  animation: fadeIn 0.3s ease;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-dark, #2d3748);
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 1.5rem;
  }
}
</style>