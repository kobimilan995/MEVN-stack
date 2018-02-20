var {User} = require('../models/user');
var {Post} = require('../models/post');
var moment = require('moment');
const _ = require('lodash');
const authenticate = require('../middleware/authenticated.js');
module.exports = function(app){
    app.get('/api/test', (req, res) => {
    	console.log(req.body);
    });

    //add post
    app.post('/api/post', authenticate, (req, res) => {
    	var body = _.pick(req.body, ['content']);
        body.ownersName = req.user.username;
        body.ownersId = req.user.id;
        body.moment_timestamp = moment();
        body.created_at = moment().format();
    	var post = new Post(body);
    	post.save().then(response => {
            res.send(response);
    	}).catch(error => {

    	});
    });
    //get posts
    app.get('/api/posts', authenticate, (req, res) => {
        var posts = Post.find().sort({moment_timestamp: -1}).then(response => {
            res.send(response);
        }).catch(error => {
            console.log(error);
        });
    });
}