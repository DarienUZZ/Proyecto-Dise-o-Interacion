<template>
  <div class="billing-sales">
    <!-- Header -->
    <div class="page-header mb-4">
      <h1 class="page-title">Billing & Sales</h1>

      <div class="header-actions">
        <!-- Search -->
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input
            type="text"
            class="form-control"
            placeholder="Search orders..."
            v-model="searchQuery"
          />
        </div>

        <!-- Status Filter -->
        <select class="form-select status-filter" v-model="statusFilter">
          <option value="">All Status</option>
          <option value="Delivered">Delivered</option>
          <option value="Onhold">On hold</option>
          <option value="Rejected">Rejected</option>
        </select>

        <!-- Add Order Button -->
        <router-link to="/admin/billing/add" class="btn add-order">
          <i class="fas fa-plus me-2"></i>
          Add Order
        </router-link>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="card">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th style="width: 50px">
                  <input type="checkbox" class="form-check-input" />
                </th>
                <th>Order</th>
                <th>Date</th>
                <th>Status</th>
                <th>Customer</th>
                <th>Total</th>
                <th style="width: 120px">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in filteredOrders" :key="order.id">
                <td>
                  <input type="checkbox" class="form-check-input" />
                </td>
                <td>
                  <span class="fw-medium order-number">{{
                    order.orderNumber
                  }}</span>
                </td>
                <td class="text-muted">{{ order.date }}</td>
                <td>
                  <span
                    class="badge"
                    :class="getStatusBadgeClass(order.status)"
                  >
                    {{ order.status }}
                  </span>
                </td>
                <td>
                  <div class="d-flex align-items-center gap-2">
                    <img
                      v-if="order.customerAvatar"
                      :src="order.customerAvatar"
                      :alt="order.customerName"
                      class="customer-avatar"
                    />
                    <span>{{ order.customerName }}</span>
                  </div>
                </td>
                <td class="fw-semibold">{{ order.total }}</td>
                <td>
                  <div class="action-buttons">
                    <router-link
                      :to="`/admin/billing/view/${order.id}`"
                      class="btn-action btn-view"
                      title="View Order"
                    >
                      <i class="fas fa-eye"></i>
                    </router-link>
                    <button
                      class="btn-action btn-delete"
                      title="Delete Order"
                      @click="confirmDelete(order)"
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
        Showing {{ filteredOrders.length }} orders
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

// Datos de órdenes
const orders = ref([
  {
    id: 1,
    orderNumber: "#001",
    date: "02/11/2025",
    status: "Delivered",
    customerName: "Benjamin Vega Fonseca",
    customerEmail: "BenjaF@gmail.com",
    customerAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    total: "$245.99",
    items: 3,
  },
  {
    id: 2,
    orderNumber: "#002",
    date: "02/11/2025",
    status: "Onhold",
    customerName: "David Kim",
    customerEmail: "david.kim@example.com",
    customerAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    total: "$89.50",
    items: 1,
  },
  {
    id: 3,
    orderNumber: "#003",
    date: "01/11/2025",
    status: "Delivered",
    customerName: "Lisa Thompson",
    customerEmail: "lisa.thompson@example.com",
    customerAvatar:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
    total: "$356.75",
    items: 5,
  },
  {
    id: 4,
    orderNumber: "#004",
    date: "01/11/2025",
    status: "Rejected",
    customerName: "James Wilson",
    customerEmail: "james.wilson@example.com",
    customerAvatar:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
    total: "$120.00",
    items: 2,
  },
  {
    id: 5,
    orderNumber: "#005",
    date: "31/10/2025",
    status: "Delivered",
    customerName: "Maria Garcia",
    customerEmail: "maria.garcia@example.com",
    customerAvatar:
      "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop&crop=face",
    total: "$599.99",
    items: 1,
  },
  {
    id: 6,
    orderNumber: "#006",
    date: "31/10/2025",
    status: "Onhold",
    customerName: "Robert Brown",
    customerEmail: "robert.brown@example.com",
    customerAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    total: "$75.25",
    items: 3,
  },
  {
    id: 7,
    orderNumber: "#007",
    date: "30/10/2025",
    status: "Delivered",
    customerName: "Jennifer Lee",
    customerEmail: "jennifer.lee@example.com",
    customerAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    total: "$189.99",
    items: 2,
  },
  {
    id: 8,
    orderNumber: "#008",
    date: "30/10/2025",
    status: "Delivered",
    customerName: "Thomas Anderson",
    customerEmail: "thomas.anderson@example.com",
    customerAvatar:
      "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?w=150&h=150&fit=crop&crop=face",
    total: "$425.50",
    items: 4,
  },
  {
    id: 9,
    orderNumber: "#009",
    date: "29/10/2025",
    status: "Rejected",
    customerName: "Amanda White",
    customerEmail: "amanda.white@example.com",
    customerAvatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    total: "$65.99",
    items: 1,
  },
  {
    id: 10,
    orderNumber: "#010",
    date: "29/10/2025",
    status: "Delivered",
    customerName: "Christopher Taylor",
    customerEmail: "christopher.taylor@example.com",
    customerAvatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
    total: "$299.99",
    items: 1,
  },
  {
    id: 11,
    orderNumber: "#011",
    date: "28/10/2025",
    status: "Onhold",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.johnson@example.com",
    customerAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    total: "$150.00",
    items: 2,
  },
  {
    id: 12,
    orderNumber: "#012",
    date: "28/10/2025",
    status: "Delivered",
    customerName: "Michael Davis",
    customerEmail: "michael.davis@example.com",
    customerAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    total: "$89.99",
    items: 1,
  },
]);

// Órdenes filtradas
const filteredOrders = computed(() => {
  let filtered = orders.value;

  // Filtrar por búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (order) =>
        order.orderNumber.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.customerEmail.toLowerCase().includes(query)
    );
  }

  // Filtrar por estado
  if (statusFilter.value) {
    filtered = filtered.filter((order) => order.status === statusFilter.value);
  }

  return filtered;
});

// Funciones
const editOrder = (order) => {
  console.log("Edit order:", order);
};

const deleteOrder = (order) => {
  const index = orders.value.findIndex((o) => o.id === order.id);
  if (index !== -1) {
    orders.value.splice(index, 1);
  }
};

// Alerta delete
const confirmDelete = (order) => {
  Swal.fire({
    title: "Delete Order",
    html: `Are you sure you want to delete order <strong>${order.orderNumber}</strong>?<br>This action cannot be undone.`,
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
      deleteOrder(order);
      Swal.fire("Deleted!", "The order has been deleted.", "success");
    }
  });
};

const getStatusBadgeClass = (status) => {
  const classes = {
    Delivered: "badge-success",
    Onhold: "badge-warning",
    Rejected: "badge-danger",
  };
  return classes[status] || "badge-secondary";
};
</script>

<style scoped>
.billing-sales {
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

/* Add Order Button */
.add-order {
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

.add-order:hover {
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

/* Order Number */
.order-number {
  color: var(--primary-color);
  font-weight: 600;
}

/* Customer Avatar */
.customer-avatar {
  width: 32px;
  height: 32px;
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

.badge-secondary {
  background-color: rgba(107, 114, 128, 0.1);
  color: rgb(107, 114, 128);
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

  .customer-avatar {
    width: 28px;
    height: 28px;
  }

  .pagination-container {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
