<template>
  <perfect-scrollbar ref="scrollbar">
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-12 justify-content-center">
          <h1 class="text-center">Total cart amount: {{total}} LE</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12" v-for="(item, index) in cart" :key="index">
          <div class="card mb-3">
            <div class="row g-0 align-items-center">
              <div class="col-md-4">
                <img width="80%" :src="item.product.image" alt="..." />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{{item.product.name}}</h5>
                  <p class="card-text">{{item.product.description}}</p>
                  <p class="card-text">Price: {{item.product.price}}</p>
                  <p class="card-text">Total: {{item.product.price * item.quantity}}</p>
                  <div class="card-text">
                    <a
                      @click.prevent="deleteItem(item.id)"
                      :class="`btn btn-danger text-white`"
                      :disabled="true"
                    >
                      <i class="fas fa-trash"></i>
                    </a>
                    <a
                      @click.prevent="removeItem(item.id)"
                      :class="`btn btn-light ${isDisabled(item.quantity)}`"
                      :disabled="true"
                    >
                      <i class="fas fa-minus"></i>
                    </a>
                    <span class="btn disabled">{{item.quantity}}</span>
                    <a class="btn btn-light" @click.prevent="addItem(item.id)">
                      <i class="fas fa-plus"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </perfect-scrollbar>
</template>
<script>
export default {
  middleware: "user",
  layout: "app",
  head() {
    return {
      title: "Task - cart",
    };
  },
  data() {
    return {
      total: 0,
    };
  },
  computed: {
    cart() {
      return this.$store.state.user.cart;
    },
  },
  watch: {
    cart(cal, oldVal) {
      this.total = 0;
      for (let index = 0; index < this.cart.length; index++) {
        const item = this.cart[index];
        const { price } = item?.product;
        this.total += price * item.quantity;
      }
    },
  },
  created() {
    this.getCart();
  },
  methods: {
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
    isDisabled(quantity) {
      if (quantity == 1) {
        return "disabled";
      }
    },

    async addItem(id) {
      let { quantity } = this.cart.find((item) => item.id == id);
      quantity += 1;
      try {
        const data = { id, quantity };
        const response = await axios.put("/cart", data);
        const { cart, message } = response?.data;
        this.$store.commit("user/editCart", cart);
        this.$notify({
          group: "foo",
          text: message,
          type: "success",
        });
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
        } else if (error.response.status == 404) {
          this.$notify({
            group: "foo",
            text: error.response.data.message,
            type: "error",
          });
          const cart = this.cart.find((item) => item.id == id);
          this.$store.commit("user/reomveFromCart", cart);
        } else if (error.response.status == 401) {
          this.$refreshUser();
        }
      }
    },
    async removeItem(id) {
      let { quantity } = this.cart.find((item) => item.id == id);
      if (quantity == 1) {
        return false;
      }
      quantity -= 1;
      try {
        const data = { id, quantity };
        const response = await axios.put("/cart", data);
        const { cart, message } = response?.data;
        this.$store.commit("user/editCart", cart);
        this.$notify({
          group: "foo",
          text: message,
          type: "success",
        });
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
        } else if (error.response.status == 404) {
          const cart = this.cart.find((item) => item.id == id);
          this.$store.commit("user/reomveFromCart", cart);
          this.$notify({
            group: "foo",
            text: error.response.data.message,
            type: "error",
          });
        } else if (error.response.status == 401) {
          this.$refreshUser();
        }
      }
    },
    async deleteItem(id) {
      const ask = confirm("are you sure to delete this item ?");
      if (ask) {
        try {
          const response = await axios.delete(`/cart/${id}`);
          const { cart, message } = response?.data;
          this.$store.commit("user/reomveFromCart", cart);
          this.$notify({
            group: "foo",
            text: message,
            type: "success",
          });
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
          } else if (error.response.status == 404) {
            const cart = this.cart.find((item) => item.id == id);
            this.$store.commit("user/reomveFromCart", cart);
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
              text: error.response.data.message,
              type: "error",
            });
          }
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
