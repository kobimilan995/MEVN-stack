const mongoose = require('mongoose');
const validator = require('validator');
var {User} = require('../models/user');
var {Post} = require('../models/post');
const _ = require('lodash');

var CategorySchema =  new mongoose.Schema({
	title: {
		required: true,
		type: String
	},
	description: {
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
	},

	posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post'
	}]
}, { usePushEach: true });
var Category = mongoose.model('Category', CategorySchema);

module.exports = {
	Category
}