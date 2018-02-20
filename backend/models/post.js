const mongoose = require('mongoose');
const validator = require('validator');
var {User} = require('../models/user');
var {Like} = require('../models/like');
const _ = require('lodash');

var PostSchema =  new mongoose.Schema({
	content: {
		required: true,
		type: String
	},

	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
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
	}]
}, { usePushEach: true });
var Post = mongoose.model('Post', PostSchema);

module.exports = {
	Post
}