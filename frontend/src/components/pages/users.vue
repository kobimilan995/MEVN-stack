<template>
	<div>
		<h1>Users</h1>
		<div>
			<template v-for="(user, index) in users" >
				<div v-if="user._id != loggedUser._id" class="card" style="margin-top: 15px;">
				  <div class="card-header"><h3 style="display: inline;">Email: {{user.email}}</h3> <a href="#" data-toggle="modal" data-target="#areUSure"><i class="fa fa-close pull-right"></i></a></div>
				  <div class="card-body">
				  	<h5>
				  		Name: {{user.username}}
				  	</h5>
				  </div>
				  <div class="card-footer">
				  	<!-- <button v-if="!isLiked(post)" class="btn btn-primary" @click="likePost(post._id, index)">Like</button> 
				  	<button v-else class="btn btn-primary" @click="dislikePost(post._id, index)">Unlike</button> 
					<p style="display: inline; margin-left: 20px">{{post.likes.length}} likes</p>
				  	<p class="pull-right">{{difForHumans(post.created_at)}}</p></div> -->
				  	<button class="btn btn-primary" @click="follow(user)">Follow</button>
				  </div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showLoading: false,
				users: []
			}
		},

		methods: {
			getUsers() {
				this.showLoading = true;
				this.axios.get('http://localhost:3001/api/users', {
				    headers: { authorization: localStorage.getItem('jwt') }
				}).then(response => {
					console.log(response.data);
					this.users = response.data;
				}).catch(error => {
					console.log(error);
				});

			},

			follow(user) {
				this.axios.post('http://localhost:3001/api/user/follow', {
					user: user._id
				},  {
				    headers: { authorization: localStorage.getItem('jwt') }
				}).then(response => {
					console.log(response.data);
				}).catch(error => {
					console.log(error);
				});
			}
		},

		created() {
			this.getUsers();
		},

		computed: {
			loggedUser() {
				return JSON.parse(localStorage.getItem('authUser'));
			}
		}
	}
</script>