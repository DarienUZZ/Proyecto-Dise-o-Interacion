<template>
  <div class="role-add">
    <!-- Page Header -->
    <div class="page-header mb-4">
      <div>
        <h1 class="page-title mb-1">New Role</h1>
        <p class="page-subtitle text-muted">
          Add information and add new roles
        </p>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="saveRole">
      <div class="row g-4 mb-4">
        <!-- Role Name -->
        <div class="col-md-4">
          <label for="roleName" class="form-label">Role Name</label>
          <input
            type="text"
            class="form-control"
            id="roleName"
            v-model="formData.roleName"
            required
          />
        </div>

        <!-- Permissions -->
        <div class="col-md-4">
          <label for="permission" class="form-label">Permissions</label>
          <input
            type="text"
            class="form-control"
            id="roleName"
            v-model="formData.roleName"
            required
          />
        </div>

        <!-- Status -->
        <div class="col-md-4">
          <label for="status" class="form-label">Status</label>
          <select
            class="form-control"
            id="status"
            v-model="formData.status"
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <!-- Description -->
        <div class="col-12">
          <label for="description" class="form-label">Description</label>
          <textarea
            class="form-control"
            id="description"
            v-model="formData.description"
            rows="6"
          ></textarea>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="d-grid">
        <button type="submit" class="btn btn-primary-custom btn-lg">
          Add new role
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const formData = ref({
  roleName: "",
  permissions: [],
  status: "active",
  description: "",
});

const saveRole = () => {
  // Validación
  if (
    !formData.value.roleName ||
    formData.value.permissions.length === 0 ||
    !formData.value.status
  ) {
    alert("Please fill all required fields");
    return;
  }

  console.log("Role data:", formData.value);
  alert("Role added successfully!");
  router.push("/admin/roles");
};
</script>

<style scoped>
.role-add {
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

/* Textarea */
textarea.form-control {
  resize: vertical;
  min-height: 150px;
}

/* Select multiple */
select[multiple].form-control {
  min-height: 120px;
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
  
  .col-md-4 {
    margin-bottom: 1rem;
  }
}
</style>