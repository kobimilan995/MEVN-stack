<template>
	<div class="raw">
		<div class="col-md-4 col-sm-offset-4">
			<form @submit.prevent="register">
			  <div class="form-group">
			    <label for="formGroupExampleInput">Enter your email</label>
			    <input type="email" class="form-control" id="formGroupExampleInput" placeholder="Email" v-model="email">
			  </div>
			  <div class="form-group">
			    <label for="formGroupExampleInput2">Enter username</label>
			    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Username" v-model="username">
			  </div>
			  <div class="form-group">
			    <label for="formGroupExampleInput2">Enter password</label>
			    <input type="password" class="form-control" id="formGroupExampleInput3" placeholder="Password" v-model="password">
			  </div>
			  <button type="submit" class="btn btn-primary" :disabled="showLoading">Register <i v-if="showLoading" class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></button>
			</form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				email: '',
				showLoading: false
			}
		},

		methods: {
			register() {
				this.showLoading = true;
				this.axios.post('http://localhost:3001/users/register', {
					email: this.email,
					password: this.password,
					username: this.username
				}).then(response => {
					console.log(response.headers);
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