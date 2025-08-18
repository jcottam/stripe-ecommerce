import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faStripe } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/assets/style.scss";
import HelperUtils from "./plugins/HelperUtils";
import "./services/envValidation";

library.add(faStripe, faShoppingCart, faTimes);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(HelperUtils);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
