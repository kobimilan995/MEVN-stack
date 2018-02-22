<template>
	<div>
		<div class="modal fade" id="areUSure">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title">You are about to delete this post:  {{post.title}}</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		        <p>Are you sure?</p>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="deletePost">Yes</button>
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
		      </div>
		    </div>
		  </div>
		</div>
		<div class="card" style="margin-top: 15px;" v-if="!showLoading">
		  <div class="card-header"><h3 style="display: inline;">{{post.owner.email}}</h3> <a href="#"><i class="fa fa-close pull-right" data-toggle="modal" data-target="#areUSure"></i></a></div>
		  <div class="card-body">
		  	<h5>
		  		{{post.title}}
		  	</h5>
		  	<p>
		  		{{post.content}}
		  	</p>
		  	<hr>
		  	<p><small>Category: {{post.category.title}}</small></p>
		  </div>
		  <div class="card-footer">
		  	<button v-if="!isLiked(post)" class="btn btn-primary" @click="likePost()">Like</button> 
		  	<button v-else class="btn btn-primary" @click="dislikePost()">Unlike</button> 
			<p style="display: inline; margin-left: 20px">{{post.likes.length}} likes</p>
			<p style="display: inline; margin-left: 20px">{{post.comments.length}} comments</p>
		  	<p class="pull-right">{{difForHumans(post.created_at)}}</p></div>
		  </div>
		  <form @submit.prevent="addComment()">
			<div class="form-group">
			  <label for="exampleFormControlTextarea1">Comment:</label>
			  <input class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="commentContent">
			</div>
		  </form>
		<div class="card" v-for="comment in post.comments">
		  <div class="card-body">
		    <blockquote class="blockquote mb-0">
		      <p>{{comment.content}}</p>
		      <footer class="blockquote-footer">{{comment.commentOwner.email}} <cite title="Source Title">commented {{difForHumans(comment.moment_timestamp)}}</cite></footer>
		    </blockquote>
		  </div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			postId: {
				required: true
			}
		},

		data() {
			return {
				post: {},
				showLoading: true,
				commentContent: ''
			}
		},
		methods: {
			addComment(){
				this.axios.post('http://localhost:3001/api/post/comment/add', {
					post_id: this.postId,
					content: this.commentContent
				}, {
					headers: { 
				    	authorization: localStorage.getItem('jwt') 
				    }
				}).then(response => {
					this.post.comments.push(response.data);
				});
			},
			getPost() {
				this.axios.get('http://localhost:3001/api/post?post='+this.postId, {
				    headers: { 
				    	authorization: localStorage.getItem('jwt') 
				    }
				}).then(response => {
					console.log(response.data);
					this.post = response.data;
					this.showLoading = false;
				}).catch(error => {
					console.log(error);
				});
			},
			likePost() {
				console.log('likePost');
			},

			dislikePost() {
				console.log('dislikePost');
			},

			deletePost() {
				this.axios.delete('http://localhost:3001/api/post/delete?post='+this.post._id,{
				    headers: { authorization: localStorage.getItem('jwt') }
				}).then(response => {
					console.log(response);
					this.$router.push('/home');
				}).catch(error => {
					console.log(error);
				});
			},
			difForHumans(createdAt) {
				return moment(createdAt).fromNow();
			},

			isLiked(post) {
				return false;
			},
			likePost() {
				this.axios.post('http://localhost:3001/api/post/like', {
					post_id: this.postId
				}, {
				    headers: { authorization: localStorage.getItem('jwt') }
				}).then(response => {
					this.post.likes.push(response.data.like);
				}).catch(error => {
					console.log(error);
				});
			},
			dislikePost() {
				this.axios.post('http://localhost:3001/api/post/dislike', {
					post_id: this.postId
				}, {
				    headers: { authorization: localStorage.getItem('jwt') }
				}).then(response => {
					console.log(response);
					if(response.data.type == 'success') {
						this.post.likes.forEach((like, index) => {
							if(like.likeOwner._id == this.loggedUser._id) {
								this.post.likes.splice(index, 1);
							}
						});
					}
				}).catch(error => {
					console.log(error);
				});
			},

			isLiked(post) {
				var returnValue = false;
				post.likes.forEach(like => {
					console.log('loggedEmail',like.likeOwner.email == this.loggedUser.email );
					if(like.likeOwner.email == this.loggedUser.email) {
						returnValue = true;
					}
				});
				return returnValue;
			}
		},
		created() {
			this.getPost();
		},

		computed: {
			loggedUser() {
				return JSON.parse(localStorage.getItem('authUser'));
			}
		}
	}
</script>