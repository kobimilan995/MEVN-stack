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
        Post.populate(post, 'owner').then(response => {
                res.send(response);
            }).catch(error => {
                res.send(error)
            })
    	}).catch(error => {

    	});
    });
    //get posts
    app.get('/api/posts', authenticate, (req, res) => {
        var posts = Post.find().populate('owner').sort({moment_timestamp: -1}).then(response => {
            res.send(response);
        }).catch(error => {
            console.log(error);
        });
    });

    //like post
    app.post('/api/post/like', authenticate, (req, res) => {
        var post = Post.findById(req.body.post_id).then(post => {
            var like = {
                moment_timestamp: moment(),
                likeOwner: req.user
            }
            post.likes.push(like);
            post.save().then(finalPost => {
                res.send({
                    type: 'success',
                    message: 'You have successfully like the status.',
                    like: like
                });
            }).catch(error => {
                console.log('post saving error: ', error);
                res.send(error);
            });
        }).catch(error => {
            res.send(error);
        });
        // console.log(req.body);
        // var body = {};
        // body.moment_timestamp = moment();
        // body.created_at = moment().format();
        // var like = new Like(body);
        // like.owner = new ObjectID(req.user.id);
        // like.post = new ObjectID(req.body.post_id);
        // like.save().then(response => {
            
        // }).catch(error => {
        //     res.send({
        //         type: 'error',
        //         message: 'ERROR',
        //         error: error
        //     });
        // })
    });

    //unlike post

    app.post('/api/post/dislike', authenticate, (req, res) => {
        Post.findById(req.body.post_id).then(post => {
            // post.likes.forEach((like, index) => {
            //     if(like.likeOwner._id == req.user.id) {
            //         post.likes.splice(index, 1);
            //         break;
            //     }
            // });
            for (var i = 0; i < post.likes.length; i++) {
                if(post.likes[i].likeOwner._id == req.user.id) {
                    post.likes.splice(i, 1);
                    break;
                }
            }
            post.save().then(response => {
                res.send({
                    type: 'success',
                    message: 'You have successfully disliked the status.'
                })
            }).catch(error => {

            });
        });
    });
}