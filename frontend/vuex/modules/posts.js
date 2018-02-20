const state = {
	posts: []
};

const mutations = {
	ADD_POST(state, post) {
		state.posts.unshift(post);
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