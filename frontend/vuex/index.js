import Vuex from 'vuex';
import posts from './modules/posts';
const store = new Vuex.Store({
  state: {
    authCheck: !!localStorage.getItem("jwt")
  },
  mutations: {
  	LOGOUT(state) {
  		localStorage.removeItem("jwt");
  		state.authCheck = false;
  	},
  	LOGIN(state, data) {
  		localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("authUser", JSON.stringify(data.user));
  		state.authCheck = true;
  	}
  },
  modules: {
    posts
  }
});

export default store;