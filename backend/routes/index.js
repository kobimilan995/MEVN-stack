var {User} = require('../models/user');
const _ = require('lodash');
var authenticate = (req, res, next) => {
	var token = req.header('authorization');
	User.findByToken(token).then(user => {
		if(!user) {
			return Promise.reject();
		}

		req.user = user;
		req.token = token;
		next();
	}).catch(e => {
		res.status(401).send();
	});
};
module.exports = function(app){
    app.delete('/users/me/token', authenticate, (req,res) => {
		req.user.removeToken(req.token).then(() => {
			res.status(200).send();
		}).catch(() => {
			res.status(400).send();
		});
	});
	//POST /users
	app.post('/users/register', (req,res) => {
		var body = _.pick(req.body, ['email', 'password', 'username']);
		var user = new User(body);
		user.save().then(() => {
			return user.generateAuthToken();
		}).then((token) => {
			res.header('authorization', token).send(user);
		}).catch(err => {
			res.status(400).send(err);
		});
	});

	app.post('/users/login', (req,res) => {
		var body = _.pick(req.body, ['email', 'password']);

		User.findByCredentials(body.email, body.password).then((user) => {
			return user.generateAuthToken().then((token) => {
				res.header('authorization', token).send(user);
			});
		}).catch((e) => {
			res.status(400).send();
		});
	});

	app.get('/users/me', authenticate,  (req,res) => {
		res.send(req.user);
	});
}