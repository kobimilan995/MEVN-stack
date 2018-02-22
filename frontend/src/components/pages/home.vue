<template>
	<div>
	<form @submit.prevent="addPost">
	  <div class="form-group">
	    <label for="exampleInputEmail1">Add post title</label>
	    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter posts title" v-model="postTitle">
	  </div>
	  <div class="form-group">
	    <label for="exampleInputEmail1">Add post content</label>
	    <textarea type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter post" v-model="postContent"></textarea>
	  </div>
	  <div class="form-group">
	    <label for="exampleFormControlSelect1">Add category</label>
	    <select class="form-control" id="exampleFormControlSelect1" v-model="categoryId">
	      <option v-for="(category, index) in categories" :value="category._id">{{category.title}}</option>
	    </select>
	  </div>
	  <button type="submit" class="btn btn-primary">Add post</button>
	</form>
	<i v-if="showLoading" class="fa fa-spinner fa-pulse fa-1x fa-fw"></i>
	<div>
		<div v-for="(post, index) in posts" class="card" style="margin-top: 15px;">
		  <div class="card-header"><h3 style="display: inline;">{{post.owner.email}}</h3> <a href="#"><i class="fa fa-close pull-right" @click="deletePost"></i></a></div>
		  <div class="card-body">
		  	<h5>
		  		{{post.title}}
		  	</h5>
		  	<p>Category: {{post.category.title}}</p>
		  </div>
		  <div class="card-footer">
		  	<!-- <button v-if="!isLiked(post)" class="btn btn-primary" @click="likePost(post._id, index)">Like</button> 
		  	<button v-else class="btn btn-primary" @click="dislikePost(post._id, index)">Unlike</button> 
			<p style="display: inline; margin-left: 20px">{{post.likes.length}} likes</p>
		  	<p class="pull-right">{{difForHumans(post.created_at)}}</p></div> -->
		  	<button class="btn btn-primary" @click="viewMore(post)">View more</button>
		  </div>
		</div>
	</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				postContent: '',
				postTitle: '',
				showLoading: false,
				categories: [],
				categoryId: ''
			}
		},
		methods: {
			viewMore(post) {
				this.$router.push('/post/'+post._id);
			},
			addPost() {
				this.axios.post('http://localhost:3001/api/post', {
					content: this.postContent,
					title: this.postTitle,
					categoryId: this.categoryId
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

			getCategories() {
				this.axios.get('http://localhost:3001/api/categories', {
				    headers: { authorization: localStorage.getItem('jwt') }
				}).then(response => {
					console.log(response.data);
					this.categoryId = response.data[0]._id;
					this.categories = response.data;
				}).catch(error => {
					console.log(error);
				});
			},
			// likePost(postId) {
			// 	this.axios.post('http://localhost:3001/api/post/like', {
			// 		post_id: postId
			// 	}, {
			// 	    headers: { authorization: localStorage.getItem('jwt') }
			// 	}).then(response => {
			// 		console.log(response);
			// 		if(response.data.type == 'success') {
			// 			this.$store.commit('posts/ADD_LIKE', {
			// 				post_index: index,
			// 				like: response.data.like
			// 			});
			// 		}
			// 	}).catch(error => {
			// 		console.log(error);
			// 	});
			// },

			// dislikePost(postId, index) {
			// 	this.axios.post('http://localhost:3001/api/post/dislike', {
			// 		post_id: postId
			// 	}, {
			// 	    headers: { authorization: localStorage.getItem('jwt') }
			// 	}).then(response => {
			// 		console.log(response);
			// 		if(response.data.type == 'success') {
			// 			this.$store.commit('posts/REMOVE_LIKE', {
			// 				post_index: index,
			// 				postId: postId,
			// 				userId: this.loggedUser._id
			// 			});
			// 		}
			// 	}).catch(error => {
			// 		console.log(error);
			// 	});
			// },
			difForHumans(createdAt) {
				return moment(createdAt).fromNow();
			},
			deletePost() {
				
			}
		},

		computed: {
			posts() {
				return this.$store.state.posts.posts;
			},
			loggedUser() {
				return JSON.parse(localStorage.getItem('authUser'));
			}
		},

		created() {
			this.getPosts();
			this.getCategories();
		}
	}
</script>