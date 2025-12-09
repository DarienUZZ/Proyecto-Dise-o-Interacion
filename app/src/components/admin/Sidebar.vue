<template>
  <div class="sidebar" :class="{ 'sidebar-open': isOpen }">
    <div class="sidebar-header">
      <h5 class="sidebar-title">{{ isOpen ? "Administrator" : "A" }}</h5>

      <!-- Botón de cerrar solo visible en móvil -->
      <button class="btn-close-sidebar" @click="handleClose">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <nav class="sidebar-nav">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="sidebar-item"
        :class="{ active: $route.path === item.path }"
        @click="handleItemClick"
      >
        <i :class="item.icon"></i>
        <span class="sidebar-label">{{ item.label }}</span>

        <!-- Tooltip para estado cerrado -->
        <div class="tooltip-sidebar">{{ item.label }}</div>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const handleClose = () => {
  emit("close");
};

const handleItemClick = () => {
  // Cerrar sidebar en móvil al hacer click en un item
  if (window.innerWidth <= 768) {
    emit("close");
  }
};

const menuItems = [
  { path: "/admin/dashboard", icon: "fas fa-th-large", label: "Dashboard" },
  { path: "/admin/products", icon: "fas fa-box", label: "Product Management" },
  { path: "/admin/users", icon: "fas fa-users", label: "User Management" },
  {
    path: "/admin/billing",
    icon: "fa-solid fa-receipt",
    label: "Billing & Sales",
  },
  {
    path: "/admin/reports",
    icon: "fas fa-chart-bar",
    label: "Reports & Activity Log",
  },
  {
    path: "/admin/support",
    icon: "fa-solid fa-comment-dots",
    label: "Support & Communication",
  },
  {
    path: "/admin/roles",
    icon: "fas fa-shield-alt",
    label: "Roles & Permissions",
  },
];
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 260px;
  background-color: var(--sidebar-bg);
  color: black;
  transition: transform 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: black;
  white-space: nowrap;
  transition: opacity 0.3s ease;
}

/* Botón de cerrar - oculto en desktop */
.btn-close-sidebar {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-dark);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.btn-close-sidebar:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: var(--danger-color);
}

.sidebar-nav {
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
}

.sidebar-item {
  display: flex;
  align-items: center;
  padding: 0.875rem 1.25rem;
  color: black;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  gap: 0.75rem;
  position: relative;
  border: none;
  background: none;
  cursor: pointer;
  margin: 0 0.5rem;
  border-radius: 12px;
}

.sidebar-item.active {
  background-color: white;
  color: var(--primary-color, #8b5cf6);
  border: 2px;
  font-weight: 600;
  padding: 0.75rem 0.875rem;
  margin: 0 0.75rem;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
  background-color: var(--primary-color, #8b5cf6);
}

.sidebar-item i {
  font-size: 1.25rem;
  min-width: 24px;
  text-align: center;
  flex-shrink: 0;
}

.sidebar-label {
  transition: opacity 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
}

.sidebar-item:hover {
  background-color: var(--sidebar-hover);
  color: var(--primary-color);
}

.sidebar-item.active {
  background-color: var(--primary-color, #8b5cf6);
  color: white;
}

/* Tooltip */
.tooltip-sidebar {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1001;
  margin-left: 10px;
  pointer-events: none;
}

/* Scrollbar personalizado */
.sidebar::-webkit-scrollbar {
  width: 4px;
}

.sidebar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
}

.sidebar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* Responsive - Tablet y Móvil */
@media (max-width: 768px) {
  /* Mostrar botón de cerrar en móvil */
  .btn-close-sidebar {
    display: block;
  }

  /* Sidebar oculto por defecto en móvil */
  .sidebar {
    transform: translateX(-100%);
  }

  /* Sidebar visible cuando está abierto */
  .sidebar.sidebar-open {
    transform: translateX(0);
  }
}
</style>
