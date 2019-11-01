<template>
  <div class="confirmation">
    <h1>{{message}}</h1>
    <div v-if="chargeResult && chargeResult.status === 'success'">
      <h3>Amount: {{formatDollar(chargeResult.amount)}}</h3>
      <h3>
        Receipt:
        <a :href="chargeResult.receipt_url" target="_blank">{{chargeResult.id}}</a>
      </h3>
      <button @click="$router.push({path:'/'})">Return Home</button>
    </div>

    <div v-if="chargeResult && chargeResult.status === 'error'">
      <h3 v-if="chargeResult.code">Code: {{chargeResult.code}}</h3>
      <h3 v-if="chargeResult.decline_code">Decline Code: {{chargeResult.decline_code}}</h3>
      <button @click="$router.go(-1)">Try Again</button>
    </div>

    <!--
    <p>Outcome: {{chargeResult.outcome}}</p>
    <p>{{chargeResult}}</p>-->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  mounted() {
    if (!this.chargeAttempted) {
      this.$router.push({ path: "/" });
    }
  },
  computed: {
    ...mapState(["chargeResult", "chargeAttempted"]),
    message() {
      if (this.chargeResult.status === "success") {
        return "Thank You For Your Purchase";
      } else if (this.chargeResult.status === "error") {
        return "Payment Failed to Process";
      }
      return "Processing payment...";
    }
  }
};
</script>