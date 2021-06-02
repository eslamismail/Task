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
            <b-dropdown-item to="/cart" class="justify-content-center align-items-center">
              <i class="fas fa-eye"></i>
              <span>View all</span>
            </b-dropdown-item>
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
