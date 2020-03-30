<template>
  <div class="container">
    <h1>Test calc</h1>
    <InvestForm
      :amountMin="10000"
      :amountMax="100000"
      :durationMin="1"
      :durationMax="5"
    >
    </InvestForm>
  </div>
</template>

<script>
import InvestForm from "@/components/InvestForm.vue";

export default {
  name: "Home",
  components: {
    InvestForm
  }
};
</script>
