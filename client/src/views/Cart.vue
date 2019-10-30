<template>
  <div class="cart">
    <h1>Shopping Cart</h1>
    <p v-if="!cart.length">
      <router-link to="/">
        Please go
        shopping!
      </router-link>
    </p>

    <div v-else class="cart-details">
      <div class="item" v-for="(item,index) in Object.keys(itemizedCart)" :key="`item-${index}`">
        <b>({{itemizedCart[item].length}}) {{ item }}</b>
        <span class="item-price">{{formatDollar(itemizedCart[item][0].price)}}</span>
        <span class="extended-price">{{formatDollar(itemTotal(item))}}</span>
      </div>

      <h3 class="total" v-if="cart.length">Total: {{formatDollar(cartTotal)}}</h3>

      <div class="action-options">
        <button class="keep-shopping" @click="$router.push({ path: '/' })">Keep Shopping</button>
        <button @click="checkout">Checkout</button>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapGetters } from "vuex";

export default {
  methods: {
    itemTotal(item) {
      if (!this.itemizedCart[item]) return 0;
      return this.itemizedCart[item][0].price * this.itemizedCart[item].length;
    },
    formatDollar(amount) {
      return "$" + (amount / 100).toFixed(2);
    },
    checkout() {
      alert("integrate Stripe here");
    }
  },
  computed: {
    ...mapState(["cart"]),
    ...mapGetters(["cartTotal", "itemizedCart"])
  }
};
</script>

<style lang="scss">
.cart {
  .item {
    padding-left: 20px;
    margin-left: 20px;
    border-left: 1px solid #888;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    b {
      width: 40%;
    }
    .item-price,
    .extended-price {
      width: 20%;
      text-align: right;
    }
  }
  .total {
    margin-top: 30px;
    text-align: right;
    border-top: 1px dashed;
    padding-top: 14px;
  }

  .action-options {
    display: flex;
    button {
      color: #fff;
      background-color: cornflowerblue;
      border: none;
      outline: none;
      text-transform: uppercase;
      padding: 8px 10px;
      font-weight: 700;
      width: 50%;
      cursor: pointer;
      font-size: 0.9em;
      margin: 50px auto;
      display: block;
      &:hover {
        background-color: darken(#6495ec, 10%);
      }
      &.keep-shopping {
        width: 200px;
        background: red;
        margin-right: 10px;
        &:hover {
          background-color: darken(red, 10%);
        }
      }
    }
  }
}
</style>