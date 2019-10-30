import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    processingPayment: false,
    chargeResult: {}
  },
  mutations: {
    addToCart(state, item) {
      state.cart.push(item);
    },
    removeFromCart(state, name) {
      state.cart = state.cart.filter(item => item.name !== name);
    },
    processingPayment(state, value) {
      state.processingPayment = value;
    },
    chargeResult(state, value) {
      state.chargeResult = value;
    },
    cart(state, value) {
      state.cart = value;
    }
  },
  actions: {
    async postPaymentToStripe({ commit }, payload) {
      commit("processingPayment", true);
      try {
        const chargeResult = await axios.post(
          `${process.env.VUE_APP_SERVERLESS_ENDPOINT}/stripe/post-payment`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${process.env.VUE_APP_SERVERLESS_TOKEN}`
            }
          }
        );
        commit("processingPayment", false);
        commit("chargeResult", chargeResult.data);
        // empty cart
        // commit("cart", []);
      } catch (error) {
        console.error(error);
        // commit error
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
