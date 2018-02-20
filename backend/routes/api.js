var {User} = require('../models/user');
var {Post} = require('../models/post');
var {Like} = require('../models/like');
var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;
const _ = require('lodash');
const authenticate = require('../middleware/authenticated.js');
module.exports = function(app){
    app.get('/api/test', (req, res) => {
    	console.log(req.body);
    });

    //add post
    app.post('/api/post', authenticate, (req, res) => {
    	var body = _.pick(req.body, ['content']);
        // body.ownersName = req.user.username;
        // body.ownersId = req.user.id;
        body.owner = new ObjectID(req.user.id);
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
        var posts = Post.find().populate('owner').populate({path: 'likes', populate: {path: 'owner'}}).sort({moment_timestamp: -1}).then(response => {
            res.send(response);
        }).catch(error => {
            console.log(error);
        });
    });

    //like post
    app.post('/api/post/like', authenticate, (req, res) => {
        console.log(req.body);
        var body = {};
        body.moment_timestamp = moment();
        body.created_at = moment().format();
        var like = new Like(body);
        like.owner = new ObjectID(req.user.id);
        like.post = new ObjectID(req.body.post_id);
        like.save().then(response => {
            var post = Post.findById(req.body.post_id).then(post => {
                post.likes.push(new ObjectID(response._id));
                post.save().then(finalPost => {
                    Like.populate(like, {path: 'owner'}).then(likeResponse => {   
                        res.send({
                            type: 'success',
                            message: 'You have successfully like the status.',
                            like: likeResponse
                        });
                    }).catch(error => {
                        res.send({
                            type: 'error',
                            message: 'ERROR',
                            error: error
                        });
                    });
                }).catch(error => {
                    console.log('post saving error: ', error);
                    res.send(error);
                });
            }).catch(error => {
                res.send(error);
            });
        }).catch(error => {
            res.send({
                type: 'error',
                message: 'ERROR',
                error: error
            });
        })
    });

    //unlike post

    app.post('/api/post/dislike', authenticate, (req, res) => {
        Like.remove({post: req.body.post_id, owner: req.user._id}).then(response => {
            res.send(response);
        }).catch(error => {
            res.send(error);
        });
    });
}