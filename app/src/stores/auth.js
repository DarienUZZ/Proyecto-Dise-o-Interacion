// storage/auth.js
import usersData from "../data/users.json";

export const authService = {
  // Login function
  login(email, password) {
    const user = usersData.users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Store user data in localStorage
      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isAuthenticated", "true");

      return {
        success: true,
        user: userData,
      };
    }

    return {
      success: false,
      message: "Invalid email or password",
    };
  },

  // Register function
  register(userData) {
    // Check if email already exists
    const existingUser = usersData.users.find(
      (u) => u.email === userData.email
    );

    if (existingUser) {
      return {
        success: false,
        message: "Email already registered",
      };
    }

    // In a real app, you would save this to a database
    // For now, we'll just simulate a successful registration
    const newUser = {
      id: usersData.users.length + 1,
      email: userData.email,
      name: userData.name,
      role: "customer", // Default role for new registrations
    };

    return {
      success: true,
      message: "Registration successful! Please login.",
      user: newUser,
    };
  },

  // Logout function
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  },

  // Check if user is authenticated
  isAuthenticated() {
    return localStorage.getItem("isAuthenticated") === "true";
  },

  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user has admin role
  isAdmin() {
    const user = this.getCurrentUser();
    return user && user.role === "admin";
  },

  // Check if user has customer role
  isCustomer() {
    const user = this.getCurrentUser();
    return user && user.role === "customer";
  },
};
