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
              <data-table
                :searchOption="searchOption"
                :columns="columns"
                :data="products"
                @fetchData="getProducts"
                @deleteItem="deleteProduct"
                @editItem="editProduct"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DataTable from "@/components/public/datatable";
export default {
  layout: "dashboard",
  middleware: "admin",
  components: { DataTable },
  head() {
    return {
      title: "Task Products",
    };
  },
  data() {
    return {
      products: { data: [] },
      searchOption: { enabled: true },
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
  async fetch() {
    await this.getProducts();
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
    async getProducts(page = 1) {
      this.page = page;
      const data = await axios
        .get(`/admin/products?page=${page}`)
        .then((res) => (this.products = res.data.products ?? { data: [] }))
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
          this.getProducts(this.page);
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
            this.getProducts(this.page);
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

    editProduct(id) {
      this.$router.push(`/admin/products/${id}/edit`);
    },
  },
};
</script>
