<template>
  <div class="auth-container">
    <div class="auth-card-register">
      <!-- Logo -->
      <div class="logo-section">
        <div class="logo-text">bb</div>
        <h2 class="brand-name">BELLAS BOTIQUE</h2>
      </div>

      <!-- Title -->
      <h1 class="auth-title">Sign Up</h1>
      <p class="auth-subtitle">Create a new account</p>

      <!-- Form -->
      <form @submit.prevent="handleRegister">
        <div class="form-row">
          <!-- Name -->
          <div class="form-group">
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              id="name"
              class="form-input"
              v-model="formData.name"
              required
            />
          </div>

          <!-- Full Name -->
          <div class="form-group">
            <label for="fullName" class="form-label">Full Name</label>
            <input
              type="text"
              id="fullName"
              class="form-input"
              v-model="formData.fullName"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <!-- ID -->
          <div class="form-group">
            <label for="id" class="form-label">ID</label>
            <input
              type="text"
              id="id"
              class="form-input"
              v-model="formData.userId"
              required
            />
          </div>

          <!-- Email -->
          <div class="form-group">
            <label for="email" class="form-label">E-Mail</label>
            <input
              type="email"
              id="email"
              class="form-input"
              v-model="formData.email"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <!-- Number -->
          <div class="form-group">
            <label for="number" class="form-label">Number</label>
            <input
              type="tel"
              id="number"
              class="form-input"
              v-model="formData.number"
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
        </div>

        <div class="form-row">
          <!-- Password Confirmation -->
          <div class="form-group">
            <label for="passwordConfirm" class="form-label">Password Confirmation</label>
            <input
              type="password"
              id="passwordConfirm"
              class="form-input"
              v-model="formData.passwordConfirm"
              required
            />
          </div>

          <!-- Address -->
          <div class="form-group">
            <label for="address" class="form-label">Address</label>
            <input
              type="text"
              id="address"
              class="form-input"
              v-model="formData.address"
              required
            />
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn-submit">Sign Up</button>

        <!-- Sign In Link -->
        <p class="auth-footer">
          ¿Have account already? <a href="#" @click.prevent="goToSignIn">Sign In</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const formData = ref({
  name: "",
  fullName: "",
  userId: "",
  email: "",
  number: "",
  password: "",
  passwordConfirm: "",
  address: "",
});

const handleRegister = () => {
  if (formData.value.password !== formData.value.passwordConfirm) {
    alert("Passwords do not match!");
    return;
  }

  console.log("Register data:", formData.value);
  alert("Registration successful!");
  router.push("/auth/login");
};

const goToSignIn = () => {
  router.push("/auth/login");
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 2rem 1rem;
}

.auth-card-register {
  background: white;
  padding: 3rem 2.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1100px;
}

.logo-section {
  text-align: center;
  margin-bottom: 1.5rem;
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
  margin-bottom: 0.25rem;
  text-align: left;
}

.auth-subtitle {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 2rem;
  text-align: left;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
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
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.btn-submit:hover {
  background-color: #333;
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

@media (max-width: 768px) {
  .auth-card-register {
    padding: 2rem 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .logo-text {
    font-size: 2.5rem;
  }

  .auth-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 576px) {
  .auth-container {
    padding: 1rem;
  }

  .auth-card-register {
    padding: 1.5rem 1rem;
  }
}
</style>