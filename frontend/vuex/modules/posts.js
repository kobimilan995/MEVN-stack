const state = {
	posts: [],
	categories: []
};

const mutations = {
	ADD_POST(state, post) {
		state.posts.unshift(post);
	},
	ADD_LIKE(state, data) {
		// state.posts[data.post_index].likes.push(data.like);
		for (var i = 0; i < state.posts.length; i++) {
			if(state.posts[i]._id == data.postId) {
				state.posts[i].likes.push(data.like);
				break;
			}
		}
	},

	REMOVE_LIKE(state, data) {
		// state.posts[data.post_index].likes.forEach((like, index) => {
		// 	if(like.likeOwner._id == data.userId) {
		// 		state.posts[data.post_index].likes.splice(index, 1);
		// 		return;
		// 	}
		// });
		for (var i = 0; i < state.posts.length; i++) {
			if(state.posts[i]._id == data.post_id) {
				state.posts[i].likes.forEach((like, index) => {
					if(like.likeOwner._id == data.authUserId) {
						state.posts[i].likes.splice(index, 1);
					}
				});
			}
		}
	},

	SET_POSTS(state, posts) {
		state.posts = posts;
	},
	SET_CATEGORIES(state, categories) {
		state.categories = categories;
	},

	SPLICE_POST(state, post) {
		state.posts.splice(state.posts.indexOf(post), 1);
	}
};

export default {
	namespaced: true,
	state,
	mutations
}