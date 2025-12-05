<template>
  <div class="admin-layout">
    <!-- Overlay para móvil -->
    <div 
      class="sidebar-overlay" 
      :class="{ 'active': isSidebarOpen }"
      @click="closeSidebar"
    ></div>

    <!-- Sidebar -->
    <Sidebar :isOpen="isSidebarOpen" @close="closeSidebar" />

    <!-- Main Content Area -->
    <div class="main-wrapper" :class="{ 'sidebar-open': isSidebarOpen }">
      <!-- Navbar -->
      <Navbar @toggle-sidebar="toggleSidebar" />
      
      <!-- Page Content -->
      <main class="main-content">
        <div class="container-fluid px-3 px-lg-4 py-4">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Sidebar from './Sidebar.vue'
import Navbar from './Navbar.vue'

const isSidebarOpen = ref(true)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  // Solo cerrar en móvil
  if (window.innerWidth <= 768) {
    isSidebarOpen.value = false
  }
}

// Cerrar sidebar al cambiar de ruta en móvil
const handleResize = () => {
  if (window.innerWidth > 768) {
    isSidebarOpen.value = true
  } else {
    isSidebarOpen.value = false
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--bg-light, #f8f9fa);
  position: relative;
}

/* Overlay para móvil */
.sidebar-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Main wrapper */
.main-wrapper {
  flex: 1;
  margin-left: 260px;
  transition: margin-left 0.3s ease;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

/* Main content */
.main-content {
  flex: 1;
  margin-top: 70px;
  min-height: calc(100vh - 70px);
  width: 100%;
  overflow-x: hidden;
  background-color: var(--bg-light, #f8f9fa);
}

/* Responsive para tablets y móviles */
@media (max-width: 768px) {
  /* Overlay activo en móvil */
  .sidebar-overlay.active {
    display: block;
    opacity: 1;
  }

  /* Main wrapper sin margen en móvil */
  .main-wrapper {
    margin-left: 0 !important;
    width: 100%;
  }
}

/* Asegurar que el contenido no se desborde */
.main-content > .container-fluid {
  max-width: 100%;
  overflow-x: hidden;
}
</style>