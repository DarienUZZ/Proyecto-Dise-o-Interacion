<template>
  <div class="product-management">
    <!-- Header -->
    <div class="page-header mb-4">
      <h1 class="page-title">Roles & Permissions</h1>

      <div class="header-actions">
        <!-- Search -->
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input
            type="text"
            class="form-control"
            placeholder="Search roles..."
            v-model="searchQuery"
          />
        </div>

        <!-- staus Filter -->
        <select class="form-select stock-filter" v-model="stockFilter">
          <option value="">All Status</option>
          <option value="high">Active</option>
          <option value="medium">Inactive</option>
          <option value="low">Suspended</option>
        </select>

        <!-- Add role Button -->
        <router-link to="/admin/roles/add" class="btn add-role">
          <i class="fas fa-plus me-2"></i>
          Add Role
        </router-link>
      </div>
    </div>

    <!-- Products Table -->
    <div class="card">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th style="width: 50px">
                  <input type="checkbox" class="form-check-input" />
                </th>
                <th>Rol</th>
                <th>Description</th>
                <th>Permissions</th>
                <th>Users</th>
                <th>Status</th>
                <th style="width: 120px">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="role in filteredRoles" :key="role.id">
                <td><input type="checkbox" class="form-check-input" /></td>

                <!-- Rol-->
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <span class="text-muted">{{ role.role }}</span>
                  </div>
                </td>

                <!-- Description -->
                <td class="text-muted">{{ role.description }}</td>

                <!-- Permissions (muestra cnt o lista corta) -->
                <td class="text-muted">
                  <span v-if="role.permissions.length <= 2">{{
                    role.permissions.join(", ")
                  }}</span>
                  <span v-else>{{ role.permissions.length }} permissions</span>
                </td>

                <!-- Users -->
                <td>
                  <span v-if="role.users.length">{{
                    role.users.join(", ")
                  }}</span>
                  <span v-else class="text-muted">No users</span>
                </td>

                <!-- Status -->
                <td>
                  <span
                    class="badge"
                    :class="getStatusBadgeClass(role.status)"
                    >{{ role.status }}</span
                  >
                </td>

                <!-- Actions -->
                <td>
                  <div class="action-buttons">
                    <!-- <router-link
                      :to="`/admin/roles/edit/${role.id}`"
                      class="btn-action btn-edit"
                      title="Edit"
                    >
                      <i class="fas fa-edit"></i>
                    </router-link> -->
                    <button
                      class="btn-action btn-delete"
                      title="Delete"
                      @click="confirmDelete(role)"
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
        Showing {{ filteredRoles.length }} of {{ roles.length }} roles
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
const stockFilter = ref("");

// Datos de productos
const roles = ref([
  {
    id: 1,
    role: "Administrator",
    description:
      "Has full control over the online store, including user and role management, system configuration, products, orders, and overall store operations.",
    permissions: [
      "users:*",
      "roles:*",
      "settings:*",
      "products:*",
      "orders:*",
      "reports:*",
    ],
    users: ["Darien Umaña Zuñiga"],
    status: "Active",
  },
  {
    id: 2,
    role: "Seller",
    description:
      "Manages products and customer orders in the online store, including order processing and reviewing sales reports.",
    permissions: [
      "products:read",
      "products:update",
      "orders:read",
      "orders:update",
      "reports:read",
    ],
    users: ["Victor Salgado Martinez"],
    status: "Active",
  },
  {
    id: 3,
    role: "Customer",
    description:
      "Access to personal account features. Can create and manage their own reservations, view history, and update personal information.",
    permissions: [
      "profile:read",
      "profile:update",
      "reservations:create",
      "reservations:read",
    ],
    users: ["Benjamin Vega Fonseca"],
    status: "Inactive",
  },
  {
    id: 4,
    role: "Customer",
    description:
      "Access to personal account features. Can create and manage their own reservations, view history, and update personal information.",
    permissions: [
      "profile:read",
      "profile:update",
      "reservations:create",
      "reservations:read",
    ],
    users: ["David Kim"],
    status: "Active",
  },
  {
    id: 5,
    role: "Customer",
    description:
      "Access to personal account features. Can create and manage their own reservations, view history, and update personal information.",
    permissions: [
      "profile:read",
      "profile:update",
      "reservations:create",
      "reservations:read",
    ],
    users: ["Lisa Thompson"],
    status: "Suspended",
  },
  {
    id: 6,
    role: "Customer",
    description:
      "Access to personal account features. Can create and manage their own reservations, view history, and update personal information.",
    permissions: [
      "profile:read",
      "profile:update",
      "reservations:create",
      "reservations:read",
    ],
    users: ["James Wilson"],
    status: "Active",
  },
  {
    id: 7,
    role: "Customer",
    description:
      "Access to personal account features. Can create and manage their own reservations, view history, and update personal information.",
    permissions: [
      "profile:read",
      "profile:update",
      "reservations:create",
      "reservations:read",
    ],
    users: ["Maria Garcia"],
    status: "Active",
  },
  {
    id: 8,
    role: "Customer",
    description:
      "Access to personal account features. Can create and manage their own reservations, view history, and update personal information.",
    permissions: [
      "profile:read",
      "profile:update",
      "reservations:create",
      "reservations:read",
    ],
    users: ["Robert Brown"],
    status: "Inactive",
  },
]);

// Productos filtrados
const filteredRoles = computed(() => {
  let filtered = roles.value;

  // Filtrar por búsqueda
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.role.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.permissions.join(" ").toLowerCase().includes(q) ||
        r.users.join(" ").toLowerCase().includes(q)
    );
  }

  // Filtrar por stock
  if (stockFilter.value) {
    const sf = stockFilter.value;
    filtered = filtered.filter((r) => {
      if (sf === "high") return r.status.toLowerCase() === "active";
      if (sf === "medium") return r.status.toLowerCase() === "inactive";
      if (sf === "low") return r.status.toLowerCase() === "suspended";
      return true;
    });
  }

  return filtered;
});

const getStatusBadgeClass = (status) => {
  const s = status.toLowerCase();
  if (s === "active") return "badge-success";
  if (s === "inactive") return "badge-warning";
  if (s === "suspended") return "badge-danger";
  return "badge-default";
};

// Funciones de eliminación
const deleteRole = (role) => {
  const index = roles.value.findIndex((r) => r.id === roles.id);
  if (index !== -1) {
    roles.value.splice(index, 1);
  }
};

const confirmDelete = (role) => {
  Swal.fire({
    title: "Delete Product",
    html: `Are you sure you want to delete <strong>${product.name}</strong>?<br>This action cannot be undone.`,
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
      deleteRole(role);
      Swal.fire("Deleted!", "The product has been deleted.", "success");
    }
  });
};
</script>

<style scoped>
.product-management {
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

/* Filters */
.category-filter,
.stock-filter {
  width: 150px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  height: 42px;
}

/* Add Product Button */
.add-role {
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

.add-role:hover {
  background-color: var(--primary-hover, #2563eb);
  color: white;
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

/* Product Image */
.product-img {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
}

/* Badges */
.badge {
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
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
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
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
  .category-filter,
  .stock-filter {
    width: 100%;
  }

  .product-img {
    width: 40px;
    height: 40px;
  }

  .pagination-container {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
