const mongoose = require('mongoose');
const validator = require('validator');
var {User} = require('../models/user');
var {Category} = require('../models/category');
const _ = require('lodash');

var PostSchema =  new mongoose.Schema({
	content: {
		required: true,
		type: String
	},
	title: {
		required: true,
		type: String
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},

	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'
	},

	created_at: {
		required: true,
		type: String
	},

	moment_timestamp: {
		required: true,
		type: String
	},

	likes: [{
		moment_timestamp: {
			type: String,
			required: true
		},
		likeOwner: {
			_id: {
				type: mongoose.Schema.Types.ObjectId
			},
			email: {
				type: String
			},
			username: {
				type: String
			}
		}
	}],
	comments: [{
		moment_timestamp: {
			type: String,
			required: true
		},
		content: {
			type: String,
			required: true
		},
		commentOwner: {
			_id: {
				type: mongoose.Schema.Types.ObjectId
			},
			email: {
				type: String
			},
			username: {
				type: String
			}
		}
	}]
}, { usePushEach: true });
var Post = mongoose.model('Post', PostSchema);

module.exports = {
	Post
}