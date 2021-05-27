import axios from "axios";
import Vue from "vue";
Vue.prototype.$refresh = () => {
  axios
    .post("/admin/refresh")
    .then(response => {
      let data = {
        token: response.data.token,
        admin: response.data.admin
      };
      $nuxt.$store.commit("admin/login/refreshToken", data);
      axios
        .get("admin/user")
        .then(response => {
          const { user } = response.data;
          $nuxt.$store.commit("admin/login/refresh", user);
        })
        .catch(error => {
          $nuxt.$store.commit("admin/login/logout", {});
        });
    })
    .catch(error => {
      $nuxt.$store.commit("admin/login/logout", {});
    });
  // }
};

Vue.prototype.$refreshUser = () => {
  axios
    .post("/refresh")
    .then(response => {
      let data = {
        token: response.data.token,
        user: response.data.user
      };
      $nuxt.$store.commit("/refreshToken", data);
      axios
        .get("/user")
        .then(response => {
          const { user } = response.data;
          $nuxt.$store.commit("user/refresh", user);
        })
        .catch(error => {
          $nuxt.$store.commit("user/logout", {});
        });
    })
    .catch(error => {
      $nuxt.$store.commit("user/logout", {});
    });
  // }
};
