<template>
  <div class="body">
    <div class="container">
      <div class="row justify-content-md-end justify-content-sm-center">
        <div class="col-md-6 col-sm-8">
          <div class="card shadow-lg">
            <div class="card-body">
              <form @submit.prevent="login()">
                <div class="row">
                  <div class="col-md-12">
                    <h2 class="text-center text-capitalize">user login</h2>
                  </div>
                </div>
                <div class="form-group row justify-content-center">
                  <label for="email" class="col-form-label col-md-3 text-capitalize">email</label>
                  <div class="col-md-6">
                    <input
                      placeholder="Please enter your email"
                      type="email"
                      name="email"
                      id="email"
                      class="form-control"
                    />
                    <error v-for="(item, index) in errors.email" :error="item" :key="index" />
                  </div>
                </div>
                <div class="form-group row justify-content-center">
                  <label for="password" class="text-capitalize col-form-label col-md-3">password</label>
                  <div class="col-md-6">
                    <input
                      type="password"
                      placeholder="Please enter your password"
                      name="password"
                      id="password"
                      class="form-control"
                    />
                    <error v-for="(item, index) in errors.password" :error="item" :key="index" />
                  </div>
                </div>
                <div class="form-group row justify-content-end">
                  <div class="col-md-11">
                    <button class="btn btn-primary">Login</button>
                    <br />
                    <br />
                    <span class="text-capitalize text-muted">
                      <span>need to</span>
                      <nuxt-link to="/register">create a new</nuxt-link>
                      <span>account</span>
                    </span>
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
import "../assets/css/user/login.css";
import Error from "../components/error";
export default {
  head() {
    return {
      title: `${process.env.appName} Login`,
    };
  },
  components: { Error },
  data() {
    return {
      errors: [],
    };
  },
  mounted() {
    window.addEventListener("online", function () {
      console.log("online");

    });

    window.addEventListener("offline", function () {
      console.log("offline");
    });
  },
  methods: {
    async login() {
      try {
        let form = event.target;
        form = new FormData(form);
        $(".btn").attr("disabled", true);
        let response = await axios.post("/login", form);
        this.$notify({
          group: "foo",
          text: response.data.message,
          type: "success",
        });
        $(".btn").attr("disabled", false);
        this.errors = [];
        let data = {
          token: response.data.token,
          user: response.data.user,
        };
        this.$store.commit("user/login", data);
      } catch (error) {
        $(".btn").attr("disabled", false);
        this.errors = {};

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
        } else if (error.response.status == 422) {
          this.$notify({
            group: "foo",
            text: error.response.data.message,
            type: "error",
          });

          const { errors } = error.response.data;
          this.errors = errors;
        } else {
          this.$notify({
            group: "foo",
            text: error.response.data.message,
            type: "error",
          });
        }
      }
    },
  },
};
</script>
