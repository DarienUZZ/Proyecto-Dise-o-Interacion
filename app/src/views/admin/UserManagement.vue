<template>
  <div class="user-management">
    <!-- Header -->
    <div class="page-header mb-4">
      <h1 class="page-title">User Management</h1>

      <div class="header-actions">
        <!-- Search -->
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input
            type="text"
            class="form-control"
            placeholder="Search users..."
            v-model="searchQuery"
          />
        </div>

        <!-- Status Filter -->
        <select class="form-select status-filter" v-model="statusFilter">
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Suspended">Suspended</option>
        </select>

        <!-- Add User Button -->
        <router-link to="/admin/users/add" class="btn add-user">
          <i class="fas fa-plus me-2"></i>
          Add User
        </router-link>
      </div>
    </div>

    <!-- Users Table -->
    <div class="card">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th style="width: 50px">
                  <input type="checkbox" class="form-check-input" />
                </th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th style="width: 120px">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id">
                <td>
                  <input type="checkbox" class="form-check-input" />
                </td>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img
                      :src="user.avatar"
                      :alt="user.fullName"
                      class="user-avatar"
                    />
                    <span class="fw-medium">{{ user.fullName }}</span>
                  </div>
                </td>
                <td class="text-muted">{{ user.email }}</td>
                <td>
                  <span class="badge" :class="getRoleBadgeClass(user.role)">
                    {{ user.role }}
                  </span>
                </td>
                <td>
                  <span class="badge" :class="getStatusBadgeClass(user.status)">
                    {{ user.status }}
                  </span>
                </td>
                <td class="text-muted small">
                  {{ formatDate(user.lastLogin) }}
                </td>
                <td>
                  <div class="action-buttons">
                    <router-link
                      :to="`/admin/users/edit/${user.id}`"
                      class="btn-action btn-edit"
                      title="Edit User"
                    >
                      <i class="fas fa-edit"></i>
                    </router-link>
                    <button
                      class="btn-action btn-delete"
                      title="Delete User"
                      @click="confirmDelete(user)"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination-container mt-4">
      <div class="pagination-info">
        Showing {{ filteredUsers.length }} users
      </div>
      <nav>
        <ul class="pagination mb-0">
          <li class="page-item disabled">
            <a class="page-link" href="#">Previous</a>
          </li>
          <li class="page-item active">
            <a class="page-link" href="#">1</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">2</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">3</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Swal from "sweetalert2";

const searchQuery = ref("");
const statusFilter = ref("");

// Datos de usuarios
const users = ref([
  {
    id: 1,
    fullName: "Darien Umaña Zúñiga",
    email: "dariumana04@gmail.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "2024-01-15 09:23:45",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    fullName: "Victor Salgado Martinez",
    email: "victorsm@gmail.com",
    role: "Administrator",
    status: "Active",
    lastLogin: "2024-01-14 14:45:12",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    fullName: "Benjamin Vega Fonseca",
    email: "BenjaF@gmail.com",
    role: "Customer",
    status: "Inactive",
    lastLogin: "2024-01-10 11:30:22",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    fullName: "David Kim",
    email: "david.kim@example.com",
    role: "Customer",
    status: "Active",
    lastLogin: "2024-01-15 16:20:33",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 5,
    fullName: "Lisa Thompson",
    email: "lisa.thompson@example.com",
    role: "Customer",
    status: "Suspended",
    lastLogin: "2024-01-05 08:15:44",
    avatar:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 6,
    fullName: "James Wilson",
    email: "james.wilson@example.com",
    role: "Customer",
    status: "Active",
    lastLogin: "2024-01-15 10:45:18",
    avatar:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 7,
    fullName: "Maria Garcia",
    email: "maria.garcia@example.com",
    role: "Customer",
    status: "Active",
    lastLogin: "2024-01-14 13:22:57",
    avatar:
      "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 8,
    fullName: "Robert Brown",
    email: "robert.brown@example.com",
    role: "Customer",
    status: "Inactive",
    lastLogin: "2024-01-08 17:40:29",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 9,
    fullName: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    role: "Customer",
    status: "Active",
    lastLogin: "2024-01-15 07:55:11",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 10,
    fullName: "Thomas Anderson",
    email: "thomas.anderson@example.com",
    role: "Customer",
    status: "Active",
    lastLogin: "2024-01-15 12:30:05",
    avatar:
      "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 11,
    fullName: "Amanda White",
    email: "amanda.white@example.com",
    role: "Customer",
    status: "Suspended",
    lastLogin: "2024-01-03 15:18:42",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 12,
    fullName: "Christopher Taylor",
    email: "christopher.taylor@example.com",
    role: "Customer",
    status: "Active",
    lastLogin: "2024-01-14 19:25:36",
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
  },
]);

// Usuarios filtrados
const filteredUsers = computed(() => {
  let filtered = users.value;

  // Filtrar por búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (user) =>
        user.fullName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
  }

  // Filtrar por estado
  if (statusFilter.value) {
    filtered = filtered.filter((user) => user.status === statusFilter.value);
  }

  return filtered;
});

// Funciones
const editUser = (user) => {
  console.log("Edit user:", user);
  // Aquí abrirás un modal o navegarás a otra página
};

const deleteUser = (user) => {
  const index = users.value.findIndex((u) => u.id === user.id);
  if (index !== -1) {
    users.value.splice(index, 1);
  }
};

// Alerta delete
const confirmDelete = (user) => {
  Swal.fire({
    title: "Delete User",
    html: `Are you sure you want to delete <strong>${user.fullName}</strong>?<br>This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    reverseButtons: true,
    customClass: {
      confirmButton: "swal-confirm-btn",
      cancelButton: "swal-cancel-btn",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      deleteUser(user);
      Swal.fire("Deleted!", "The user has been deleted.", "success");
    }
  });
};

const getRoleBadgeClass = (role) => {
  const classes = {
    "Super Admin": "badge-admin",
    Administrator: "badge-manager",
    Customer: "badge-editor",
  };
  return classes[role] || "badge-viewer";
};

const getStatusBadgeClass = (status) => {
  const classes = {
    Active: "badge-success",
    Inactive: "badge-warning",
    Suspended: "badge-danger",
  };
  return classes[status] || "badge-secondary";
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }) +
    " " +
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
};
</script>

<style scoped>
.user-management {
  animation: fadeIn 0.3s ease;
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

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

/* Search Box */
.search-box {
  position: relative;
  width: 300px;
}

.search-box i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
}

.search-box input {
  padding-left: 2.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  height: 42px;
}

/* Status Filter */
.status-filter {
  width: 150px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  height: 42px;
}

/* Add User Button */
.add-user {
  background-color: var(--primary-color, #3b82f6);
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 42px;
}

.add-user:hover {
  background-color: var(--primary-hover, #2563eb);
  color: white;
  transform: translateY(-1px);
}

/* Table */
.card {
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.table thead th {
  color: var(--text-dark);
  font-weight: 600;
  border-bottom: 2px solid var(--border-color);
  padding: 1rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 12px;
}

.table tbody td {
  padding: 1rem;
  vertical-align: middle;
  border-bottom: 1px solid var(--border-color);
}

.table tbody tr:last-child td {
  border-bottom: none;
}

.table tbody tr:hover {
  background-color: var(--bg-light);
}

/* User Avatar */
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

/* Badges */
.badge {
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-admin {
  background-color: rgba(147, 51, 234, 0.1);
  color: rgb(147, 51, 234);
}

.badge-manager {
  background-color: rgba(59, 130, 246, 0.1);
  color: rgb(59, 130, 246);
}

.badge-editor {
  background-color: rgba(16, 185, 129, 0.1);
  color: rgb(16, 185, 129);
}

.badge-viewer {
  background-color: rgba(107, 114, 128, 0.1);
  color: rgb(107, 114, 128);
}

.badge-success {
  background-color: rgba(16, 185, 129, 0.1);
  color: rgb(16, 185, 129);
}

.badge-warning {
  background-color: rgba(245, 158, 11, 0.1);
  color: rgb(245, 158, 11);
}

.badge-danger {
  background-color: rgba(239, 68, 68, 0.1);
  color: rgb(239, 68, 68);
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-action {
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.btn-edit {
  color: var(--primary-color, #3b82f6);
}

.btn-edit:hover {
  background-color: rgba(59, 130, 246, 0.1);
}

.btn-delete {
  color: var(--danger-color, #ef4444);
}

.btn-delete:hover {
  background-color: rgba(239, 68, 68, 0.1);
}

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-info {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.pagination .page-link {
  color: var(--text-dark);
  border: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  margin: 0 0.25rem;
}

.pagination .page-item.active .page-link {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.pagination .page-link:hover {
  background-color: var(--bg-light);
}

/* Responsive */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-actions {
    width: 100%;
    flex-direction: column;
  }

  .search-box,
  .status-filter {
    width: 100%;
  }

  .user-avatar {
    width: 35px;
    height: 35px;
  }

  .pagination-container {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
