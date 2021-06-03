<template>
  <div>
    <div class="header bg-primary pb-6">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white d-inline-block mb-0 text-capitalize">update product</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-header border-0"></div>
            <div class="card-body">
              <form @submit.prevent="updateProduct()" autocomplete="off">
                <div class="form-group row">
                  <label for="name" class="col-md-3 col-sm-3 col-form-label text-capitalize">name</label>
                  <div class="col-md-8 col-sm-9">
                    <input
                      type="text"
                      name="name"
                      placeholder="name"
                      id="name"
                      class="form-control"
                    />
                    <error v-for="(item, index) in errors.name" :error="item" :key="index" />
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    for="description"
                    class="col-md-3 col-sm-3 col-form-label text-capitalize"
                  >description</label>
                  <div class="col-md-8 col-sm-9">
                    <textarea
                      name="description"
                      id="description"
                      placeholder="Description"
                      class="form-control"
                    ></textarea>
                    <error v-for="(item, index) in errors.description" :error="item" :key="index" />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="image" class="col-md-3 col-sm-3 col-form-label text-capitalize">image</label>
                  <div class="col-md-8 col-sm-9">
                    <img
                      :src="product.image"
                      v-if="product.image"
                      class="mb-2"
                      width="100px"
                      height="100px"
                    />
                    <input
                      accept="image/*"
                      type="file"
                      name="image"
                      id="image"
                      class="form-control"
                    />
                    <error v-for="(item, index) in errors.image" :error="item" :key="index" />
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    for="gallary"
                    class="col-md-3 col-sm-3 col-form-label text-capitalize"
                  >gallary</label>
                  <div class="col-md-8 col-sm-9">
                    <carousel
                      :paginationEnabled="false"
                      class="mb-2"
                      v-if="product.gallary && product.gallary.length > 0"
                    >
                      <slide v-for="(item, index) in product.gallary" :key="index">
                        <img :src="item" height="200px" />
                      </slide>
                    </carousel>
                    <input
                      multiple
                      type="file"
                      name="gallary[]"
                      accept="image/*"
                      id="gallary"
                      class="form-control"
                    />
                    <error v-for="(item, index) in errors['gallary.0']" :error="item" :key="index" />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="price" class="col-md-3 col-sm-3 col-form-label text-capitalize">price</label>
                  <div class="col-md-8 col-sm-9">
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      id="price"
                      class="form-control"
                      placeholder="Price"
                    />
                    <error v-for="(item, index) in errors.price" :error="item" :key="index" />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-12">
                    <button class="btn btn-primary">save</button>
                    <a @click.prevent="$router.go(-1)" class="btn btn-default" href="#">cancel</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import Error from "../../../../components/error";
export default {
  layout: "dashboard",
  middleware: "admin",
  components: {
    Carousel,
    Slide,
    Error,
  },
  head() {
    return {
      title: "Task Update product",
    };
  },
  data() {
    return {
      product: {},
      errors: {},
    };
  },
  async mounted() {
    await this.getpPoduct();
  },

  methods: {
    setElementValues({ name, description, price }) {
      document.getElementById("name").value = name;
      document.getElementById("description").value = description;
      document.getElementById("price").value = price;
    },
    async getpPoduct() {
      try {
        const response = await axios.get(
          `admin/products/${this.$route.params.id}`
        );
        this.product = response.data.product;
        this.setElementValues(this.product);
      } catch (error) {
        if (!error.response) {
          console.log(error);
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
          this.$router.go(-1);
        } else if (error.response.status == 401) {
          this.$refresh();
        } else {
          this.$notify({
            group: "foo",
            text: error.response.statusText,
            type: "error",
          });
        }
      }
    },
    async updateProduct() {
      let form = new FormData(event.target);
      form.append("_method", "PUT");
      try {
        let response = await axios.post(
          `/admin/products/${this.product.id}`,
          form
        );
        this.errors = {};
        this.$notify({
          group: "foo",
          text: response.data.message,
          type: "success",
        });
        $(".btn").attr("disabled", false);
        this.$router.push("/admin/products");
      } catch (error) {
        this.errors = {};
        if (!error.response) {
          this.$notify({
            group: "foo",
            text: "No internet access",
            type: "error",
          });
        } else if (error.response.status == 422) {
          this.$notify({
            group: "foo",
            text: error.response.data.message,
            type: "error",
          });
          this.errors = error.response.data.errors;
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
          this.$router.go(-1);
        } else if (error.response.status == 401) {
          this.$refresh();
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
