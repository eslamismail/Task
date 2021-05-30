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
              <vue-good-table styleClass="table table-bordered" :columns="columns" :rows="users">
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
                          :to="`/admin/users/${props.row.id}/edit`"
                        >
                          <i class="fa fa-edit"></i>
                          edit
                        </nuxt-link>
                        <a
                          class="dropdown-item text-capitalize"
                          @click.prevent="deleteCustomer(props.row.id)"
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
  data() {
    return {
      columns: [
        {
          label: "#",
          field: "id",
          type: "number",
        },
        {
          label: "arabic name",
          field: "translations.0.name",
        },
        {
          label: "english name",
          field: "translations.1.name",
        },
        {
          label: "birthdate",
          field: "birthdate",
        },
        {
          label: "email",
          field: "email",
        },
        {
          label: "created at",
          field: "created_at",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
      users: [],
    };
  },
  head() {
    return {
      title: "Task Customers",
    };
  },
  async fetch() {
    this.users = await axios
      .get("/admin/users")
      .then((res) => res.data.users)
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
        return [];
      });
  },
  watch: {
    users(val, oldVal) {
      this.users.forEach((item, key) => {
        item.created_at = moment(item.created_at).locale("en").format("llll");
        item.birthdate = momentH(item.birthdate).format("iYYYY - iMMM - iD");
      });
    },
  },
  methods: {
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
          this.users = this.users.filter((item) => item.id != id);
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
            this.users = this.users.filter((item) => item.id != id);
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
