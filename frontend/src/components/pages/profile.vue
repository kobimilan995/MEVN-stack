<template>
	<div>
		<h1>Your followers</h1>
		<div v-for="(user, index) in followers" class="card" style="margin-top: 15px;">
		  <div class="card-header"><h3 style="display: inline;">{{user.email}}</h3></div>
		  <div class="card-body">
		  	<h5>
		  		{{user.username}}
		  	</h5>
		  </div>
		  <div class="card-footer">
			  	<button v-if="!isFollowed(user)" class="btn btn-primary" @click="follow(user)">Follow</button>
			  	<button v-else class="btn btn-primary" @click="unfollow(user)">Unfollow</button>
		  </div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				followers: [],
				following: [],
				showLoading: false
			}
		},
		methods: {
			getFollowers() {
				this.showLoading = true;
				this.axios.get('http://localhost:3001/api/user', {
				    headers: { authorization: localStorage.getItem('jwt') }
				}).then(response => {
					console.log(response.data);
					this.followers = response.data.followers;
					this.following = response.data.following;
				}).catch(error => {
					console.log(error);
				});
			},
			isFollowed(user) {
				var returnValue = false;
				this.following.forEach(followingUser => {
					if(followingUser._id == user._id) {
						returnValue = true;
					}
					console.log('this following', this.following);
				});
				return returnValue;
			},
			follow(user) {
				this.axios.post('http://localhost:3001/api/user/follow', {
					user: user._id
				},  {
				    headers: { authorization: localStorage.getItem('jwt') }
				}).then(response => {
					console.log(response.data);
					this.following.push(user);
				}).catch(error => {
					console.log(error);
				});
			},

			unfollow(user) {
				this.axios.post('http://localhost:3001/api/user/unfollow', {
					user: user._id
				},  {
				    headers: { authorization: localStorage.getItem('jwt') }
				}).then(response => {
					console.log(response.data);
					this.following.splice(user);
				}).catch(error => {
					console.log(error);
				});
			}
		},

		created() {
			this.getFollowers();
		},

		mounted() {

			console.log(this.loggedUser);
		},
		computed: {
			loggedUser() {
				return JSON.parse(localStorage.getItem('authUser'));
			}
		}
	}
</script>