import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "../components/admin/MainLayout.vue";

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

const routes = [
  {
    path: "/",
    redirect: "/admin/dashboard",
  },
  {
    path: "/admin",
    component: MainLayout,
    children: [
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
      { path: "users/edit/:id", name: "UserEdit", component: UserEdit },
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
