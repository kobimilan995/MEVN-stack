<template>
	<div class="raw">
		<div class="col-md-4 col-sm-offset-4">
			<form @submit.prevent="login">
			  <div class="form-group">
			    <label for="formGroupExampleInput">Enter your email</label>
			    <input type="email" class="form-control" id="formGroupExampleInput" placeholder="Email" v-model="email">
			  </div>
			  <div class="form-group">
			    <label for="formGroupExampleInput2">Enter password</label>
			    <input type="password" class="form-control" id="formGroupExampleInput3" placeholder="Password" v-model="password">
			  </div>
			  <button type="submit" class="btn btn-primary" :disabled="showLoading">Login <i v-if="showLoading" class="fa fa-spinner fa-pulse fa-1x fa-fw"></i></button>
			</form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				password: '',
				email: '',
				showLoading: false
			}
		},

		methods: {
			login() {
				this.showLoading = true;
				this.axios.post('http://localhost:3001/users/login', {
					email: this.email,
					password: this.password
				}).then(response => {
					this.$store.commit('LOGIN', {
						jwt: response.headers.authorization,
						user: response.data
					});
					this.$router.push('/dashboard');
					this.showLoading = false;
				}).catch(error => {
					console.log(error);
				});
			}
		}
	}
</script>