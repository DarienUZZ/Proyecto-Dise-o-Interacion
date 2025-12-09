<template>
  <div class="dashboard">
    <!-- Page Title -->
    <h1 class="page-title mb-4">Reports & Activity log</h1>

    <!-- Stats Cards Row -->
    <div class="row g-3 mb-4">
      <div class="col-12 col-sm-6 col-xl-3">
        <StatsCard
          title="Total Sales"
          value="$12.00"
          icon="money"
          iconColor="#10b981"
        />
      </div>
      <div class="col-12 col-sm-6 col-xl-3">
        <StatsCard
          title="Total Orders"
          value="350"
          subtitle="Orders"
          icon="receipt"
          iconColor="#f59e0b"
        />
      </div>
      <div class="col-12 col-sm-6 col-xl-3">
        <StatsCard
          title="New Customers"
          value="40"
          subtitle="New"
          icon="user"
          iconColor="#3b82f6"
        />
      </div>
      <div class="col-12 col-sm-6 col-xl-3">
        <StatsCard
          title="Refunds"
          value="5"
          icon="refund"
          iconColor="#ef4444"
        />
      </div>
    </div>

    <!-- Charts Row -->
    <div class="row g-3 mb-4">
      <!-- Sales Over Time Chart -->
      <div class="col-12 col-xl-6">
        <div class="card h-100">
          <div class="card-body p-3 p-md-4">
            <h5 class="card-title mb-3">Sales Over Time</h5>
            <SalesOverTimeChart />
          </div>
        </div>
      </div>

      <!-- Orders by Category Chart -->
      <div class="col-12 col-xl-6">
        <div class="card h-100">
          <div class="card-body p-3 p-md-4">
            <h5 class="card-title mb-3">Orders by Category</h5>
            <OrdersByCategoryChart />
          </div>
        </div>
      </div>
    </div>

    <!-- Customer Growth and Activity Log Row -->
    <div class="row g-3">
      <!-- Customer Growth Chart -->
      <div class="col-12 col-xl-6">
        <div class="card h-100">
          <div class="card-body p-3 p-md-4">
            <h5 class="card-title mb-3">Customer Growth</h5>
            <CustomerGrowthChart />
          </div>
        </div>
      </div>

      <!-- Activity Log Table -->
      <div class="col-12 col-xl-6">
        <div class="card h-100">
          <div class="card-body p-3 p-md-4">
            <h5 class="card-title mb-3">Activity Log</h5>
            <ActivityLogTable />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import StatsCard from "../../components/admin/reports/StatsCard.vue";
import SalesOverTimeChart from "../../components/admin/reports/SalesOverTimeChart.vue";
import OrdersByCategoryChart from "../../components/admin/reports/OrdersByCategoryChart.vue";
import CustomerGrowthChart from "../../components/admin/reports/CustomerGrowthChart.vue";
import ActivityLogTable from "../../components/admin/reports/ActivityLogTable.vue";
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

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-dark, #2d3748);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 1.5rem;
  }

  .card-body {
    padding: 1rem !important;
  }
}

@media (max-width: 576px) {
  .dashboard {
    padding: 0 0.5rem;
  }

  .page-title {
    font-size: 1.25rem;
  }
}
</style>