<template>
  <div>
    <div class="header bg-primary pb-6">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white d-inline-block mb-0 text-capitalize">update user</h6>
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
              <form @submit.prevent="updateuser()" autocomplete="off" method="post">
                <div class="form-group row">
                  <label
                    for="first_name"
                    class="col-md-3 col-sm-3 col-form-label text-capitalize"
                  >first name</label>
                  <div class="col-md-8 col-sm-9">
                    <input
                      type="text"
                      name="first_name"
                      placeholder="First name"
                      id="first_name"
                      class="form-control"
                      :value="user.first_name"
                    />
                    <error v-for="(item, index) in errors.first_name" :error="item" :key="index" />
                  </div>
                </div>

                <div class="form-group row">
                  <label
                    for="last_name"
                    class="col-form-label col-md-3 col-sm-3 text-capitalize"
                  >last name</label>
                  <div class="col-md-8 col-sm-9">
                    <input
                      placeholder="Last name"
                      type="text"
                      name="last_name"
                      id="last_name"
                      class="form-control"
                      :value="user.last_name"
                    />
                    <error v-for="(item, index) in errors.last_name" :error="item" :key="index" />
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
                      :value="user.email"
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
                    <img
                      :src="user.avatar"
                      v-if="user.avatar"
                      class="mb-2"
                      width="100px"
                      height="100px"
                    />
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
import Error from "../../../../components/error";

export default {
  layout: "dashboard",
  middleware: "admin",
  components: { Error },
  head() {
    return {
      title: "Task - Update user",
    };
  },
  data() {
    return {
      errors: {},
      user: {},
    };
  },
  created() {
    this.getuser(this.$route.params.id);
  },
  methods: {
    solveDate(date) {
      if (date) {
        date = moment(date).format("yyy-MM-DD");
        return date;
      }
    },
    async getuser(id) {
      try {
        let response = await axios.get(`/admin/users/${id}`);
        this.user = response.data.user;
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
    async updateuser() {
      let form = new FormData(event.target);
      form.append("_method", "PUT");
      $(".btn").attr("disabled", true);
      try {
        let response = await axios.post(`/admin/users/${this.user.id}`, form);
        this.errors = {};
        this.$notify({
          group: "foo",
          text: response.data.message,
          type: "success",
        });
        $(".btn").attr("disabled", false);
        this.$router.push("/admin/users");
      } catch (error) {
        $(".btn").attr("disabled", false);
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
