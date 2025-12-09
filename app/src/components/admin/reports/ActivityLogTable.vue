<template>
  <div class="activity-log">
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="activity in activities" :key="activity.id">
            <td>{{ activity.date }}</td>
            <td>{{ activity.customer }}</td>
            <td>{{ activity.action }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activities = ref([
  {
    id: 1,
    date: "03/09/2025",
    customer: "Darien Umaña Zúñiga",
    action: "Order completed",
  },
  {
    id: 2,
    date: "03/09/2025",
    customer: "Benjamin Vega Fonseca",
    action: "Order placed",
  },
  {
    id: 3,
    date: "03/09/2025",
    customer: "David Kim",
    action: "Payment processed",
  },
  {
    id: 4,
    date: "03/09/2025",
    customer: "Maria Garcia",
    action: "Applied coupon: WELCOME50",
  },
  {
    id: 5,
    date: "03/09/2025",
    customer: "James Wilson",
    action: "Order cancelled",
  },
  {
    id: 6,
    date: "03/09/2025",
    customer: "Victor Salgado Martinez",
    action: "Order marked as shipped",
  },
  {
    id: 7,
    date: "03/09/2025",
    customer: "Jennifer Lee",
    action: "Updated shipping address",
  },
  {
    id: 8,
    date: "03/09/2025",
    customer: "Thomas Anderson",
    action: "Payment failed",
  },
]);
</script>

<style scoped>
.activity-log {
  width: 100%;
}

.table-responsive {
  overflow-x: auto;
}

.table {
  width: 100%;
  margin-bottom: 0;
  font-size: 0.875rem;
}

.table thead th {
  background-color: #f8fafc;
  color: #1e293b;
  font-weight: 600;
  border-bottom: 2px solid #e2e8f0;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  text-align: left;
  white-space: nowrap;
}

.table tbody td {
  padding: 0.875rem 1rem;
  color: #475569;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}

.table tbody tr:last-child td {
  border-bottom: none;
}

.table tbody tr:hover {
  background-color: #f8fafc;
}

@media (max-width: 768px) {
  .table {
    font-size: 0.8125rem;
  }

  .table thead th,
  .table tbody td {
    padding: 0.625rem 0.75rem;
  }
}
</style>
