<template>
  <nav class="navbar">
    <div class="navbar-content">
      <!-- Left Section: Toggle + Search -->
      <div class="navbar-left">
        <!-- Toggle Button (Hamburger) - Solo visible en tablet/móvil -->
        <button class="btn-toggle" @click="toggleSidebar">
          <i class="fas fa-bars"></i>
        </button>

        <!-- Search Bar -->
        <div class="search-container">
          <i class="fas fa-search search-icon"></i>
          <input
            type="text"
            class="form-control search-input"
            placeholder="Search anything"
            v-model="searchQuery"
          />
        </div>
      </div>

      <div class="navbar-right">
        <!-- Notifications -->
        <button class="btn-icon" title="Notifications">
          <i class="fa-solid fa-bell"></i>
          <span class="badge-notification">3</span>
        </button>

        <!-- User Profile -->
        <div class="dropdown">
          <button
            class="btn-profile dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://ui-avatars.com/api/?name=Darien+Umana&background=8b5cf6&color=fff"
              alt="User"
              class="profile-img"
            />
            <div class="profile-info">
              <span class="profile-role">Administrator</span>
              <span class="profile-name">Darien Umaña</span>
            </div>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <a class="dropdown-item" href="#">
                <i class="bi bi-person-circle me-2"></i>Profile
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                <i class="bi bi-gear me-2"></i>Settings
              </a>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a class="dropdown-item text-danger" href="#">
                <i class="bi bi-box-arrow-right me-2"></i>Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const emit = defineEmits(["toggle-sidebar"]);
const searchQuery = ref("");

const toggleSidebar = () => {
  emit("toggle-sidebar");
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 260px;
  right: 0;
  height: 70px;
  background-color: var(--navbar-bg);
  border-bottom: 1px solid var(--border-color);
  z-index: 999;
  transition: left 0.3s ease;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 1.5rem;
  gap: 1rem;
  width: 100%;
}

/* Left Section */
.navbar-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Right Section */
.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Toggle Button - Oculto en desktop */
.btn-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-dark);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  flex-shrink: 0;
}

.btn-toggle:hover {
  background-color: var(--bg-light);
}

/* Search Bar */
.search-container {
  position: relative;
  width: 300px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-size: 1rem;
}

.search-input {
  padding-left: 2.75rem;
  border: 0px;
  height: 42px;
  width: 100%;
  border-radius: 8px;
  background: var(--bg-light);
}

.search-input:focus {
  outline: none;
  background: white;
  box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.1);
}

/* Icon Buttons */
.btn-icon {
  position: relative;
  background: none;
  border: none;
  font-size: 1.25rem;
  color: var(--text-dark);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  flex-shrink: 0;
}

.btn-icon:hover {
  background-color: var(--bg-light);
}

.badge-notification {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background-color: var(--danger-color);
  color: white;
  border-radius: 10px;
  padding: 0.15rem 0.4rem;
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 1;
}

/* Profile Button */
.btn-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.btn-profile:hover {
  background-color: var(--bg-light);
}

.btn-profile::after {
  display: none;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  line-height: 1.3;
}

.profile-role {
  font-size: 0.75rem;
  color: var(--primary-color);
  font-weight: 400;
}

.profile-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-dark);
}

/* Dropdown Menu */
.dropdown-menu {
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 0.5rem;
  margin-top: 0.5rem;
}

.dropdown-item {
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.dropdown-item:hover {
  background-color: var(--bg-light);
}

.dropdown-item i {
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  /* Mostrar botón hamburguesa en tablet/móvil */
  .btn-toggle {
    display: block;
  }

  .navbar {
    left: 0;
  }

  .search-container {
    max-width: 200px;
  }

  .profile-info {
    display: none;
  }
}

@media (max-width: 576px) {
  .navbar-content {
    padding: 0 1rem;
  }

  .search-container {
    display: none;
  }

  .navbar-left {
    gap: 0.5rem;
  }
}
</style>