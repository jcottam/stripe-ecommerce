<template>
  <div class="charges">
    <h1>Charges</h1>
    <p v-if="!charges.data">Fetching from Stripe...</p>
    <ol v-else>
      <li v-for="charge in charges.data" :key="charge.id">
        {{ charge.id }} | ${{ Number(charge.amount / 100).toFixed(2) }}
      </li>
    </ol>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      charges: {}
    };
  },

  async created() {
    this.charges = await axios
      .get(`${process.env.VUE_APP_SERVERLESS_ENDPOINT}/stripe/charges`)
      .then(result => result.data)
      .catch(err => console.error(err));
  }
};
</script>

<style lang="scss" scoped>
.charges {
  padding: 30px 30px 20px;
  h1 {
    margin-top: 0;
  }
  @media (max-width: 414px) {
    padding: 10px 5px 20px;
  }
}
</style>
