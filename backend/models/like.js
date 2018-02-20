const mongoose = require('mongoose');
const validator = require('validator');
var {User} = require('../models/user');
const _ = require('lodash');

var LikeSchema =  new mongoose.Schema({
	created_at: {
		required: true,
		type: String
	},
	moment_timestamp: {
		required: true,
		type: String
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},

	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post'
	}
});
var Like = mongoose.model('Like', LikeSchema);

module.exports = {
	Like
}