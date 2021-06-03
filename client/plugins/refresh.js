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
      if (!data.admin) {
        $nuxt.$store.commit("admin/login/logout", {});
      }
      $nuxt.$store.commit("admin/login/refreshToken", data);
    })
    .catch(error => {
      $nuxt.$store.commit("admin/login/logout", {});
    });
};

Vue.prototype.$refreshUser = () => {
  axios
    .post("/refresh")
    .then(response => {
      let data = {
        token: response.data.token,
        user: response.data.user
      };
      $nuxt.$store.commit("user/refreshToken", data);
      axios
        .get("user")
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
};
