export const state = () => ({
  token: localStorage.getItem("token"),
  admin: null
});

export const mutations = {
  login(state, { token, admin }) {
    localStorage.setItem("token", token);
    state.token = token;
    state.admin = admin;
    axios.defaults.headers.authorization = `Bearer ${token}`;
    this.$router.push("/admin");
  },
  logout(state, {}) {
    state.token = null;
    state.admin = null;
    this.$router.push("/admin/login");
    localStorage.removeItem("token");
    axios.defaults.headers.authorization = "";
  },
  refresh(state, admin) {
    state.admin = admin;
  },
  refreshToken(state, { token, admin }) {
    localStorage.setItem("token", token);
    state.token = token;
    state.admin = admin;
    axios.defaults.headers.authorization = `Bearer ${token}`;
  }
};
