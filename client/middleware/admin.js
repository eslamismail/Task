export default async function({ store, redirect }) {
  if (!store.state.admin.login.admin) {
    try {
      let response = await axios.get("admin/user");
      const { admin } = response.data;
      $nuxt.$store.commit("admin/login/refresh", admin);
    } catch (error) {
      if (!error.response) {
        $nuxt.$store.commit("admin/login/logout", {});
      } else if (error.response.status == 401) {
        $nuxt.$refresh();
      }
    }
  }
}
