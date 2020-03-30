import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import invest from "./modules/Invest";

export default new Vuex.Store({
  modules: {
    invest
  }
});
