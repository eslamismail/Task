<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand class="text-white" to="/">Task</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="mr-5">
          <b-nav-item-dropdown left>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <span>
                <i class="fas fa-shopping-cart"></i>
                <b-badge :variant="cart.length > 0 ? 'danger' : 'success'">{{cart.length}}</b-badge>
              </span>
            </template>
            <perfect-scrollbar class="cart-nav">
              <b-dropdown-item v-if="cart.length == 0" class="text-center">
                <p class="text-center">
                  No Cart items
                  <i class="fas fa-shopping-cart"></i>
                </p>
              </b-dropdown-item>
              <b-dropdown-item
                href="#"
                v-for="(item, index) in cart"
                :key="index"
              >({{item.quantity}}) {{item.product.name}}</b-dropdown-item>
              <b-dropdown-item
                to="/cart"
                class="justify-content-center text-center align-items-center"
              >
                <i class="fas fa-eye"></i>
                <span>View all</span>
              </b-dropdown-item>
            </perfect-scrollbar>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
      <b-collapse id="nav-collapse" is-nav v-if="user">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <b-avatar variant="info" :src="user.avatar"></b-avatar>
              <span>{{user.name}}</span>
            </template>

            <b-dropdown-item href="#" @click.prevent="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user.profile;
    },

    cart() {
      return this.$store.state.user.cart;
    },
  },

  mounted() {
    this.getCart();
  },
  methods: {
    async logout() {
      axios.post("/logout").then().catch();
      this.$store.commit("user/logout", {});
    },
    async getCart() {
      try {
        const response = await axios.get("cart");
        const { carts } = response?.data?.user;
        this.$store.commit("user/setCart", carts);
      } catch (error) {
        if (!error.response) {
          this.$notify({
            group: "foo",
            text: "No internet access",
            type: "error",
          });
        } else if (error.response.status == 400) {
          this.$notify({
            group: "foo",
            text: error.response.data.message,
            type: "error",
          });
        } else if (error.response.status == 401) {
          this.$refreshUser();
        } else {
          this.$notify({
            group: "foo",
            text: error.response.statusText,
            type: "error",
          });
        }
      }
    },
  },
};
</script>

<style scoped >
.cart-nav {
  max-height: 50vh;
}

#__layout > div > div:nth-child(2) > nav > a {
  --bs-blue: #0d6efd;
  --bs-indigo: #6610f2;
  --bs-purple: #6f42c1;
  --bs-pink: #d63384;
  --bs-red: #dc3545;
  --bs-orange: #fd7e14;
  --bs-yellow: #ffc107;
  --bs-green: #198754;
  --bs-teal: #20c997;
  --bs-cyan: #0dcaf0;
  --bs-white: #fff;
  --bs-gray: #6c757d;
  --bs-gray-dark: #343a40;
  --bs-primary: #0d6efd;
  --bs-secondary: #6c757d;
  --bs-success: #198754;
  --bs-info: #0dcaf0;
  --bs-warning: #ffc107;
  --bs-danger: #dc3545;
  --bs-light: #f8f9fa;
  --bs-dark: #212529;
  --bs-font-sans-serif: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu,
    Cantarell, Noto Sans, sans-serif, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  --bs-gradient: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0)
  );
  --blue: #5e72e4;
  --indigo: #5603ad;
  --purple: #8965e0;
  --pink: #f3a4b5;
  --red: #f5365c;
  --orange: #fb6340;
  --yellow: #ffd600;
  --green: #2dce89;
  --teal: #11cdef;
  --cyan: #2bffc6;
  --gray: #8898aa;
  --gray-dark: #32325d;
  --lighter: #e9ecef;
  --primary: #5e72e4;
  --secondary: #f7fafc;
  --success: #2dce89;
  --info: #11cdef;
  --warning: #fb6340;
  --danger: #f5365c;
  --light: #adb5bd;
  --dark: #212529;
  --default: #172b4d;
  --white: #fff;
  --neutral: #fff;
  --darker: black;
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --font-family-sans-serif: Open Sans, sans-serif;
  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-family: Open Sans, sans-serif;
  font-weight: 400;
  text-align: left;
  box-sizing: border-box;
  background-color: transparent;
  text-decoration: none;
  font-size: 1.25rem;
  line-height: inherit;
  display: inline-block;
  margin-right: 1rem;
  padding-top: 0.0625rem;
  padding-bottom: 0.0625rem;
  white-space: nowrap;
  color: #fff !important;
}
</style>
