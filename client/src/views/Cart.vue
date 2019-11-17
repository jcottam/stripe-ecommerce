<template>
  <div class="cart">
    <h1>Shopping Cart</h1>
    <p v-show="!cart.length">
      <router-link to="/">Empty - please go shopping!</router-link>
    </p>

    <div v-show="cart.length" class="cart-details">
      <div
        class="item"
        v-for="(item, index) in Object.keys(itemizedCart)"
        :key="`item-${index}`"
      >
        <b>
          <font-awesome-icon icon="times" @click="remove(item)" />
          ({{ itemizedCart[item].length }}) {{ item }}
        </b>
        <span class="item-price">{{
          formatDollar(itemizedCart[item][0].price)
        }}</span>
        <span class="extended-price">{{ formatDollar(itemTotal(item)) }}</span>
      </div>

      <h3 class="total" v-if="cart.length">
        Total: {{ formatDollar(cartTotal) }}
      </h3>

      <div v-show="!showStripe" class="action-options">
        <button
          class="accent keep-shopping"
          @click="$router.push({ path: '/' })"
        >
          Keep Shopping
        </button>
        <button @click="checkout">Checkout</button>
      </div>

      <form
        v-show="showStripe"
        class="payment-form animated fadeInUp"
        @submit="stripeRequestToken"
      >
        <div class="form-row">
          <label for="card-element">Credit or debit card</label>
          <div id="card-element">
            <!-- Stripe Element will be inserted here. -->
          </div>
          <div id="card-errors" role="alert">{{ errorMessage }}</div>
        </div>
        <div class="action-options">
          <button type="button" class="accent" @click="cancelCheckout">
            Cancel
          </button>
          <button type="submit">Submit Payment</button>
        </div>
        <div class="test-cc">
          4242 4242 4242 4242
          <br />
          <b>test credit card number</b>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      showStripe: false,
      stripe: null,
      card: null,
      errorMessage: ""
    };
  },
  mounted() {
    this.initializeStripe();
  },
  activated() {
    // Add an instance of the card Element into the `card-element` <div>.
    if (this.card) this.card.mount("#card-element");
    this.$store.commit("chargeResult", {});
    this.$store.commit("chargeAttempted", false);
    this.showStripe = false;
  },
  deactivated() {
    if (this.card) this.card.unmount();
  },
  methods: {
    checkout() {
      this.showStripe = true;
    },
    cancelCheckout() {
      this.showStripe = false;
    },
    itemTotal(item) {
      if (!this.itemizedCart[item]) return 0;
      return this.itemizedCart[item][0].price * this.itemizedCart[item].length;
    },
    remove(item) {
      this.$store.commit("removeFromCart", item);
    },
    initializeStripe() {
      console.log("%c-- initialize Stripe", "color:blue;");
      // Create a Stripe client.
      // When you’re ready to accept live payments, replace the test key with your live key in production.
      // eslint-disable-next-line
      this.stripe = Stripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);

      // Create an instance of Elements.
      // https://stripe.com/docs/stripe-js/reference#elements-create
      const elements = this.stripe.elements();
      const style = {
        base: {
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px"
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      };

      // Create an instance of the card Element.
      this.card = elements.create("card", { style });

      // Handle real-time validation errors from the card Element.
      this.card.addEventListener("change", event => {
        this.errorMessage = "";
        if (event.error) {
          this.errorMessage = event.error.message;
        }
      });
    },
    async stripeRequestToken(evt) {
      evt.preventDefault();
      // https://stripe.com/docs/stripe-js/reference#stripe-create-token
      const result = await this.stripe.createToken(this.card);
      if (result.error) {
        const errorElement = document.getElementById("card-errors");
        errorElement.textContent = result.error.message;
      } else {
        this.$router.push({ path: "/confirmation" });
        this.$store.dispatch("postPaymentToStripe", {
          source: result.token.id,
          amount: this.cartTotal,
          description: "Adventure with Beanie",
          currency: "usd"
        });
      }
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
  padding: 30px 30px 20px;
  @media (max-width: 414px) {
    padding: 10px 5px 20px;
  }
  h1 {
    margin-top: 0;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    b {
      svg {
        margin-right: 10px;
        cursor: pointer;
        color: red;
        @media (max-width: 414px) {
          margin-right: 5px;
        }
      }
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

  button {
    &.accent {
      width: 40%;
      margin-right: 10px;
      @media (max-width: 414px) {
        width: 40%;
      }
    }
  }

  .action-options {
    display: flex;
    justify-content: center;
  }

  // STRIPE Elements
  .payment-form {
    width: 50%;
    margin: 0 auto;
    @media (max-width: 414px) {
      width: 100%;
    }
    label {
      font-weight: 700;
      text-transform: uppercase;
    }
    .StripeElement {
      background: white;
      padding: 20px;
      border: 1px dashed;
      margin: 10px 0;
      border-radius: 4px;
      transition: box-shadow 150ms ease;
    }
    .StripeElement--focus {
      box-shadow: 0 1px 3px 0 #cfd7df;
      border: 1px dashed blue;
    }
    .StripeElement--invalid {
      border-color: #fa755a;
    }
    #card-errors {
      color: red;
      font-weight: 500;
      text-align: center;
    }
    button {
      margin: 18px auto 0;
    }
    .test-cc {
      text-align: center;
      font-size: 1.1em;
      margin-top: 26px;
      font-family: monospace;
      b {
        font-size: 0.8em;
        font-family: "Roboto";
      }
    }
  }
}
</style>
