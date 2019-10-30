<template>
  <div class="item">
    <img :src="image" :alt="name" />
    <div class="info">
      <h1>{{ name }}</h1>
      <p>{{description}}</p>
      <div class="price">{{formatDollar(price)}}</div>
      <button @click="addToCart">Add To Cart</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    description: String,
    image: String,
    price: Number
  },
  methods: {
    addToCart() {
      const { name, description, image, price } = this;
      this.$store.commit("addToCart", { name, description, image, price });
    },
    formatDollar(amount) {
      return "$" + (amount / 100).toFixed(2);
    }
  }
};
</script>

<style lang="scss">
.item {
  overflow: hidden;
  margin-bottom: 60px;
  display: flex;
  align-items: flex-start;
  img {
    margin-right: 40px;
    width: 50%;
  }
  .info {
    width: 100%;
    @media (max-width: 414px) {
      text-align: center;
    }
  }
  h1 {
    margin: 0;
  }
  p {
    margin: 2px 0 0;
  }
  .price {
    font-weight: 700;
    margin-top: 12px;
    font-size: 1.2em;
  }
  button {
    @media (max-width: 414px) {
      width: 80%;
      display: block;
      padding: 12px 0;
      margin: 20px auto 0;
    }
  }
  @media (max-width: 414px) {
    display: block;
    img {
      width: 100%;
      display: block;
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
}
</style>
