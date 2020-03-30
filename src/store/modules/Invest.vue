<script>
import Vue from "vue";

export default {
  namespaced: true,
  state: {
    annuities: null
  },
  getters: {
    annuities(state) {
      return state.annuities;
    },
    monthlyInstallment(state) {
      if (state.annuities) {
        return state.annuities.monthlyInstallment;
      }
      return 0;
    }
  },
  mutations: {
    setAnnuities(state, data) {
      state.annuities = data;
    },
    clearAnnuities(state) {
      state.annuities = null;
    }
  },
  actions: {
    loadAnnuities(store, params) {
      const annuities = store.getters.annuities;
      if (
        annuities &&
        annuities.amount == params.amount &&
        annuities.duration == params.duration
      ) {
        return annuities;
      }
      return new Promise((resolve, reject) => {
        Vue.apiService
          .annuitiesPost(params)
          .then(response => {
            store.commit("setAnnuities", response);
            resolve(response);
          })
          .catch(error => {
            store.commit("clearAnnuities");
            reject(error);
          });
      });
    }
  }
};
</script>
