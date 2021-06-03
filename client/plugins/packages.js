import Vue from "vue";
import Notifications from "vue-notification";
import VueGoodTablePlugin from "vue-good-table";
// import the styles
import "vue-good-table/dist/vue-good-table.css";

Vue.use(Notifications);
Vue.use(VueGoodTablePlugin);

window.$ = require("jquery");
window.moment = require("moment");
window.jQuery = require("jquery");
import VModal from "vue-js-modal/dist/index.nocss.js";
import "vue-js-modal/dist/styles.css";
Vue.use(VModal, {
  dynamicDefaults: {
    height: "auto",
    clickToClose: false
  }
});

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

window.moment = require("moment");

import PerfectScrollbar from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

Vue.use(PerfectScrollbar);
