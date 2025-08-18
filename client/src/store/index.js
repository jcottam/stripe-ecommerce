import Vue from "vue";
import Vuex from "vuex";
import api from "../services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    chargeAttempted: false,
    chargeResult: {}
  },
  mutations: {
    addToCart(state, item) {
      state.cart.push(item);
    },
    removeFromCart(state, name) {
      state.cart = state.cart.filter(item => item.name !== name);
    },
    clearCart(state) {
      state.cart = [];
    },
    chargeAttempted(state, value) {
      state.chargeAttempted = value;
    },
    chargeResult(state, value) {
      state.chargeResult = value;
    }
  },
  actions: {
    async postPaymentToStripe({ commit }, payload) {
      try {
        commit("chargeAttempted", true);
        const chargeResult = await api.post("/stripe/create-charge", payload);
        commit("chargeResult", { ...chargeResult.data, status: "success" });
        commit("clearCart");
      } catch (error) {
        const data = error.response ? error.response.data : error;
        console.error(data);
        commit("chargeResult", { ...data, status: "error" });
      }
    }
  },
  getters: {
    cartTotal(state) {
      if (!state.cart.length) return 0;
      return state.cart.reduce((total, item) => {
        return total + item.price;
      }, 0);
    },
    itemizedCart(state) {
      if (!state.cart.length) return {};
      return state.cart.reduce((total, item) => {
        total[item.name] = total[item.name] || [];
        total[item.name].push(item);
        return total;
      }, {});
    }
  }
});
