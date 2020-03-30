<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="amount">Amount</label>
        <number-input
          id="amount"
          v-model="form.amount"
          :min="amountMin"
          :max="amountMax"
          @input.native="onInputAmount"
          @change="onChangeAmount"
        />
      </div>

      <div class="form-group">
        <label for="duration">Duration</label>
        <number-input
          id="duration"
          v-model="form.duration"
          :min="durationMin"
          :max="durationMax"
          @input.native="onInputDuration"
          @change="onChangeDuration"
        />
      </div>

      <button class="btn btn-primary mt-2" type="submit" :disabled="!loaded">
        OK
      </button>
    </form>

    <div v-if="error !== null" class="alert alert-danger text-center mt-2">
      {{ error }}
    </div>
    <div v-else-if="!loaded" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else-if="changed" class="alert alert-success text-center mt-2">
      Waiting submit
    </div>
    <div
      v-else
      id="monthlyInstallment"
      class="alert alert-success text-center mt-2"
    >
      Monthly Instatement:
      <strong>{{ monthlyInstallment }} EUR</strong>
    </div>
  </div>
</template>

<script>
import NumberInput from "@/components/NumberInput.vue";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("invest");

export default {
  name: "InvestForm",
  components: {
    NumberInput
  },
  created() {
    if (this.annuities == null) {
      this.fetchData();
    } else {
      this.setData(this.annuities);
      this.loaded = true;
    }
  },
  props: {
    amountMin: {
      type: Number,
      default: 1
    },
    amountMax: {
      type: Number,
      default: 1
    },
    durationMin: {
      type: Number,
      default: 1
    },
    durationMax: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      form: {
        amount: this.amountMax,
        duration: this.durationMax
      },
      changed: false,
      loaded: false,
      error: null
    };
  },
  computed: {
    ...mapGetters(["annuities", "monthlyInstallment"])
  },
  methods: {
    ...mapActions(["loadAnnuities"]),
    onInputAmount() {
      this.changed = true;
    },
    onInputDuration() {
      this.changed = true;
    },
    onChangeAmount(newValue) {
      if (this.form.amount != newValue) {
        this.form.amount = newValue;
      }
    },
    onChangeDuration(newValue) {
      if (this.form.duration != newValue) {
        this.form.duration = newValue;
      }
    },
    onSubmit() {
      this.fetchData();
    },
    setData(response) {
      this.form.amount = response.amount;
      this.form.duration = response.duration;
    },
    fetchData() {
      this.loaded = false;
      this.loadAnnuities(this.form)
        .then(response => {
          this.setData(response);
          this.error = null;
          this.loaded = true;
          this.changed = false;
        })
        .catch(error => {
          this.error = error.message;
          this.loaded = true;
          this.changed = false;
        });
    }
  }
};
</script>
