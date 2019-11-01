<template>
  <div class="items">
    <Item v-for="(item,index) in items" v-bind="item" :key="index" />
    <router-link to="/cart" class="checkout">
      <button>Checkout</button>
    </router-link>
  </div>
</template>

<script>
import items from "@/assets/items.json";
import Item from "@/components/Item.vue";

export default {
  components: {
    Item
  },
  data() {
    return {
      items
    };
  }
};
</script>

<style lang="scss">
.items {
  padding: 30px 30px 20px;

  a.checkout {
    text-decoration: none;
    button {
      margin: 0 auto;
      display: block;
      padding: 20px;
      font-size: 1.1em;
      width: 100%;
    }
  }
}
</style>
