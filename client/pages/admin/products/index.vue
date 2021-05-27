<template>
  <div>
    <div class="header bg-primary pb-6">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white d-inline-block mb-0 text-capitalize">products</h6>
            </div>
            <div class="col-lg-6 col-5 text-right">
              <!-- <a href="#" class="btn btn-sm btn-neutral">New</a> -->
              <nuxt-link to="/admin/products/create" class="btn btn-sm btn-neutral text-capitalize">
                <i class="fa fa-plus"></i>
                create new product
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-header border-0">
              <h3 class="mb-0 text-capitalize">products</h3>
            </div>

            <div class="table-responsive">
              <vue-good-table
                styleClass="table align-items-center table-bordered"
                :columns="columns"
                :rows="products.data"
              >
                <template slot="table-row" slot-scope="props">
                  <span v-if="props.column.field == 'action'">
                    <div class="dropdown">
                      <button
                        class="btn btn-primary dropdown-toggle text-capitalize"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >action</button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <nuxt-link
                          class="dropdown-item text-capitalize"
                          :to="`/admin/products/${props.row.id}/edit`"
                        >
                          <i class="fa fa-edit"></i>
                          edit
                        </nuxt-link>
                        <a
                          class="dropdown-item text-capitalize"
                          @click.prevent="deleteProduct(props.row.id)"
                          href="#"
                        >
                          <i class="fa fa-trash"></i>
                          delete
                        </a>
                      </div>
                    </div>
                  </span>
                </template>
              </vue-good-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "dashboard",
  middleware: "admin",
  head() {
    return {
      title: "Task Products",
    };
  },
  data() {
    return {
      products: { data: [] },
      page: 1,
      columns: [
        {
          label: "#",
          field: "id",
          type: "number",
        },
        {
          label: "name",
          field: "name",
        },
        {
          label: "description",
          field: "description",
        },
        {
          label: "price",
          field: "price",
          type: "number",
        },
        {
          label: "created on",
          field: "created_at",
        },
        {
          label: "action",
          field: "action",
        },
      ],
    };
  },
  mounted() {
    document.addEventListener("scroll", async () => {
      const height = $(".table-responsive").height();
      const scrollFromHeader = $(document).scrollTop();
      if (scrollFromHeader >= height) {
        if (this.page <= this.products.last_page) {
          const newProducts = await this.getProducts(this.page + 1);
          if (newProducts.data.length > 0) {
            this.products.data = this.products.data.concat(newProducts.data);
          }
        }
      }
    });
  },
  async fetch() {
    this.products = await this.getProducts();
  },
  watch: {
    products(val, oldVal) {
      this.products.data.forEach((item) => {
        item.created_at = moment(item.created_at).format("llll");
        item.comission = `${item.comission}%`;
      });
    },
  },
  methods: {
    async getProducts(page) {
      if (!page) {
        page = 1;
      }
      this.page = page;
      const data = await axios
        .get(`/admin/products?page=${page}`)
        .then((res) => res.data.products ?? { data: {} })
        .catch((error) => {
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
            this.$refresh();
          } else {
            this.$notify({
              group: "foo",
              text: error.response.statusText,
              type: "error",
            });
          }
          return { data: [] };
        });

      if (data.last_page <= this.page) {
        this.page = data.last_page;
      }

      return data;
    },
    async deleteProduct(id) {
      const ask = confirm("Are you sure ?");
      if (ask) {
        try {
          let response = await axios.delete(`/admin/products/${id}`);
          this.$notify({
            group: "foo",
            text: response.data.message,
            type: "success",
          });
          this.products = this.products.filter((item) => item.id != id);
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
            this.products = this.products.filter((item) => item.id != id);
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
      }
    },
  },
};
</script>
