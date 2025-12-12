<template>
  <div class="auth-container">
    <div class="auth-card">
      <!-- Logo -->
      <div class="logo-section">
        <div class="logo-text">bb</div>
        <h2 class="brand-name">BELLAS BOTIQUE</h2>
      </div>

      <!-- Title -->
      <h1 class="auth-title">Sign In</h1>

      <!-- Error Message -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin">
        <!-- Email -->
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            class="form-input"
            v-model="formData.email"
            required
          />
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            class="form-input"
            v-model="formData.password"
            required
          />
        </div>

        <!-- Remember & Forgot -->
        <div class="form-options">
          <label class="remember-label">
            <input type="checkbox" v-model="formData.remember" />
            <span>Remember me</span>
          </label>
          <a href="#" class="forgot-link">¿Forgot your password?</a>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn-submit" :disabled="isLoading">
          {{ isLoading ? 'Signing In...' : 'Sign In' }}
        </button>

        <!-- Sign Up Link -->
        <p class="auth-footer">
          ¿No account? <a href="#" @click.prevent="goToSignUp">Sign Up</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authService } from "../../stores/auth.js";

const router = useRouter();
const isLoading = ref(false);
const errorMessage = ref("");

const formData = ref({
  email: "",
  password: "",
  remember: false,
});

const handleLogin = () => {
  isLoading.value = true;
  errorMessage.value = "";

  // Simulate a small delay for better UX
  setTimeout(() => {
    const result = authService.login(formData.value.email, formData.value.password);

    if (result.success) {
      // Redirect based on user role
      if (result.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else if (result.user.role === 'customer') {
        router.push('/customer/home');
      }
    } else {
      errorMessage.value = result.message;
      isLoading.value = false;
    }
  }, 500);
};

const goToSignUp = () => {
  router.push("/auth/register");
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 1rem;
}

.auth-card {
  background: white;
  padding: 3rem 2.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 480px;
}

.logo-section {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-text {
  font-family: 'Brush Script MT', cursive;
  font-size: 3rem;
  color: #000;
  margin-bottom: 0.5rem;
}

.brand-name {
  font-size: 1rem;
  letter-spacing: 0.2em;
  font-weight: 400;
  color: #000;
  margin: 0;
}

.auth-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 2rem;
  text-align: left;
}

/* Error Message */
.error-message {
  background-color: #fee2e2;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  border-left: 4px solid #dc2626;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #000;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #000;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
}

.remember-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin: 0;
}

.remember-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.remember-label span {
  color: #000;
}

.forgot-link {
  color: #000;
  text-decoration: none;
  font-size: 0.85rem;
}

.forgot-link:hover {
  text-decoration: underline;
}

.btn-submit {
  width: 100%;
  padding: 0.9rem;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.btn-submit:hover:not(:disabled) {
  background-color: #333;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-footer {
  text-align: center;
  font-size: 0.9rem;
  color: #000;
  margin: 0;
}

.auth-footer a {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}

.auth-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 576px) {
  .auth-card {
    padding: 2rem 1.5rem;
  }

  .logo-text {
    font-size: 2.5rem;
  }

  .auth-title {
    font-size: 1.5rem;
  }

  .form-options {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
}
</style>