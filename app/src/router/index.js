import { createRouter, createWebHistory } from "vue-router";
import { authService } from "../stores/auth.js";

// Layouts
import MainLayout from "../components/admin/MainLayout.vue";

// Admin Views
import Dashboard from "../views/admin/Dashboard.vue";
import ProductManagement from "../views/admin/ProductManagement.vue";
import ProductAdd from "../views/admin/ProductManagementAddProduct.vue";
import ProductEdit from "../views/admin/ProductManagementEditProduct.vue";
import UserManagement from "../views/admin/UserManagement.vue";
import UserAdd from "../views/admin/UserManagementAddUser.vue";
import UserEdit from "../views/admin/UserManagementEditUser.vue";
import BillingSales from "../views/admin/BillingSales.vue";
import AddOrder from "../views/admin/BillingSalesAddOrder.vue";
import BillingSalesViewOrder from "../views/admin/BillingSalesViewOrder.vue";
import Reports from "../views/admin/Reports.vue";
import Support from "../views/admin/Support.vue";
import RolesPermissions from "../views/admin/RolesPermissions.vue";
import AddRole from "../views/admin/RolesPermissionsAddRole.vue";

// Auth Views
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";

// Customer Views
import CustomerHome from "../views/customer/home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: CustomerHome,
  },
  // Auth Routes
  {
    path: "/auth/login",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: "/auth/register",
    name: "Register",
    component: Register,
    meta: { requiresGuest: true },
  },
  // Admin Routes
  {
    path: "/admin",
    component: MainLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: "",
        redirect: "/admin/dashboard",
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "products",
        name: "ProductManagement",
        component: ProductManagement,
      },
      {
        path: "products/add",
        name: "ProductAdd",
        component: ProductAdd,
      },
      {
        path: "products/edit/:id",
        name: "ProductEdit",
        component: ProductEdit,
      },
      {
        path: "users",
        name: "UserManagement",
        component: UserManagement,
      },
      {
        path: "users/add",
        name: "UserAdd",
        component: UserAdd,
      },
      {
        path: "users/edit/:id",
        name: "UserEdit",
        component: UserEdit,
      },
      {
        path: "billing",
        name: "BillingSales",
        component: BillingSales,
      },
      {
        path: "billing/add",
        name: "AddOrder",
        component: AddOrder,
      },
      {
        path: "billing/view/:id",
        name: "ViewOrder",
        component: BillingSalesViewOrder,
      },
      {
        path: "reports",
        name: "Reports",
        component: Reports,
      },
      {
        path: "support",
        name: "Support",
        component: Support,
      },
      {
        path: "roles",
        name: "RolesPermissions",
        component: RolesPermissions,
      },
      {
        path: "roles/add",
        name: "AddRole",
        component: AddRole,
      },
    ],
  },
  // Customer Routes
  {
    path: "/customer",
    meta: { requiresAuth: true, requiresCustomer: true },
    children: [
      {
        path: "home",
        name: "CustomerDashboard",
        component: CustomerHome,
      },
      // Aquí puedes agregar más rutas de customer
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated();
  const isAdmin = authService.isAdmin();
  const isCustomer = authService.isCustomer();

  // Check if route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/auth/login");
    return;
  }

  // Check if route requires guest (not authenticated)
  if (to.meta.requiresGuest && isAuthenticated) {
    if (isAdmin) {
      next("/admin/dashboard");
    } else if (isCustomer) {
      next("/customer/home");
    }
    return;
  }

  // Check if route requires admin role
  if (to.meta.requiresAdmin && !isAdmin) {
    next("/");
    return;
  }

  // Check if route requires customer role
  if (to.meta.requiresCustomer && !isCustomer) {
    next("/");
    return;
  }

  next();
});

export default router;
