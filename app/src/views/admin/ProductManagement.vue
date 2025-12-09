<template>
  <div class="product-management">
    <!-- Header -->
    <div class="page-header mb-4">
      <h1 class="page-title">Product Management</h1>

      <div class="header-actions">
        <!-- Search -->
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input
            type="text"
            class="form-control"
            placeholder="Search products..."
            v-model="searchQuery"
          />
        </div>

        <!-- Category Filter -->


        <!-- Stock Filter -->
        <select class="form-select stock-filter" v-model="stockFilter">
          <option value="">All Stock</option>
          <option value="high">High Stock</option>
          <option value="medium">Medium Stock</option>
          <option value="low">Low Stock</option>
          <option value="out">Out of Stock</option>
        </select>

        <!-- Add Product Button -->
        <router-link to="/admin/products/add" class="btn add-product">
          <i class="fas fa-plus me-2"></i>
          Add Product
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
                <th>Name</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th style="width: 120px">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in filteredProducts" :key="product.id">
                <td>
                  <input type="checkbox" class="form-check-input" />
                </td>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img
                      :src="product.image"
                      :alt="product.name"
                      class="product-img"
                    />
                    <span class="text-muted">{{ product.name }}</span>
                  </div>
                </td>
                <td class="text-muted">{{ product.sku }}</td>
                <td class="text-muted">${{ product.price }}</td>
                <td>
                  <span class="badge" :class="getStockBadgeClass(product.stock)">
                    {{ product.stock }}
                  </span>
                </td>
                <td>
                  <span class="badge" :class="getCategoryBadgeClass(product.category)">
                    {{ product.category }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <router-link
                      :to="`/admin/products/edit/${product.id}`"
                      class="btn-action btn-edit"
                      title="Edit"
                    >
                      <i class="fas fa-edit"></i>
                    </router-link>
                    <button
                      class="btn-action btn-delete"
                      title="Delete"
                      @click="confirmDelete(product)"
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
      <div class="pagination-info">Showing {{ filteredProducts.length }} of {{ products.length }} products</div>
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
const categoryFilter = ref("");
const stockFilter = ref("");

// Datos de productos
const products = ref([
  {
    id: 1,
    name: "Heavy Fleece 90s Hoodie",
    sku: "UY3749",
    price: "99.10",
    stock: 49,
    category: "Hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Classic Cotton T-Shirt",
    sku: "CT2890",
    price: "29.99",
    stock: 125,
    category: "T-Shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "Denim Jacket Blue",
    sku: "DJ5621",
    price: "149.99",
    stock: 15,
    category: "Jackets",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    name: "Cargo Pants Khaki",
    sku: "CP8934",
    price: "79.50",
    stock: 67,
    category: "Pants",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=100&h=100&fit=crop",
  },
  {
    id: 5,
    name: "Sneakers White",
    sku: "SW1122",
    price: "119.99",
    stock: 89,
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop",
  },
  {
    id: 6,
    name: "Baseball Cap Black",
    sku: "BC7788",
    price: "24.99",
    stock: 200,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=100&h=100&fit=crop",
  },
  {
    id: 7,
    name: "Wool Beanie Grey",
    sku: "WB3344",
    price: "19.99",
    stock: 8,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=100&h=100&fit=crop",
  },
  {
    id: 8,
    name: "Leather Belt Brown",
    sku: "LB9900",
    price: "45.00",
    stock: 34,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=100&h=100&fit=crop",
  },
  {
    id: 9,
    name: "Running Shorts Navy",
    sku: "RS4567",
    price: "34.99",
    stock: 112,
    category: "Shorts",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=100&h=100&fit=crop",
  },
  {
    id: 10,
    name: "Premium Sweatpants",
    sku: "PS8891",
    price: "59.99",
    stock: 0,
    category: "Pants",
    image: "https://images.unsplash.com/photo-1542272454315-7ad49baa5de3?w=100&h=100&fit=crop",
  },
  {
    id: 11,
    name: "Winter Gloves",
    sku: "WG4455",
    price: "35.50",
    stock: 5,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=100&h=100&fit=crop",
  },
  {
    id: 12,
    name: "Sports Jacket",
    sku: "SJ6677",
    price: "89.99",
    stock: 25,
    category: "Jackets",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop",
  }
]);

// Productos filtrados
const filteredProducts = computed(() => {
  let filtered = products.value;

  // Filtrar por búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  }

  // Filtrar por stock
  if (stockFilter.value) {
    filtered = filtered.filter(product => {
      switch (stockFilter.value) {
        case 'high':
          return product.stock > 50;
        case 'medium':
          return product.stock >= 20 && product.stock <= 50;
        case 'low':
          return product.stock > 0 && product.stock < 20;
        case 'out':
          return product.stock === 0;
        default:
          return true;
      }
    });
  }

  return filtered;
});

// Funciones para los badges
const getStockBadgeClass = (stock) => {
  if (stock === 0) return 'badge-out-of-stock';
  if (stock < 20) return 'badge-low-stock';
  if (stock <= 50) return 'badge-medium-stock';
  return 'badge-high-stock';
}

const getCategoryBadgeClass = (category) => {
  const classes = {
    'Hoodies': 'badge-hoodies',
    'T-Shirts': 'badge-tshirts',
    'Jackets': 'badge-jackets',
    'Pants': 'badge-pants',
    'Shoes': 'badge-shoes',
    'Accessories': 'badge-accessories',
    'Shorts': 'badge-shorts'
  }
  return classes[category] || 'badge-default';
}

// Funciones de eliminación
const deleteProduct = (product) => {
  const index = products.value.findIndex(p => p.id === product.id);
  if (index !== -1) {
    products.value.splice(index, 1);
  }
};

const confirmDelete = (product) => {
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
      deleteProduct(product);
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
.add-product {
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

.add-product:hover {
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

/* Stock Badges */
.badge-high-stock {
  background-color: rgba(16, 185, 129, 0.1);
  color: rgb(16, 185, 129);
}

.badge-medium-stock {
  background-color: rgba(245, 158, 11, 0.1);
  color: rgb(245, 158, 11);
}

.badge-low-stock {
  background-color: rgba(239, 68, 68, 0.1);
  color: rgb(239, 68, 68);
}

.badge-out-of-stock {
  background-color: rgba(107, 114, 128, 0.1);
  color: rgb(107, 114, 128);
}

/* Category Badges */
.badge-hoodies {
  background-color: rgba(139, 92, 246, 0.1);
  color: rgb(139, 92, 246);
}

.badge-tshirts {
  background-color: rgba(59, 130, 246, 0.1);
  color: rgb(59, 130, 246);
}

.badge-jackets {
  background-color: rgba(16, 185, 129, 0.1);
  color: rgb(16, 185, 129);
}

.badge-pants {
  background-color: rgba(245, 158, 11, 0.1);
  color: rgb(245, 158, 11);
}

.badge-shoes {
  background-color: rgba(236, 72, 153, 0.1);
  color: rgb(236, 72, 153);
}

.badge-accessories {
  background-color: rgba(99, 102, 241, 0.1);
  color: rgb(99, 102, 241);
}

.badge-shorts {
  background-color: rgba(20, 184, 166, 0.1);
  color: rgb(20, 184, 166);
}

.badge-default {
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