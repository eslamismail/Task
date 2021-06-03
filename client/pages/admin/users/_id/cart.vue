<template>
  <div>
    <div class="header bg-primary pb-6">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white d-inline-block mb-0 text-capitalize">view cart</h6>
            </div>
            <div class="col-lg-6 col-5 text-right"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-header border-0">
              <h3 class="mb-0 text-capitalize">total: {{total}} LE</h3>
            </div>
            <div class="table-responsive">
              <data-table
                :searchOption="searchOption"
                :columns="columns"
                :data="carts"
                @fetchData="getCart"
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
  components: {
    DataTable,
  },
  head() {
    return {
      title: "Task - show user cart",
    };
  },
  data() {
    return {
      columns: [
        {
          label: "#",
          field: "key",
          type: "number",
          sortable: true,
        },
        {
          label: "id",
          field: "id",
          type: "number",
          sortable: true,
        },
        {
          label: "name",
          field: "product.name",
          sortable: true,
        },
        {
          label: "quantity",
          field: "quantity",
          type: "number",
          sortable: true,
        },
        {
          label: "price",
          field: "product.price",
          sortable: true,
        },
        {
          label: "purchased at",
          field: "created_at",
          sortable: true,
        },
      ],
      carts: { data: [] },
      searchOption: { enabled: true, perPage: 50 },
      page: 0,
      total: 0,
    };
  },
  watch: {
    carts(val, oldVal) {
      this.carts.data.forEach((item, index) => {
        item.key = index + 1;
        item.created_at = moment(item.created_at).format("llll");
      });
    },
  },

  async created() {
    await this.getCart();
  },
  methods: {
    async getCart(page) {
      if (!page) {
        page = 1;
      }
      this.page = page;
      const { id } = this.$route.params;
      try {
        const response = await axios.get(
          `/admin/users/${id}/cart?page=${page}`
        );
        const { carts, total } = response.data;
        this.total = total ?? 0;
        this.carts = carts;
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
