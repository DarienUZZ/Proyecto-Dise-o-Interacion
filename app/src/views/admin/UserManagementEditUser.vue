<template>
  <div class="user-edit">
    <!-- Page Header -->
    <div class="page-header mb-4">
      <div>
        <h1 class="page-title mb-1">Edit Users</h1>
        <p class="page-subtitle text-muted">
          Edit information and edit products
        </p>
      </div>
    </div>

    <!-- Form -->
    <div>
      <!-- Main Content Row -->
      <div class="row g-4 mb-4">
        <!-- Left Column - Profile Image -->
        <div class="col-lg-5">
          <div class="image-upload-section">
            <label class="form-label mb-3">Edit your profile image</label>
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
                <p class="upload-text mb-0">Profile Image</p>
              </div>

              <div v-else class="image-preview">
                <img :src="imagePreview" alt="Product Preview" />
                <button
                  v-if="imagePreview"
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
        </div>

        <!-- Right Column - Form Fields -->
        <div class="col-lg-7">
          <div class="fields-container">
            <!-- Full Name -->
            <div class="mb-2"> <!-- Cambiado de mb-3 a mb-2 -->
              <label for="fullName" class="form-label">Full Name</label>
              <input
                type="text"
                class="form-control"
                id="fullName"
                v-model="formData.fullName"
                required
              />
            </div>

            <!-- Role -->
            <div class="mb-2"> <!-- Cambiado de mb-3 a mb-2 -->
              <label for="role" class="form-label">Role</label>
              <select
                class="form-control"
                id="role"
                v-model="formData.role"
                required
              >
                <option value="">Select Role</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Administrator">Administrator</option>
                <option value="Customer">Customer</option>
              </select>
            </div>

            <!-- Status -->
            <div class="mb-2"> <!-- Cambiado de mb-0 a mb-2 -->
              <label for="status" class="form-label">Status</label>
              <select
                class="form-control"
                id="status"
                v-model="formData.status"
                required
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="d-grid">
        <button @click="saveUser" class="btn btn-primary-custom btn-lg">
          Edit User
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const fileInput = ref(null);
const imagePreview = ref(null);
const isDragOver = ref(false);

const formData = ref({
  fullName: "",
  email: "",
  role: "",
  status: "",
  image: null,
});

// Cargar datos del usuario al montar el componente
onMounted(() => {
  const userId = route.params.id;
  loadUserData(userId);
});

const loadUserData = (userId) => {
  // Simular carga de datos
  // En producción, esto vendría de una API
  const mockUser = {
    id: userId,
    fullName: null,
    role: null,
    status: null,
    avatar: null
  };

  formData.value.fullName = mockUser.fullName;
  formData.value.email = mockUser.email;
  formData.value.role = mockUser.role;
  formData.value.status = mockUser.status;
  imagePreview.value = mockUser.avatar;
};

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

const saveUser = () => {
  // Validación
  if (
    !formData.value.fullName ||
    !formData.value.email ||
    !formData.value.role ||
    !formData.value.status
  ) {
    alert("Please fill all required fields");
    return;
  }

  console.log("User data:", formData.value);
  alert("User updated successfully!");
  router.push("/admin/users");
};
</script>


<style scoped>
.user-edit {
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
  height: 100%;
}

.image-upload-container {
  width: 100%;
  height: 250px;
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

/* Fields Container - AJUSTADO para menos espacio entre campos */
.fields-container {
  display: flex;
  flex-direction: column;
  /* Reducido el espacio entre elementos */
  gap: 1rem; /* Agregado para controlar el espacio entre campos */
  height: 100%;
  justify-content: flex-start; /* Cambiado de space-between a flex-start */
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
@media (max-width: 991px) {
  .page-title {
    font-size: 1.5rem;
  }

  /* En móviles, la imagen va entre los campos y el botón */
  .col-lg-5 {
    order: 2;
    margin-top: 1.5rem;
  }

  .col-lg-7 {
    order: 1;
  }

  .image-upload-container {
    height: 300px;
  }

  .upload-icon {
    font-size: 3rem;
  }

  .fields-container {
    justify-content: flex-start;
  }

  .d-grid {
    order: 3;
    margin-top: 1.5rem;
  }
}
</style>