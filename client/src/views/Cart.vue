<template>
  <div class="cart">
    <h1>Shopping Cart</h1>
    <p v-if="!cart.length">
      <router-link to="/">
        EMPTY CART - please go
        shopping!
      </router-link>
    </p>

    <div v-else class="cart-details">
      <div class="item" v-for="(item,index) in Object.keys(itemizedCart)" :key="`item-${index}`">
        <b>
          <font-awesome-icon icon="times" @click="remove(item)" />
          ({{itemizedCart[item].length}}) {{ item }}
        </b>
        <span class="item-price">{{formatDollar(itemizedCart[item][0].price)}}</span>
        <span class="extended-price">{{formatDollar(itemTotal(item))}}</span>
      </div>

      <h3 class="total" v-if="cart.length">Total: {{formatDollar(cartTotal)}}</h3>

      <div class="action-options">
        <button class="keep-shopping" @click="$router.push({ path: '/' })">Keep Shopping</button>
        <button @click="checkout">Checkout</button>
      </div>

      <form ref="stripe" action="/charge" method="post" id="payment-form" class="payment-form">
        <div class="form-row">
          <label for="card-element">Credit or debit card</label>
          <div id="card-element">
            <!-- A Stripe Element will be inserted here. -->
          </div>
          <!-- Used to display form errors. -->
          <div id="card-errors" role="alert"></div>
        </div>
        <button>Submit Payment</button>
        <div class="test-cc">
          4242 4242 4242 4242
          <br />
          <b>test credit card number</b>
        </div>
      </form>
    </div>
    <!-- end v-else (above <div> is only visible if products are in cart) -->
  </div>
</template>


<script>
import { mapState, mapGetters } from "vuex";

export default {
  activated() {
    const { stripe } = this.$refs || null;
    if (stripe && !this.stripeInitialized) this.initializeStripe();
  },
  data() {
    return {
      stripeInitialized: false
    };
  },
  methods: {
    checkout() {
      alert("integrate Stripe here");
    },
    itemTotal(item) {
      if (!this.itemizedCart[item]) return 0;
      return this.itemizedCart[item][0].price * this.itemizedCart[item].length;
    },
    formatDollar(amount) {
      return "$" + (amount / 100).toFixed(2);
    },
    remove(item) {
      this.$store.commit("removeFromCart", item);
    },
    initializeStripe() {
      console.log("%c-- initialize Stripe", "color:blue;");
      // Create a Stripe client.
      // eslint-disable-next-line
      var stripe = Stripe("pk_test_jcyYnl0ieNzLecyFmwlk1GhQ00Ddnalzip");

      // Create an instance of Elements.
      var elements = stripe.elements();

      // Custom styling can be passed to options when creating an Element.
      // (Note that this demo uses a wider set of styles than the guide below.)
      var style = {
        base: {
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      };

      // Create an instance of the card Element.
      var card = elements.create("card", { style: style });

      // Add an instance of the card Element into the `card-element` <div>.
      card.mount("#card-element");

      // Handle real-time validation errors from the card Element.
      card.addEventListener("change", function(event) {
        var displayError = document.getElementById("card-errors");
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = "";
        }
      });

      // Handle form submission.
      var form = document.getElementById("payment-form");
      form.addEventListener("submit", function(event) {
        event.preventDefault();
        stripe.createToken(card).then(function(result) {
          if (result.error) {
            // Inform the user if there was an error.
            var errorElement = document.getElementById("card-errors");
            errorElement.textContent = result.error.message;
          } else {
            // Send the token to your server.
            stripeTokenHandler(result.token);
          }
        });
      });

      // Submit the form with the token ID.
      function stripeTokenHandler(token) {
        console.log({ token });
        // Insert the token ID into the form so it gets submitted to the server
        var form = document.getElementById("payment-form");
        var hiddenInput = document.createElement("input");
        hiddenInput.setAttribute("type", "hidden");
        hiddenInput.setAttribute("name", "stripeToken");
        hiddenInput.setAttribute("value", token.id);
        form.appendChild(hiddenInput);

        // Submit the form
        form.submit();
      }

      this.stripeInitialized = true;
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
    margin-left: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    b {
      svg {
        margin-right: 10px;
        cursor: pointer;
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

  .action-options {
    display: flex;
  }

  // STRIPE
  .payment-form {
    width: 50%;
    margin: 0 auto;
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
      #card-errors {
        color: red;
        font-weight: 500;
        text-align: center;
      }
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