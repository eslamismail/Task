<template>
  <div class="col-md-4 col-xs-6 col-sm-6">
    <div class="card shadow-lg">
      <img :src="product.image" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">{{product.name}}</h5>
        <p class="card-text">{{product.description}}</p>
        <small class="text-muted">{{product.price}}LE</small>
        <div class="d-flex justify-content-between">
          <a href="#" @click.prevent="addToCart">Add to Cart</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      require: true,
    },
  },
  methods: {
    addToCart() {
      this.$emit("addToCart", this.product);
    },
  },
};
</script>
<style scoped>
.card a {
  color: rgb(85, 85, 85);
  background: rgb(255, 255, 255);
  padding: 5px;
}
.card a:hover {
  color: rgb(255, 255, 255);
  background: rgb(85, 85, 85);
}
</style>
