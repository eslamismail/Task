<template>
  <div>
    <notifications group="foo" class="m-4" />
    <sidebar />
    <div class="main-content" id="panel">
      <userHeader />
      <nuxt />
      <div class="container-fluid">
        <userFooter />
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/vendors/nucleo/css/nucleo.css";
import "../assets/vendors/@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/css/argon.css?v=1.2.0";
import "../assets/vendors/jquery/dist/jquery.min.js";
import "../assets/vendors/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/vendors/js-cookie/js.cookie.js";
import "../assets/vendors/jquery.scrollbar/jquery.scrollbar.min.js";
import "../assets/vendors/jquery-scroll-lock/dist/jquery-scrollLock.min.js";
import "../assets/js/argon.js?v=1.2.0";
import Sidebar from "../components/includes/sidebar";
import userHeader from "../components/includes/header";
import userFooter from "../components/includes/footer";

export default {
  components: { Sidebar, userHeader, userFooter },
};
</script>
