<template>
  <div>
    <input
      ref="input"
      v-bind="attrs"
      type="number"
      class="form-control"
      :value="currentValue"
      :min="min"
      :max="max"
      :placeholder="placeholder"
      @change="change"
      @paste="paste"
    />
  </div>
</template>

<script>
const REGEXP_NUMBER = /^-?(?:\d+|\d+\.\d+|\.\d+)(?:[eE][-+]?\d+)?$/;

export default {
  name: "NumberInput",
  model: {
    event: "change"
  },
  props: {
    attrs: {
      type: Object,
      default: undefined
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: Infinity
    },
    placeholder: {
      type: String,
      default: undefined
    },
    value: {
      type: Number,
      default: NaN
    }
  },
  data() {
    return {
      currentValue: this.min
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue, oldValue) {
        if (
          !(isNaN(newValue) && typeof oldValue === "undefined") &&
          newValue !== this.currentValue
        ) {
          this.setValue(newValue);
        }
      }
    }
  },
  methods: {
    change(event) {
      this.setValue(Math.min(this.max, Math.max(this.min, event.target.value)));
    },
    paste(event) {
      const clipboardData = event.clipboardData || window.clipboardData;

      if (clipboardData && !REGEXP_NUMBER.test(clipboardData.getData("text"))) {
        event.preventDefault();
      }
    },
    setValue(value) {
      const oldValue = this.currentValue;
      let newValue = Math.round(value);

      if (this.min <= this.max) {
        newValue = Math.min(this.max, Math.max(this.min, newValue));
      }

      this.currentValue = newValue;

      if (newValue === oldValue) {
        this.$refs.input.value = newValue;
      }

      this.$emit("change", newValue, oldValue);
    }
  }
};
</script>

<style>
input[type="number"] {
  -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
