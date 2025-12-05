<template>
  <div class="dashboard">
    <!-- Page Title -->
    <h1 class="page-title mb-4">Dashboard</h1>

    <!-- Stats Cards Row -->
    <div class="row g-3 mb-4">
      <!-- Total Sales Chart -->
      <div class="col-12 col-xl-6">
        <div class="card h-100">
          <div class="card-body p-3 p-md-4">
            <h5 class="card-title mb-3">Total Sales</h5>
            <TotalSalesChart />
          </div>
        </div>
      </div>

      <!-- Average Order Chart -->
      <div class="col-12 col-xl-6">
        <div class="card h-100">
          <div class="card-body p-3 p-md-4">
            <h5 class="card-title mb-3">Average Order</h5>
            <AverageOrderChart />
          </div>
        </div>
      </div>
    </div>

    <!-- Metrics Cards Row -->
    <div class="row g-3 mb-4">
      <!-- Orders Card -->
      <div class="col-12 col-sm-6 col-lg-6">
        <div class="card h-100">
          <div class="card-body p-3">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div class="">
                <h6 class="card-subtitle text-muted mb-1">Orders</h6>
                <h2 class="metric-value mb-0">320</h2>
              </div>
              <div class="text-end">
                  <i class="variation-orders me-1">↑4.63%</i> 
                <p class="text-muted small mb-0 mt-1">vs. last week</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Customers Card -->
      <div class="col-12 col-sm-6 col-lg-6">
        <div class="card h-100">
          <div class="card-body p-3">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div class="">
                <h6 class="card-subtitle text-muted mb-1">Customer</h6>
                <h2 class="metric-value mb-0">194</h2>
              </div>
              <div class="text-end">
                  <i class="variation-orders me-1">↑4.63%</i>
                <p class="text-muted small mb-0 mt-1">vs. last week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Orders Table -->
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body p-3 p-md-4">
            <h5 class="card-title mb-3">Recent orders</h5>
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Customer</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in recentOrders" :key="order.id">
                    <td>
                      <a
                        href="#"
                        class="text-primary-custom fw-semibold text-decoration-none"
                      >
                        {{ order.id }}
                      </a>
                    </td>
                    <td>{{ order.date }}</td>
                    <td>
                      <span class="badge bg-success">{{ order.status }}</span>
                    </td>
                    <td>{{ order.customer }}</td>
                    <td class="fw-semibold">{{ order.total }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TotalSalesChart from "../../components/admin/dashboard/TotalSalesChart.vue";
import AverageOrderChart from "../../components/admin/dashboard/AverageOrderChart.vue";

const recentOrders = ref([
  {
    id: "#9999",
    date: "02/11/2025",
    status: "Paid",
    customer: "Darien Umaña Zuñiga",
    total: "596.75 USD",
  },
  {
    id: "#9998",
    date: "01/11/2025",
    status: "Paid",
    customer: "Darien Umaña Zuñiga",
    total: "100.75 USD",
  },
]);
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

.card {
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  background: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-dark, #2d3748);
}

.card-subtitle {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-muted, #718096);
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-dark, #2d3748);
  line-height: 1.2;
}

.badge {
  font-size: 0.7rem;
  padding: 0.3rem 0.6rem;
  font-weight: 600;
  border-radius: 6px;
}
.variation-orders {
  color: var(--success-color, #38a169);
  font-weight:500;
  font-style: normal;
}

.table {
  margin-bottom: 0;
  font-size: 0.875rem;
}

.table thead th {
  background-color: var(--bg-light, #f7fafc);
  color: var(--text-dark, #2d3748);
  font-weight: 600;
  border-bottom: 2px solid var(--border-color, #e2e8f0);
  padding: 0.75rem 1rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table tbody td {
  padding: 0.75rem 1rem;
  color: var(--text-dark, #4a5568);
  border-bottom: 1px solid var(--border-color, #e2e8f0);
}

.table tbody tr:last-child td {
  border-bottom: none;
}

.table tbody tr:hover {
  background-color: var(--bg-light, #f7fafc);
}

/* Responsive mejorado */
@media (max-width: 768px) {
  .page-title {
    font-size: 1.5rem;
  }

  .metric-value {
    font-size: 1.75rem;
  }

  .card-body {
    padding: 1rem !important;
  }

  .table {
    font-size: 0.8rem;
  }

  .table thead th,
  .table tbody td {
    padding: 0.5rem 0.75rem;
  }
}

@media (max-width: 576px) {
  .dashboard {
    padding: 0 0.5rem;
  }

  .page-title {
    font-size: 1.25rem;
  }

  .metric-value {
    font-size: 1.5rem;
  }

  .col-12.col-sm-6 {
    margin-bottom: 1rem;
  }
}
</style>
