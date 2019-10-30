import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: []
  },
  mutations: {
    addToCart(state, item) {
      state.cart.push(item);
    },
    removeFromCart(state, name) {
      state.cart = state.cart.filter(item => item.name !== name);
    }
  },
  actions: {},
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
