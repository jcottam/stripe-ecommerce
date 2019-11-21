import Vue from "vue";
import VueRouter from "vue-router";
import Items from "../views/Items.vue";
import Cart from "../views/Cart.vue";
import Charges from "../views/Charges.vue";
import Confirmation from "../views/Confirmation.vue";

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
