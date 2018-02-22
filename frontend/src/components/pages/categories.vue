<template>
	<div>
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
		  <div class="card-header"><h3 style="display:inline;">{{category.title}}</h3><a href="#"><i class="fa fa-close pull-right" @click="deleteCategory(category)"></i></a></div>
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
				categories: []
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

			viewPosts(category) {
				this.$router.push('/category/'+category._id);
			},
			deleteCategory(category) {

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