<template>
	<div>
	<form @submit.prevent="addPost">
	  <div class="form-group">
	    <label for="exampleInputEmail1">Add post content</label>
	    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter post" v-model="postContent">
	  </div>
	  <button type="submit" class="btn btn-primary">Add post</button>
	</form>
	<i v-if="showLoading" class="fa fa-spinner fa-pulse fa-1x fa-fw"></i>
	<div>
		<div v-for="post in posts" class="card" style="margin-top: 15px;">
		  <div class="card-header"><h3 style="display: inline;">{{post.ownersName}}</h3> <a href="#"><i class="fa fa-close pull-right" @click="deletePost"></i></a></div>
		  <div class="card-body"><p>{{post.content}}</p></div>
		  <div class="card-footer"> <a href=""><i class="fa fa-thumbs-up"></i></a>  <p class="pull-right">{{difForHumans(post.created_at)}}</p></div>
		</div>
	</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				postContent: '',
				showLoading: false
			}
		},
		methods: {
			addPost() {
				console.log('asd');
				this.axios.post('http://localhost:3001/api/post', {
					content: this.postContent
				}, {
				    headers: { authorization: localStorage.getItem('jwt') }
				}).then(response => {
					console.log(response.data);
					this.$store.commit('posts/ADD_POST', response.data);
				}).catch(error => {
					console.log(error);
				});
			},

			getPosts() {
				this.showLoading = true;
				this.axios.get('http://localhost:3001/api/posts', {
				    headers: { authorization: localStorage.getItem('jwt') }
				}).then(response => {
					console.log(response.data);
					this.$store.commit('posts/SET_POSTS', response.data);
					this.showLoading = false;
				}).catch(error => {
					console.log(error);
				});
			},
			difForHumans(createdAt) {
				return moment(createdAt).fromNow();
			},
			deletePost() {
				
			}
		},

		computed: {
			posts() {
				return this.$store.state.posts.posts;
			}
		},

		created() {
			this.getPosts();
		}
	}
</script>