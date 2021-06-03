<template >
  <div>
    <perfect-scrollbar @ps-scroll-y="onScroll" ref="scrollbar">
      <div class="container">
        <div class="products row mt-5 align-items-center">
          <product-component
            @addToCart="addToCart"
            v-for="(item, index) in products.data"
            :product="item"
            :key="index"
          />
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>
<script>
import productComponent from "../components/product";

export default {
  components: { productComponent },
  layout: "app",
  middleware: "user",
  head() {
    return {
      title: "Task - index",
    };
  },
  data() {
    return {
      products: { data: [], links: [] },
      page: 1,
    };
  },
  computed: {
    cart() {
      return this.$store.state.user.cart;
    },
  },

  async created() {
    this.products = await this.getProducts();
  },
  methods: {
    async onScroll(event) {
      const end = this.$refs.scrollbar.ps.reach.y;
      if (end == "end") {
        // console.log(true);
        const newProducts = await this.getProducts(this.page + 1);
        if (newProducts.data.length > 0) {
          this.products.data = this.products.data.concat(newProducts.data);
          this.products.links = newProducts.links;
        }
      }
    },
    async getProducts(page) {
      if (!page) {
        page = 1;
      }

      this.page = page;
      try {
        const response = await axios.get(`/products?page=${page}`);
        const { last_page } = response?.data?.products;
        if (this.page > last_page) {
          this.page = last_page;
        }
        return response.data.products;
      } catch (error) {}

      return { data: [] };
    },
    async addToCart(product) {
      try {
        const product_id = product.id;
        const response = await axios.post("cart", { product_id });
        const { message, cart } = response.data;
        this.$notify({
          group: "foo",
          text: message,
          type: "success",
        });

        let checkCart = this.cart.find((item) => item.id == cart.id);
        if (checkCart) {
          this.$store.commit("user/editCart", cart);
        } else {
          this.$store.commit("user/addToCart", cart);
        }
      } catch (error) {
        if (!error.response) {
          this.$notify({
            group: "foo",
            text: "no internet access",
            type: "success",
          });
        } else if (error.response.status == 401) {
          this.$refreshUser();

          this.$notify({
            group: "foo",
            text: error.response.data.message,
            type: "success",
          });
        }
      }
    },
  },
};
</script>
<style scoped>
.ps {
  height: calc(100vh - 80px);
}
</style>
