<template>
  <div class="confirmation">
    <h1>Confirmation</h1>
    <h3>Amount: {{chargeResult.amount}}</h3>
    <h3>ID: {{chargeResult.id}}</h3>
    <!-- <p>{{chargeResult}}</p> -->
    <p>{{itemizedCart}}</p>
    <!-- <p>is processing: {{processingPayment}}</p> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState(["cart", "processingPayment", "chargeResult"]),
    ...mapGetters(["cartTotal", "itemizedCart"])
  }
};
</script>