require('./config/config');
const _ = require('lodash');

var express = require('express');
var cors = require('cors');

var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');

var app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use((req,res,next) => {
	res.header("Access-Control-Expose-Headers", "authorization");
	next();
});

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

app.listen(port, () => {
	console.log('Started on port '+port);
});





module.exports = {app};