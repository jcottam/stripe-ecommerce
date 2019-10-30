<template>
  <div id="app">
    <header>
      <div class="container">
        <router-link to="/">
          <h1>Adventure with Beanie</h1>
        </router-link>
        <router-link to="/cart" class="cart">
          <font-awesome-icon class="cart-icon" icon="shopping-cart" />
          <label>Cart</label>
          <span v-if="cart.length" class="cart-count active">{{cart.length}}</span>
        </router-link>
      </div>
    </header>
    <main class="container">
      <transition name="slide">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </main>
    <footer class="stipe-callout">
      Powered by
      <font-awesome-icon class="stripe-icon" :icon="['fab', 'stripe']" />
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      cart: state => state.cart
    })
  },
  watch: {
    cart() {
      const el = document.querySelector(".cart-count");
      if (el) {
        if (el.classList.contains("active")) el.classList.remove("active");
        el.classList.add("active");
        setTimeout(() => {
          el.classList.remove("active");
        }, 1000);
      }
    }
  }
};
</script>

<style lang="scss">
body {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

.slide-enter-active {
  transition: opacity 1s, transform 1s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(10vw);
}

header {
  background: #222;
  padding: 16px 0;
  position: fixed;
  top: 0;
  width: 100%;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  z-index: 5;
  h1 {
    margin: 0;
    font-weight: 400;
    font-size: 25px;
    @media (max-width: 414px) {
      font-size: 21px;
    }
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  a {
    text-decoration: none;
    color: #eee;
    display: block;
    &:hover {
      opacity: 0.6;
    }
    &.cart {
      position: relative;
    }
    .cart-icon {
      font-size: 27px;
      margin-top: 1px;
      color: yellow;
      @media (max-width: 414px) {
        font-size: 20px;
      }
    }
    label {
      margin-left: 6px;
      text-transform: uppercase;
      top: -2px;
      position: relative;
      @media (max-width: 414px) {
        top: 0;
      }
    }
    span.cart-count {
      background-color: cornflowerblue;
      border-radius: 50px;
      padding: 3px 7px;
      text-align: center;
      margin: 0;
      font-size: 12px;
      font-weight: bold;
      position: absolute;
      top: -9px;
      left: -28px;
      &.active {
        animation: pulse 1s 1;
      }
    }
  }
}

@keyframes pulse {
  0% {
    background-color: yellow;
  }
  50% {
    transform: scale(1.2);
    background-color: cornflowerblue;
  }
  100% {
    background-color: cornflowerblue;
  }
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 10px;
}

main.container {
  padding-top: 50px;
  padding-bottom: 50px;
}

footer {
  display: flex;
  align-items: center;
  background: aliceblue;
  width: 100%;
  bottom: 0;
  justify-content: center;
  position: fixed;
  font-size: 12px;
  border-top: 2px solid white;
  .stripe-icon {
    font-size: 30px;
    margin-left: 6px;
  }
}
</style>

