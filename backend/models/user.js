const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema =  new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
			validator: (value) => {
				return validator.isEmail(value)
			},
			message: '{VALUE} is not a valid email!'
		}
	},
	username: {
		type: String,
		required: true,
		minlength: 2
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	//oni korisnici koji prate ovog korisnika
	followers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	following: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
}, { usePushEach: true });

UserSchema.methods.toJSON = function() {
	var user = this;
	var userObject = user.toObject();
	return _.pick(userObject, ['_id', 'email', 'username', 'followers', 'following']);
};

UserSchema.methods.generateAuthToken = function() {
	var user = this;
	var access = 'auth';
	var token =jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

	user.tokens.push({access, token});
	return user.save().then(() => {
		return token;
	});
};

UserSchema.methods.removeToken = function(token) {
	var user = this;

	return user.update({
		$pull: {
			tokens: {
				token
			}
		}
	});
};
UserSchema.statics.findByCredentials = function(email, password) {
	var User = this;

	return User.findOne({email}).populate('followers').populate('following').then(user => {
		if(!user) {
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if(res) {
					resolve(user);
				} else {
					reject();
				}
			});
		});
	});
};
UserSchema.statics.findByToken = function(token) {
	var User = this;
	var decoded;

	try {
		decoded = jwt.verify(token, 'abc123');
	} 
	catch (e) {
		return Promise.reject();
	}
	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	}).populate('followers').populate('following');

};

UserSchema.pre('save', function (next) {
	var user = this;
	if(user.isModified('password')){
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	} else {	
		next();
	}
});

var User = mongoose.model('User', UserSchema);

module.exports = {
	User
}