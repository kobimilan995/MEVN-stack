const mongoose = require('mongoose');
const validator = require('validator');
var {User} = require('../models/user');
const _ = require('lodash');

var PostSchema =  new mongoose.Schema({
	content: {
		required: true,
		type: String
	},

	ownersName: {
		required: true,
		type: String
	},

	ownersId: {
		required: true,
		type: String
	},

	created_at: {
		required: true,
		type: String
	},

	moment_timestamp: {
		required: true,
		type: String
	}
});
var Post = mongoose.model('Post', PostSchema);

module.exports = {
	Post
}