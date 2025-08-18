import Vue from "vue";
import VueRouter from "vue-router";

// Enable route-level code-splitting for smaller initial bundles
const Items = () => import(/* webpackChunkName: "items" */ "../views/Items.vue");
const Cart = () => import(/* webpackChunkName: "cart" */ "../views/Cart.vue");
const Charges = () => import(/* webpackChunkName: "charges" */ "../views/Charges.vue");
const Confirmation = () => import(
  /* webpackChunkName: "confirmation" */ "../views/Confirmation.vue"
);

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Items
  },
  {
    path: "/charges",
    component: Charges
  },
  {
    path: "/cart",
    component: Cart
  },
  {
    path: "/confirmation",
    component: Confirmation
  },
  {
    path: "*",
    redirect: { path: "/" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
