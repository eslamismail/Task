export default async function({ store, redirect }) {
  if (!store.state.user.profile) {
    try {
      let response = await axios.get("user");
      const { user } = response.data;
      $nuxt.$store.commit("user/refresh", user);
    } catch (error) {
      if (!error.response) {
        $nuxt.$store.commit("user/logout", {});
      } else if (error.response.status == 401) {
        $nuxt.$refreshUser();
      }
    }
  }
}
