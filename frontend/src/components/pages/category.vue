<template>
	<div>
		<i v-if="showLoading" class="fa fa-spinner fa-pulse fa-1x fa-fw"></i>
		<div>
			<h1>
				{{category.title}}
			</h1>
			<div v-for="(post, index) in posts" class="card" style="margin-top: 15px;">
			  <div class="card-header"><h3 style="display: inline;">{{post.owner.email}}</h3> <a href="#"><i class="fa fa-close pull-right" @click="deletePost"></i></a></div>
			  <div class="card-body">
			  	<h5>
			  		{{post.title}}
			  	</h5>
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
				posts: [],
				category: {},
				showLoading: false
			}
		},
		props: {
			categoryId: {
				required: true
			}
		},

		methods: {
			getPosts() {
				this.axios.get('http://localhost:3001/api/post/categories?category='+this.categoryId, {
				    headers: { 
				    	authorization: localStorage.getItem('jwt') 
				    }
				}).then(response => {
					console.log(response.data);
					this.posts = response.data.posts;
					this.category = response.data.category;
				}).catch(error => {
					console.log(error);
				});
			},

			deletePost() {

			},
			viewMore(post) {
				this.$router.push('/post/'+post._id);
			}
		},

		created() {
			this.getPosts();
		}
	}
</script>