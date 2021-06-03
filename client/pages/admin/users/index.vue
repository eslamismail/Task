<template>
  <div>
    <div class="header bg-primary pb-6">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white d-inline-block mb-0 text-capitalize">users</h6>
            </div>
            <div class="col-lg-6 col-5 text-right">
              <!-- <a href="#" class="btn btn-sm btn-neutral">New</a> -->
              <nuxt-link to="/admin/users/create" class="btn btn-sm btn-neutral text-capitalize">
                <i class="fa fa-plus"></i>
                create new user
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
              <h3 class="mb-0 text-capitalize">users</h3>
            </div>

            <div class="table-responsive">
              <data-table
                :searchOption="searchOption"
                :columns="columns"
                :data="users"
                @fetchData="getUsers"
                @deleteItem="deleteCustomer"
                @editItem="editCustomer"
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
  data() {
    return {
      searchOption: { enabled: true },
      columns: [
        {
          label: "#",
          field: "id",
          type: "number",
          sortable: true,
        },
        {
          label: "name",
          field: "name",
          sortable: true,
        },
        {
          label: "email",
          field: "email",
          sortable: true,
        },
        {
          label: "view cart",
          field: "cart_link",
          sortable: true,
        },
        {
          label: "created at",
          field: "created_at",
          sortable: true,
        },
        {
          label: "Action",
          field: "action",
          sortable: true,
        },
      ],
      users: { data: [] },
      page: 1,
    };
  },
  head() {
    return {
      title: "Task Users",
    };
  },
  async created() {
    await this.getUsers();
  },
  watch: {
    users(val, oldVal) {
      this.users.data.forEach((item, key) => {
        const { id } = item;
        item.created_at = moment(item.created_at).format("llll");
        item.cart_link = `/admin/users/${id}/cart`;
      });
    },
  },
  methods: {
    async getUsers(page = 1) {
      this.page = page;
      try {
        const response = await axios.get(`/admin/users?page=${page}`);
        this.users = response.data.users;
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
    async deleteCustomer(id) {
      let ask = confirm("Ary you sure ?");
      if (ask) {
        try {
          let response = await axios.delete(`/admin/users/${id}`);
          this.$notify({
            group: "foo",
            text: response.data.message,
            type: "success",
          });
          this.getUsers(this.page);
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
            this.getUsers(this.page);
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
    editCustomer(id) {
      this.$router.push(`/admin/users/${id}/edit`);
    },
  },
};
</script>
