export const state = () => ({
  token: localStorage.getItem("token"),
  profile: undefined,
  cart: []
});

export const mutations = {
  login(state, { token, user }) {
    localStorage.setItem("token", token);
    state.token = token;
    state.profile = user;
    axios.defaults.headers.authorization = `Bearer ${token}`;
    this.$router.push("/");
  },
  logout(state, {}) {
    state.token = null;
    state.admin = null;
    this.$router.push("/login");
    localStorage.removeItem("token");
    axios.defaults.headers.authorization = "";
  },
  refresh(state, user) {
    state.profile = user;
  },
  refreshToken(state, { token, user }) {
    localStorage.setItem("token", token);
    state.token = token;
    state.profile = user;
    axios.defaults.headers.authorization = `Bearer ${token}`;
  },
  setCart(state, carts) {
    state.cart = carts;
  },
  addToCart(state, cart) {
    state.cart.push(cart);
  },
  editCart(state, cart) {
    let newCart = [];
    for (let index = 0; index < state.cart.length; index++) {
      const item = state.cart[index];
      if (item.id === cart.id) {
        newCart.push(cart);
      } else {
        newCart.push(item);
      }
    }

    state.cart = newCart;
  },

  reomveFromCart(state, cart) {
    state.cart = state.cart.filter(item => item.id != cart.id);
  }
};
