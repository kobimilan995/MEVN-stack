import Vuex from 'vuex';
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
  		state.authCheck = true;
  	}
  }
});

export default store;