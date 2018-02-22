<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
	  <a class="navbar-brand" href="#">CORE</a>
	  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
	    <span class="navbar-toggler-icon"></span>
	  </button>

	  <div class="collapse navbar-collapse" id="navbarSupportedContent">
	    <ul class="navbar-nav mr-auto">
	      <li class="nav-item active">
	        <router-link class="nav-link" to="/home" href="">Home</router-link>
	      </li>
	      <li class="nav-item">
	        <router-link class="nav-link" to="/about" href="#">About</router-link>
	      </li>
	      <li class="nav-item">
	        <router-link class="nav-link" to="/categories" href="#">Categories</router-link>
	      </li>
	      <li class="nav-item">
	        <router-link class="nav-link" to="/users" href="#">Users</router-link>
	      </li>
	    </ul>
	    <ul class="nav navbar-nav navbar-right" v-if="!isAuthenticated">
	      <li class="nav-item"><router-link href="" to="/register" class="nav-link">Sign Up</router-link></li>
	      <li class="nav-item"><router-link href="" to="/login" class="nav-link">Login</router-link></li>
	    </ul>
	    <ul class="nav navbar-nav navbar-right" v-if="isAuthenticated">
	      <li class="nav-item"><a href="#" @click="logout" class="nav-link">Log Out</a></li>
	      <li class="nav-item" style="margin-left: 50px"><p><router-link href="" to="/profile" class="nav-link">{{authUser.email}}</router-link></p></li>
	    </ul>
	  </div>
	</nav>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			logout() {
				console.log(localStorage.getItem('jwt'));
				this.axios.delete('http://localhost:3001/users/me/token',  {
					headers: {
						'authorization':localStorage.getItem('jwt')
					}
				}).then(response => {
					this.$store.commit('LOGOUT');
					this.$router.push('/login');
				}).catch(error => {

				});
			}
		},
		created() {
		},

		computed: {
			isAuthenticated() {
				return this.$store.state.authCheck;
			},

			authUser() {
				if(this.$store.state.authCheck) {
					return JSON.parse(localStorage.getItem('authUser'));
				}
			}
		}
	}
</script>