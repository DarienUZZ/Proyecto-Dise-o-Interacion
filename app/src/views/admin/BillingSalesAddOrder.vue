<template>
  <div class="order-add">
    <!-- Page Header -->
    <div class="page-header mb-4">
      <div>
        <h1 class="page-title mb-1">New Order</h1>
        <p class="page-subtitle text-muted">
          Add information and add new orders
        </p>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="saveOrder">
      <div class="row g-4 mb-4">
        <!-- Order Number (auto-generated) -->
        <div class="col-md-6">
          <label for="orderNumber" class="form-label">Order Number</label>
          <input
            type="text"
            class="form-control"
            id="orderNumber"
            v-model="formData.orderNumber"
            required
            disabled
            placeholder="Auto-generated"
          />
        </div>

        <!-- Order Date -->
        <div class="col-md-6">
          <label for="orderDate" class="form-label">Order Date</label>
          <input
            type="date"
            class="form-control"
            id="orderDate"
            v-model="formData.orderDate"
            required
          />
        </div>

        <!-- Customer (Autocomplete) -->
        <div class="col-md-6">
          <label for="customer" class="form-label">Customer</label>
          <div class="autocomplete-wrapper">
            <input
              type="text"
              class="form-control"
              id="customer"
              v-model="formData.customer"
              @input="filterCustomers"
              @focus="showCustomerDropdown = true"
              @blur="hideCustomerDropdown"
              placeholder="Start typing to search customers..."
              required
            />
            <div v-if="showCustomerDropdown && filteredCustomers.length > 0" class="autocomplete-dropdown">
              <div
                v-for="customer in filteredCustomers"
                :key="customer.id"
                class="autocomplete-item"
                @mousedown="selectCustomer(customer)"
              >
                <div class="customer-item">
                  <img :src="customer.avatar" :alt="customer.fullName" class="customer-avatar" />
                  <div>
                    <div class="customer-name">{{ customer.fullName }}</div>
                    <div class="customer-email">{{ customer.email }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Status (Dropdown) -->
        <div class="col-md-6">
          <label for="status" class="form-label">Order Status</label>
          <select
            class="form-control"
            id="status"
            v-model="formData.status"
            required
          >
            <option value="" disabled>Select status</option>
            <option value="Delivered">Delivered</option>
            <option value="Onhold">On hold</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <!-- Product (Autocomplete) -->
        <div class="col-md-6">
          <label for="product" class="form-label">Product</label>
          <div class="autocomplete-wrapper">
            <input
              type="text"
              class="form-control"
              id="product"
              v-model="formData.product"
              @input="filterProducts"
              @focus="showProductDropdown = true"
              @blur="hideProductDropdown"
              placeholder="Start typing to search products..."
              required
            />
            <div v-if="showProductDropdown && filteredProducts.length > 0" class="autocomplete-dropdown">
              <div
                v-for="product in filteredProducts"
                :key="product.id"
                class="autocomplete-item"
                @mousedown="selectProduct(product)"
              >
                <div class="product-item">
                  <img :src="product.image" :alt="product.name" class="product-thumb" />
                  <div>
                    <div class="product-name">{{ product.name }}</div>
                    <div class="product-details">
                      <span class="product-category">{{ product.category }}</span>
                      <span class="product-price">${{ product.price }}</span>
                      <span class="product-stock" :class="{ 'low-stock': product.stock < 10 }">
                        Stock: {{ product.stock }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quantity -->
        <div class="col-md-6">
          <label for="quantity" class="form-label">Quantity</label>
          <input
            type="number"
            class="form-control"
            id="quantity"
            v-model="formData.quantity"
            min="1"
            :max="selectedProduct ? selectedProduct.stock : 999"
            @input="calculateTotal"
            required
          />
          <div v-if="selectedProduct" class="form-text">
            Available stock: {{ selectedProduct.stock }}
          </div>
        </div>

        <!-- Price -->
        <div class="col-md-6">
          <label for="price" class="form-label">Price</label>
          <div class="input-group">
            <span class="input-group-text">$</span>
            <input
              type="text"
              class="form-control"
              id="price"
              :value="selectedProduct ? selectedProduct.price : '0.00'"
              disabled
            />
          </div>
          <div v-if="selectedProduct" class="form-text">
            Unit price
          </div>
        </div>

        <!-- Total -->
        <div class="col-md-6">
          <label for="total" class="form-label">Total</label>
          <div class="input-group">
            <span class="input-group-text">$</span>
            <input
              type="text"
              class="form-control"
              id="total"
              :value="formData.total"
              disabled
            />
          </div>
          <div class="form-text">
            Calculated automatically
          </div>
        </div>
      </div>

      <!-- Notes Textarea (en lugar de imagen) -->
      <div class="textarea-section mb-4">
        <label class="form-label mb-3">Order Notes</label>
        <div class="textarea-container">
          <textarea
            class="form-control notes-textarea"
            v-model="formData.notes"
            placeholder="Add any notes or special instructions for this order..."
            rows="10"
          ></textarea>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="d-grid">
        <button type="submit" class="btn btn-primary-custom btn-lg">
          Add new order
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Datos de formulario
const formData = ref({
  orderNumber: "",
  orderDate: new Date().toISOString().split('T')[0], // Fecha actual
  customer: "",
  customerId: null,
  status: "",
  product: "",
  productId: null,
  quantity: 1,
  total: "0.00",
  notes: ""
});

// Estados para autocomplete
const showCustomerDropdown = ref(false);
const showProductDropdown = ref(false);
const selectedProduct = ref(null);

// Datos de clientes (solo los con rol "Customer")
const customers = ref([
  {
    id: 3,
    fullName: "Benjamin Vega Fonseca",
    email: "BenjaF@gmail.com",
    role: "Customer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    fullName: "David Kim",
    email: "david.kim@example.com",
    role: "Customer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    fullName: "Lisa Thompson",
    email: "lisa.thompson@example.com",
    role: "Customer",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 6,
    fullName: "James Wilson",
    email: "james.wilson@example.com",
    role: "Customer",
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 7,
    fullName: "Maria Garcia",
    email: "maria.garcia@example.com",
    role: "Customer",
    avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 8,
    fullName: "Robert Brown",
    email: "robert.brown@example.com",
    role: "Customer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 9,
    fullName: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    role: "Customer",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 10,
    fullName: "Thomas Anderson",
    email: "thomas.anderson@example.com",
    role: "Customer",
    avatar: "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 11,
    fullName: "Amanda White",
    email: "amanda.white@example.com",
    role: "Customer",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 12,
    fullName: "Christopher Taylor",
    email: "christopher.taylor@example.com",
    role: "Customer",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face"
  }
]);

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

// Computed properties para filtrado
const filteredCustomers = computed(() => {
  if (!formData.value.customer) return customers.value;
  const query = formData.value.customer.toLowerCase();
  return customers.value.filter(customer => 
    customer.fullName.toLowerCase().includes(query) ||
    customer.email.toLowerCase().includes(query)
  );
});

const filteredProducts = computed(() => {
  if (!formData.value.product) return products.value;
  const query = formData.value.product.toLowerCase();
  return products.value.filter(product => 
    product.name.toLowerCase().includes(query) ||
    product.sku.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );
});

// Función para generar número de orden
const generateOrderNumber = () => {
  const lastOrderId = 12; // Basado en los datos de BillingSales
  const nextId = lastOrderId + 1;
  return `#${nextId.toString().padStart(3, '0')}`;
};

// Inicialización
onMounted(() => {
  formData.value.orderNumber = generateOrderNumber();
});

// Funciones para autocomplete de clientes
const filterCustomers = () => {
  showCustomerDropdown.value = true;
};

const hideCustomerDropdown = () => {
  setTimeout(() => {
    showCustomerDropdown.value = false;
  }, 200);
};

const selectCustomer = (customer) => {
  formData.value.customer = customer.fullName;
  formData.value.customerId = customer.id;
  showCustomerDropdown.value = false;
};

// Funciones para autocomplete de productos
const filterProducts = () => {
  showProductDropdown.value = true;
};

const hideProductDropdown = () => {
  setTimeout(() => {
    showProductDropdown.value = false;
  }, 200);
};

const selectProduct = (product) => {
  formData.value.product = product.name;
  formData.value.productId = product.id;
  selectedProduct.value = product;
  showProductDropdown.value = false;
  calculateTotal();
};

// Calcular total
const calculateTotal = () => {
  if (selectedProduct.value && formData.value.quantity > 0) {
    const price = parseFloat(selectedProduct.value.price);
    const quantity = parseInt(formData.value.quantity);
    const total = price * quantity;
    formData.value.total = total.toFixed(2);
  } else {
    formData.value.total = "0.00";
  }
};

// Validar y guardar orden
const saveOrder = () => {
  // Validación
  if (!formData.value.customerId) {
    alert("Please select a customer from the list");
    return;
  }

  if (!formData.value.productId) {
    alert("Please select a product from the list");
    return;
  }

  if (!formData.value.status) {
    alert("Please select an order status");
    return;
  }

  if (formData.value.quantity < 1) {
    alert("Quantity must be at least 1");
    return;
  }

  if (selectedProduct.value && formData.value.quantity > selectedProduct.value.stock) {
    alert(`Cannot order ${formData.value.quantity} items. Only ${selectedProduct.value.stock} available in stock.`);
    return;
  }

  // Preparar datos para enviar
  const orderData = {
    id: parseInt(formData.value.orderNumber.replace('#', '')),
    orderNumber: formData.value.orderNumber,
    date: formData.value.orderDate,
    status: formData.value.status,
    customerName: formData.value.customer,
    customerId: formData.value.customerId,
    productId: formData.value.productId,
    productName: formData.value.product,
    quantity: formData.value.quantity,
    total: formData.value.total,
    notes: formData.value.notes,
    items: 1 // Por ahora solo un producto por orden
  };

  console.log("Order data to save:", orderData);
  alert("Order added successfully!");
  router.push("/admin/billing");
};
</script>

<style scoped>
.order-add {
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
  margin-bottom: 0.25rem;
}

.page-subtitle {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin: 0;
}

/* Form Labels */
.form-label {
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

/* Form Controls */
.form-control {
  border-radius: 8px;
  border: 1px solid var(--border-color);
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.2rem rgba(139, 92, 246, 0.15);
}

.form-text {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

/* Input Group para precios */
.input-group {
  border-radius: 8px;
  overflow: hidden;
}

.input-group-text {
  background-color: #E9ECEF;
  color: var(--text-muted);
}

/* Autocomplete Styles */
.autocomplete-wrapper {
  position: relative;
}

.autocomplete-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
  margin-top: 2px;
}

.autocomplete-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid var(--border-light);
}

.autocomplete-item:last-child {
  border-bottom: none;
}

.autocomplete-item:hover {
  background-color: var(--bg-light);
}

/* Customer Item */
.customer-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.customer-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.customer-name {
  font-weight: 600;
  color: var(--text-dark);
}

.customer-email {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* Product Item */
.product-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-thumb {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
}

.product-name {
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 0.25rem;
}

.product-details {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.product-category {
  background-color: rgba(139, 92, 246, 0.1);
  color: var(--primary-color);
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
}

.product-price {
  color: var(--success-color);
  font-weight: 600;
}

.product-stock {
  font-weight: 500;
}

.low-stock {
  color: var(--danger-color);
}

/* Textarea Section (reemplazo de imagen) */
.textarea-section {
  margin-top: 2rem;
}

.textarea-container {
  width: 100%;
}

.notes-textarea {
  width: 100%;
  min-height: 200px;
  resize: vertical;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* Submit Button */
.btn-primary-custom {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  transition: all 0.3s ease;
}

.btn-primary-custom:hover {
  background-color: var(--primary-hover);
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: 1.5rem;
  }

  .customer-item,
  .product-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .customer-avatar,
  .product-thumb {
    width: 30px;
    height: 30px;
  }

  .product-details {
    flex-direction: column;
    gap: 0.25rem;
  }

  .notes-textarea {
    min-height: 150px;
  }
}

@media (max-width: 576px) {
  .autocomplete-dropdown {
    position: fixed;
    left: 1rem;
    right: 1rem;
    max-height: 200px;
  }
}
</style>