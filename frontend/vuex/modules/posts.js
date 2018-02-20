const state = {
	posts: []
};

const mutations = {
	ADD_POST(state, post) {
		state.posts.unshift(post);
	},
	ADD_LIKE(state, data) {
		state.posts[data.post_index].likes.push(data.like);
	},

	REMOVE_LIKE(state, data) {
		state.posts[data.post_index].likes.forEach((like, index) => {
			if(like.likeOwner._id == data.userId) {
				state.posts[data.post_index].likes.splice(index, 1);
				return;
			}
		});
	},

	SET_POSTS(state, posts) {
		state.posts = posts;
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