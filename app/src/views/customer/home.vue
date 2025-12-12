<template>
  <div class="customer-home">
    <div class="home-container">
      <!-- Logo -->
      <div class="logo-section">
        <div class="logo-text">bb</div>
        <h1 class="brand-name">BELLAS BOTIQUE</h1>
      </div>

      <!-- Welcome Message -->
      <div class="welcome-section">
        <h2 class="welcome-title">Welcome to Bellas Botique</h2>
        <p class="welcome-subtitle">Discover our exclusive collection</p>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button @click="goToLogin" class="btn-login">
          Sign In
        </button>
        <button @click="goToRegister" class="btn-register">
          Create Account
        </button>
      </div>

      <!-- Browse as Guest -->
      <p class="guest-text">
        or <a href="#" class="guest-link">continue as guest</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToLogin = () => {
  router.push("/auth/login");
};

const goToRegister = () => {
  router.push("/auth/register");
};
</script>

<style scoped>
.customer-home {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%);
  padding: 1rem;
}

.home-container {
  background: white;
  padding: 4rem 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 100%;
}

/* Logo */
.logo-section {
  margin-bottom: 2rem;
}

.logo-text {
  font-family: 'Brush Script MT', cursive;
  font-size: 4rem;
  color: #000;
  margin-bottom: 0.5rem;
}

.brand-name {
  font-size: 1.2rem;
  letter-spacing: 0.2em;
  font-weight: 400;
  color: #000;
  margin: 0;
}

/* Welcome Section */
.welcome-section {
  margin-bottom: 3rem;
}

.welcome-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 0.5rem;
}

.welcome-subtitle {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.btn-login,
.btn-register {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-login {
  background-color: #000;
  color: white;
}

.btn-login:hover {
  background-color: #333;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-register {
  background-color: white;
  color: #000;
  border: 2px solid #000;
}

.btn-register:hover {
  background-color: #000;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Guest Link */
.guest-text {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

.guest-link {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}

.guest-link:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 576px) {
  .home-container {
    padding: 3rem 2rem;
  }

  .logo-text {
    font-size: 3rem;
  }

  .welcome-title {
    font-size: 1.5rem;
  }
}
</style>