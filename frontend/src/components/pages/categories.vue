<template>
	<div>
		<div class="modal fade" id="areUSure">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title">You are about to delete this categogry:  {{categoryToBeDeleted.title}}</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		        <p>Are you sure?</p>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="deleteCategory">Yes</button>
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
		      </div>
		    </div>
		  </div>
		</div>
	<form @submit.prevent="addCategory">
	  <div class="form-group">
	    <label for="exampleInputEmail1">Add category title</label>
	    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Category title" v-model="categoryTitle">
	  </div>
	  <div class="form-group">
	    <label for="exampleInputEmail1">Add category description</label>
	    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Category description" v-model="categoryDescription">
	  </div>
	  <button type="submit" class="btn btn-primary">Add category</button>
	</form>
	<i v-if="showLoading" class="fa fa-spinner fa-pulse fa-1x fa-fw"></i>
	<div>
		<div v-for="(category, index) in categories" class="card" style="margin-top: 15px;">
		  <div class="card-header"><h3 style="display:inline;">{{category.title}}</h3><a href="#" @click="setCategoryToBeDeleted(category)" data-toggle="modal" data-target="#areUSure"><i class="fa fa-close pull-right"></i></a></div>
		  <div class="card-body">
		  	<h5>
		  		{{category.description}}
		  	</h5>
		  </div>
		  <div class="card-footer">
		  	<!-- <button v-if="!isLiked(post)" class="btn btn-primary" @click="likePost(post._id, index)">Like</button> 
		  	<button v-else class="btn btn-primary" @click="dislikePost(post._id, index)">Unlike</button> 
			<p style="display: inline; margin-left: 20px">{{post.likes.length}} likes</p>
		  	<p class="pull-right">{{difForHumans(post.created_at)}}</p></div> -->
		  	<button class="btn btn-primary" @click="viewPosts(category)">View posts</button>
		  </div>
		</div>
	</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				categoryTitle: '',
				categoryDescription: '',
				showLoading: false,
				categories: [],
				categoryToBeDeleted: {}
			}
		},

		methods: {
			addCategory() {
				console.log('asd');
				this.axios.post('http://localhost:3001/api/category', {
					title: this.categoryTitle,
					description: this.categoryDescription
				}, {
				    headers: { authorization: localStorage.getItem('jwt') }
				}).then(response => {
					console.log(response.data);
					this.categories.push(response.data.data);
				}).catch(error => {
					console.log(error);
				});
			},
			setCategoryToBeDeleted(category) {
				this.categoryToBeDeleted = category;
			},
			viewPosts(category) {
				this.$router.push('/category/'+category._id);
			},
			deleteCategory() {
				this.axios.delete('http://localhost:3001/api/category/delete?category='+this.categoryToBeDeleted._id,{
				    headers: { authorization: localStorage.getItem('jwt') }
				}).then(response => {
					console.log(response);
					this.categories.splice(this.categories.indexOf(this.categoryToBeDeleted), 1);
				}).catch(error => {
					console.log(error);
				});
			},
			getCategories() {
				this.axios.get('http://localhost:3001/api/categories', {
				    headers: { authorization: localStorage.getItem('jwt') }
				}).then(response => {
					console.log(response.data);
					this.categories = response.data;
				}).catch(error => {
					console.log(error);
				});
			}
		},

		created() {
			this.getCategories();
		}
	}
</script>