
<template>
  <div>
    <div class="header bg-primary pb-6">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white d-inline-block mb-0 text-capitalize">create new product</h6>
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
              <form @submit.prevent="saveProduct()" autocomplete="off">
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
                    <input type="file" name="image" id="image" class="form-control" />
                    <error v-for="(item, index) in errors.image" :error="item" :key="index" />
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    for="gallary"
                    class="col-md-3 col-sm-3 col-form-label text-capitalize"
                  >gallary</label>
                  <div class="col-md-8 col-sm-9">
                    <input multiple type="file" name="gallary[]" id="gallary" class="form-control" />
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
import Error from "../../../components/error";
export default {
  components: { Error },
  layout: "dashboard",
  middleware: "admin",
  head() {
    return {
      title: "Task Create new product",
    };
  },
  data() {
    return {
      errors: {},
    };
  },
  methods: {
    async saveProduct() {
      let form = new FormData(event.target);
      try {
        let response = await axios.post("/admin/products", form);
        this.errors = {};
        this.$notify({
          group: "foo",
          text: response.data.message,
          type: "success",
        });
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
