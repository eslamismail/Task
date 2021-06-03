<template>
  <div>
    <div class="header bg-primary pb-6">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white d-inline-block mb-0 text-capitalize">create new user</h6>
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
              <form @submit.prevent="saveCustomer()" autocomplete="off" method="post">
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
                  <label for="email" class="col-form-label col-md-3 col-sm-3 text-capitalize">email</label>
                  <div class="col-md-8 col-sm-9">
                    <input
                      placeholder="Email"
                      type="email"
                      name="email"
                      id="email"
                      class="form-control"
                    />
                    <error v-for="(item, index) in errors.email" :error="item" :key="index" />
                  </div>
                </div>

                <div class="form-group row">
                  <label
                    for="avatar"
                    class="col-form-label col-md-3 col-sm-3 text-capitalize"
                  >avatar</label>
                  <div class="col-md-8 col-sm-9">
                    <input
                      placeholder="Avatar"
                      type="file"
                      name="avatar"
                      id="avatar"
                      class="form-control"
                    />
                    <error v-for="(item, index) in errors.avatar" :error="item" :key="index" />
                  </div>
                </div>

                <div class="form-group row">
                  <label
                    for="password"
                    class="col-form-label col-md-3 col-sm-3 text-capitalize"
                  >password</label>
                  <div class="col-md-8 col-sm-9">
                    <input
                      placeholder="password"
                      type="password"
                      name="password"
                      id="password"
                      class="form-control"
                    />
                    <error v-for="(item, index) in errors.password" :error="item" :key="index" />
                  </div>
                </div>

                <div class="form-group row">
                  <label
                    for="password_confirmation"
                    class="col-form-label col-md-3 col-sm-3 text-capitalize"
                  >password confirmation</label>
                  <div class="col-md-8 col-sm-9">
                    <input
                      placeholder="password confirmation"
                      type="password"
                      name="password_confirmation"
                      id="password_confirmation"
                      class="form-control"
                    />
                    <error
                      v-for="(item, index) in errors.password_confirmation"
                      :error="item"
                      :key="index"
                    />
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
  layout: "dashboard",
  middleware: "admin",
  components: { Error },
  head() {
    return {
      title: "Task - create new user",
    };
  },
  data() {
    return {
      errors: {},
    };
  },
  methods: {
    async saveCustomer() {
      let form = new FormData(event.target);
      try {
        let response = await axios.post("/admin/users", form);
        this.errors = {};
        this.$notify({
          group: "foo",
          text: response.data.message,
          type: "success",
        });
        // console.log(response?.data);
        this.$router.push("/admin/users");
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
