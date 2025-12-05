<template>
  <div class="product-add">
    <!-- Page Header -->
    <div class="page-header mb-4">
      <div>
        <h1 class="page-title mb-1">New Product</h1>
        <p class="page-subtitle text-muted">
          Add information and add new products
        </p>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="saveProduct">
      <div class="row g-4 mb-4">
        <!-- Product Name -->
        <div class="col-md-6">
          <label for="productName" class="form-label">Product Name</label>
          <input
            type="text"
            class="form-control"
            id="productName"
            v-model="formData.name"
            required
          />
        </div>

        <!-- SKU -->
        <div class="col-md-6">
          <label for="sku" class="form-label">SKU</label>
          <input
            type="text"
            class="form-control"
            id="sku"
            v-model="formData.sku"
            required
          />
        </div>

        <!-- Price -->
        <div class="col-md-6">
          <label for="price" class="form-label">Price</label>
          <input
            type="number"
            class="form-control"
            id="price"
            v-model="formData.price"
            step="0.01"
            required
          />
        </div>

        <!-- Stock -->
        <div class="col-md-6">
          <label for="stock" class="form-label">Stock</label>
          <input
            type="number"
            class="form-control"
            id="stock"
            v-model="formData.stock"
            required
          />
        </div>

        <!-- Category -->
        <div class="col-md-6">
          <label for="category" class="form-label">Category</label>
          <input
            type="text"
            class="form-control"
            id="category"
            v-model="formData.category"
            required
          />
        </div>

        <!-- Description -->
        <div class="col-md-6">
          <label for="description" class="form-label">Description</label>
          <input
            type="text"
            class="form-control"
            id="description"
            v-model="formData.description"
          />
        </div>
      </div>

      <!-- Product Image Upload Area -->
      <div class="image-upload-section mb-4">
        <div
          class="image-upload-container"
          @click="triggerFileInput"
          @dragover.prevent="handleDragOver"
          @dragleave.prevent="handleDragLeave"
          @drop.prevent="handleDrop"
          :class="{ 'drag-over': isDragOver }"
        >
          <div v-if="!imagePreview" class="upload-placeholder">
            <i class="fas fa-cloud-upload-alt upload-icon mb-3"></i>
            <p class="upload-text mb-0">Product Image</p>
          </div>

          <div v-else class="image-preview">
            <img :src="imagePreview" alt="Product Preview" />
            <button
              type="button"
              class="btn-remove-image"
              @click.stop="removeImage"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <input
          type="file"
          ref="fileInput"
          class="d-none"
          accept="image/*"
          @change="handleImageUpload"
        />
      </div>

      <!-- Submit Button -->
      <div class="d-grid">
        <button type="submit" class="btn btn-primary-custom btn-lg">
          Add new product
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const fileInput = ref(null);
const imagePreview = ref(null);
const isDragOver = ref(false);

const formData = ref({
  name: "",
  sku: "",
  price: "",
  stock: "",
  category: "",
  description: "",
  image: null,
});

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    processImage(file);
  }
};

const handleDragOver = () => {
  isDragOver.value = true;
};

const handleDragLeave = () => {
  isDragOver.value = false;
};

const handleDrop = (event) => {
  isDragOver.value = false;
  const file = event.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    processImage(file);
  }
};

const processImage = (file) => {
  formData.value.image = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const removeImage = () => {
  formData.value.image = null;
  imagePreview.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const saveProduct = () => {
  // Validación
  if (
    !formData.value.name ||
    !formData.value.sku ||
    !formData.value.price ||
    !formData.value.stock ||
    !formData.value.category
  ) {
    alert("Please fill all required fields");
    return;
  }

  console.log("Product data:", formData.value);
  alert("Product added successfully!");
  router.push("/admin/products");
};
</script>

<style scoped>
.product-add {
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

/* Image Upload Section */
.image-upload-section {
  margin-top: 2rem;
}

.image-upload-container {
  width: 100%;
  height: 300px;
  background-color: #ffffff;
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.image-upload-container:hover {
  border-color: var(--primary-color);
  background-color: rgba(139, 92, 246, 0.02);
}

.image-upload-container.drag-over {
  border-color: var(--primary-color);
  background-color: rgba(139, 92, 246, 0.05);
  border-style: solid;
}

/* Upload Placeholder */
.upload-placeholder {
  text-align: center;
  padding: 2rem;
}

.upload-icon {
  font-size: 4rem;
  color: var(--text-muted);
  opacity: 0.5;
}

.upload-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
}

/* Image Preview */
.image-preview {
  width: 100%;
  height: 100%;
  position: relative;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-remove-image {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  background-color: rgba(239, 68, 68, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.btn-remove-image:hover {
  background-color: #dc2626;
  transform: scale(1.1);
}

/* Submit Button */
.btn-primary-custom {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
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

  .image-upload-container {
    height: 250px;
  }

  .upload-icon {
    font-size: 3rem;
  }
}
</style>
