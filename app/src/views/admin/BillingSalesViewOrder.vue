<template>
  <div class="view-order">
    <!-- Page Header -->
    <div class="page-header mb-4">
      <h1 class="page-title mb-2">View Order</h1>
      <h2 class="order-number mb-2">Order #9999 - Order Details</h2>
      <p class="order-meta">
        Created: September 19, 2025 | 11:38 AM | Customer IP: 152.231.162.140
      </p>
    </div>

    <!-- Three Column Top Section -->
    <div class="row g-4 mb-5">
      <!-- General Column -->
      <div class="col-lg-4">
        <div class="info-card-simple">
          <h3 class="card-title-simple">General</h3>
          <div class="card-content-simple">
            <div class="simple-row-1">
              <div class="order-number-badge">#9999</div>
            </div>
            <div class="simple-row">
              <span class="simple-label">Order Date</span>
              <span class="simple-value">19/09/2025</span>
            </div>
            <div class="simple-row">
              <span class="simple-label">Status</span>
              <span class="simple-value">Completed</span>
            </div>
            <div class="customer-info-simple">
              <div class="customer-name">Darien Umaña Zúñiga</div>
              <div class="customer-email">dariumana04@gmail.com</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Billing Column -->
      <div class="col-lg-4">
        <div class="info-card-simple">
          <h3 class="card-title-simple">Billing</h3>
          <div class="card-content-simple">
            <div class="billing-line">
              <span class="billing-label-simple">Name:</span>
              <span class="billing-value-simple">Darien Umaña</span>
            </div>
            <div class="billing-line">
              <span class="billing-label-simple">Email:</span>
              <span class="billing-value-simple">dariumana04@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Shipping Column -->
      <div class="col-lg-4">
        <div class="info-card-simple">
          <h3 class="card-title-simple">Shipping</h3>
          <div class="card-content-simple shipping-content-simple">
            <div class="no-shipping-simple">No shipping address set</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Two Column Bottom Section -->
    <div class="row g-4">
      <!-- Left Column - Order Items -->
      <div class="col-lg-7">
        <div class="info-card-simple">
          <h3 class="card-title-simple">Order Items</h3>
          <div class="card-content-simple">
            <!-- Tabla de productos estilo imagen -->
            <div class="order-items-table">
              <div class="table-header">
                <div class="header-cell">Product (Item)</div>
                <div class="header-cell">Cost</div>
                <div class="header-cell">Qty</div>
                <div class="header-cell">Total</div>
              </div>
              
              <div class="table-row">
                <div class="table-cell">
                  <div class="product-info">
                    <span class="product-name">Heavy Fleece 90s Hoodie</span>
                  </div>
                </div>
                <div class="table-cell">
                  <span class="product-cost">$99,10</span>
                </div>
                <div class="table-cell">
                  <span class="product-qty">1</span>
                </div>
                <div class="table-cell">
                  <span class="product-total">$99,10</span>
                </div>
              </div>
            </div>

            <!-- Sales Tax -->
            <div class="tax-section">
              <span class="tax-label">Sales Tax (13%)</span>
              <span class="tax-value">$12.88</span>
            </div>

            <!-- Coupons Section -->
            <div class="coupon-section">
              <div class="coupon-header">
                <span class="coupon-label">Coupon(s)</span>
              </div>
              <div class="coupon-details">
                <div class="coupon-info">
                  <span class="coupon-code">WELCOME10</span>
                  <span class="coupon-discount">(-$25.25)</span>
                  <button class="btn-edit-coupon">Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Order Summary -->
      <div class="col-lg-5">
        <div class="info-card-simple">
          <h3 class="card-title-simple">Order Summary</h3>
          <div class="card-content-simple">
            <div class="summary-list">
              <div class="summary-item">
                <span class="summary-label">Cost</span>
                <span class="summary-value">$99,10</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Tax</span>
                <span class="summary-value">$12.88</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Coupons</span>
                <span class="summary-value negative">-$25.25</span>
              </div>
              <div class="summary-item total-item">
                <span class="summary-label">Order Total</span>
                <span class="summary-value total">$86.73</span>
              </div>
            </div>
            <div class="payment-date">
              Payment Date: September 19, 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style scoped>
.view-order {
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

/* Page Header */
.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0;
}

.order-number {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-dark);
  margin: 0;
}

.order-meta {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin: 0;
}

/* Info Cards - Simple Style */
.info-card-simple {
  background: white;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.card-title-simple {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0;
  padding: 1.25rem 1.5rem;
  background: white;
  border-bottom: none;
}

.card-content-simple {
  padding: 0 1.5rem 1.5rem 1.5rem;
}
.simple-row-1{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    background: var(--bg-light);
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 6px;
    margin-bottom: 0.5rem;
}
/* General Section */
.simple-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  padding-left: 1rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.simple-label {
  font-weight: 600;
  color: var(--text-dark);
  font-size: 0.95rem;
}

.simple-value {
  color: var(--text-dark);
  font-size: 0.95rem;
  background-color: var(--bg-light);
  padding: 0.75rem;
  border-radius: 6px;
}

.order-number-badge {
  background: var(--bg-light);
  color: var(--text-dark);
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  display: inline-block;
}

.customer-info-simple {
  margin-top: 1rem;
}

.customer-name {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 0.25rem;
}

.customer-email {
  font-size: 0.9rem;
  color: var(--text-muted);
}

/* Billing Section */
.billing-line {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 0;
}

.billing-label-simple {
  font-weight: 600;
  color: var(--text-dark);
  min-width: 50px;
}

.billing-value-simple {
  color: var(--text-dark);
}

/* Shipping Section */
.shipping-content-simple {
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-shipping-simple {
  color: var(--text-muted);
  font-size: 0.95rem;
  text-align: center;
}

/* Status Badge */
.badge {
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-completed {
  background-color: rgba(16, 185, 129, 0.1);
  color: rgb(16, 185, 129);
}

/* ========== ORDER ITEMS TABLE (ESTILO IMAGEN) ========== */
.order-items-table {
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  font-weight: bolder;
  font-size: 0.9rem;
  color: var(--text-dark);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.header-cell {
  padding: 1rem;
}

.header-cell:last-child {
  border-right: none;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  background-color: var(--bg-light);
}

.table-cell {
  padding: 1rem;
  border-right: 1px solid var(--border-light);
  display: flex;
  align-items: center;
}

.table-cell:last-child {
  border-right: none;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 0.95rem;
  color: var(--text-dark);
  margin-bottom: 0.25rem;
}

.product-cost,
.product-total {
  font-size: 1rem;
  color: var(--text-dark);
}

.product-qty {
  font-size: 1rem;
  color: var(--text-dark);
}

/* Sales Tax Section */
.tax-section {
  display: grid;
  grid-template-columns: auto 1fr; /* Etiqueta | Valor alineado */
  align-items: center;
  padding: 1rem;
  background-color: var(--bg-light);
  border-radius: 8px;
  margin-bottom: 1rem;
}

.tax-label {
  font-weight: 600;
  color: var(--text-dark);
  font-size: 0.95rem;
}

.tax-value {
  color: var(--text-dark);
  font-size: 1rem;
  text-align: right;
  margin-left: auto;
  width: 80px; /* Mismo ancho que la columna TOTAL */
}

/* Coupon Section */
.coupon-section {
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--bg-light);
}

.coupon-header {
  background-color: var(--bg-light);
  padding: 1rem;
}

.coupon-label {
  font-weight: 600;
  color: var(--text-dark);
  font-size: 0.95rem;
    font-weight: bolder;

}

.coupon-details {
  padding: 1rem;
}

.coupon-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.coupon-code {
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
}

.coupon-discount {
  color: var(--danger-color);
  font-weight: 600;
  font-size: 0.95rem;
  margin-left: auto;
}

.btn-edit-coupon {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.35rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-edit-coupon:hover {
  background-color: var(--primary-hover);
}

/* ========== ORDER SUMMARY ========== */
.summary-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--border-light);
}

.summary-label {
  font-weight: 600;
  color: var(--text-dark);
  font-size: 0.95rem;
}

.summary-value {
  color: var(--text-dark);
  font-size: 1rem;
}

.summary-value.negative {
  color: var(--danger-color);
}

.total-item {
  border-color: var(--primary-color);
}

.total-item .summary-label,
.total-item .summary-value {
  font-weight: 700;
}

.total-item .summary-value.total {
  font-size: 1.25rem;
}

.payment-date {
  border-top: 1px solid var(--border-light);
  color: var(--text-muted);
  font-size: 0.9rem;
    padding: 0.75rem;

}

/* Responsive */
@media (max-width: 991px) {
  .page-title {
    font-size: 1.5rem;
  }

  .order-number {
    font-size: 1.25rem;
  }

  .order-items-table {
    font-size: 0.9rem;
  }

  .header-cell,
  .table-cell {
    padding: 0.75rem;
  }

  .product-name {
    font-size: 0.9rem;
  }

  .coupon-info {
    gap: 0.5rem;
  }
}

@media (max-width: 768px) {
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
  }

  .header-cell,
  .table-cell {
    border-right: none;
    border-bottom: 1px solid var(--border-light);
    padding: 0.75rem 1rem;
  }

  .header-cell:last-child,
  .table-cell:last-child {
    border-bottom: none;
  }

  .product-info {
    flex-direction: column;
  }

  .coupon-info {
    align-items: flex-start;
    gap: 0.5rem;
  }

  .btn-edit-coupon {
    margin-left: 0;
    width: 100%;
  }
}

@media (max-width: 576px) {
  .card-title-simple {
    padding: 1rem;
    font-size: 1rem;
  }

  .card-content-simple {
    padding: 0 1rem 1rem 1rem;
  }

  .order-meta {
    font-size: 0.85rem;
  }
    .coupon-info {
    align-items: flex-start;
    gap: 0.5rem 7rem;
  }
}
</style>