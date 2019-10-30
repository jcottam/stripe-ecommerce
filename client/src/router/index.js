import Vue from "vue";
import VueRouter from "vue-router";
import Items from "../views/Items.vue";
import Cart from "../views/Cart.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Items
  },
  {
    path: "/cart",
    component: Cart
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
