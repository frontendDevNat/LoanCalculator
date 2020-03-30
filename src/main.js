import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import apiService from "./services/ApiService";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { NavbarPlugin } from "bootstrap-vue";

Vue.use(NavbarPlugin);

Vue.config.productionTip = false;

Vue.apiService = new apiService();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
