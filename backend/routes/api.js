var {User} = require('../models/user');
var {Post} = require('../models/post');
var {Category} = require('../models/category');
var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;
const _ = require('lodash');
const authenticate = require('../middleware/authenticated.js');
module.exports = function(app){
    app.get('/api/test', (req, res) => {
    	console.log(JSON.stringify(req, undefined, 2));
        res.send(req.query.post);
    });
    //get logged users followers
    app.get('/api/user/', authenticate, (req,res) => {
        User.findOne({_id: req.user._id}).populate('followers').populate('following').then(user => {
            res.send(user);
        }).catch(error => {
            res.send(error);
        });
    });
    //follow user
    app.post('/api/user/follow', authenticate, (req, res) => {
        User.findOne({_id: req.body.user}).populate('followers').then(user => {
            user.followers.push(req.user._id);
            user.save().then(response => {
                User.findOne({_id: req.user._id}).then(loggedUser => {
                    loggedUser.following.push(new ObjectID(req.body.user));
                    loggedUser.save().then(response => {
                        res.send(response);
                    });
                }).catch(finalError => {
                    res.send(finalError);
                });
            }).catch(error => {
                res.send(error);
            });
        }).catch(error => {
            console.log(error);
            res.send(error);
        });
    });
    //uollow user
    app.post('/api/user/unfollow', authenticate, (req, res) => {
        User.findOne({_id: req.body.user}).populate('followers').then(user => {
            user.followers.splice(req.user._id);
            user.save().then(response => {
                User.findOne({_id: req.user._id}).then(loggedUser => {
                    loggedUser.following.splice(req.body.user);
                    loggedUser.save().then(response => {
                        res.send(response);
                    });
                }).catch(finalError => {
                    res.send(finalError);
                });
            }).catch(error => {
                res.send(error);
            });
        }).catch(error => {
            console.log(error);
            res.send(error);
        });
    });
    //get all users
    app.get('/api/users', authenticate, (req, res) => {
        User.find().populate('followers').then(response => {
            res.send(response);
        }).catch(error => {
            res.send(error);
        });
    });
    //add comment
    app.post('/api/post/comment/add', authenticate, (req, res) => {
        var body = _.pick(req.body, ['content']);
        var comment = {
            moment_timestamp: moment(),
            commentOwner: req.user,
            content: body.content
        }

        var post = Post.findById(req.body.post_id).then(post => {
            post.comments.push(comment);
            post.save().then(post => {
                res.send(comment);
            }).catch(error => {
                res.send(error);
            });
        }).catch(error => {
            res.send(error);
        });
    });
    //delete category 
    //kaskadno brisemo sve proizvode koji pripadaju datoj kategoriji ( potrebno dva querija )
    app.delete('/api/category/delete', authenticate, (req, res) => {
        Category.remove({_id: req.query.category}).then(response => {
            Post.remove({category: req.query.category}).then(response => {
                res.send(response);
            }).catch(error => {
                res.send(error);
            });
        }).catch(error => {
            res.send(error);
        });
    });
    //delete post
    app.delete('/api/post/delete', authenticate, (req, res) => {
        Post.remove({_id: req.query.post}).then(response => {
            res.send(response);
        }).catch(error => {
            res.send(error);
        });
    });
    //get posts for specific category
    app.get('/api/post/categories', authenticate, (req, res) => {
        Category.findById(req.query.category).then(category => {
            Post.find({category: new ObjectID(req.query.category)}).populate('owner').then(response => {
                res.send({
                    posts: response,
                    category: category
                });
            }).catch(error => {
                console.log(error);
            });
        }).catch(error => {

        });
    });
    //get categories
    app.get('/api/categories', authenticate, (req, res) => {
        Category.find().then(response => {
            res.send(response);
        }).catch(error => {
            res.send(error);
        });
    });
    //add category
    app.post('/api/category', authenticate, (req, res) => {
        var body = _.pick(req.body, ['title', 'description']);
        body.moment_timestamp = moment();
        body.created_at = moment().format();
        var category = new Category(body);
        category.save().then(response => {
            res.send({
                type: 'success',
                data: response
            });
        }).catch(error => {

        });
    });
    //add post
    app.post('/api/post', authenticate, (req, res) => {

    	var body = _.pick(req.body, ['content', 'title', 'categoryId']);
        console.log(JSON.stringify(body, undefined, 2));
        // body.ownersName = req.user.username;
        // body.ownersId = req.user.id;
        body.owner = new ObjectID(req.user.id);
        body.category = new ObjectID(body.categoryId);
        body.moment_timestamp = moment();
        body.created_at = moment().format();
    	var post = new Post(body);

    	post.save().then(response => {
            Post.populate(post, ['owner', 'category']).then(response => {
                res.send(response);
            }).catch(error => {
                res.send(error)
            })
    	}).catch(error => {
            res.send(error);
    	});
    });
    //get post
    app.get('/api/post', authenticate, (req, res) => {
        Post.findById(req.query.post).populate('owner').populate('category').then(response => {
            res.send(response);
        }).catch(error => {
            console.log(error);
        });
    });
    //get posts
    app.get('/api/posts', authenticate, (req, res) => {
        var posts = Post.find().populate('owner').populate('category').sort({moment_timestamp: -1}).then(response => {
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
    });

    //unlike post

    app.post('/api/post/dislike', authenticate, (req, res) => {
        Post.findById(req.body.post_id).then(post => {
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