const express = require('express');
const tradeRouter = express.Router();
const tradePost = require('../models/tradePostModel');

// Get all

tradeRouter.get('/', (req, res, next) => {
    tradePost.find((err, tradePosts) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(tradePosts);
    });
});


// Get one

tradeRouter.get('/:postId', (req, res, next) => {
    tradePost.findById(req.params.postId, (err, tradePost) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(tradePost);
    });
});
tradeRouter.get("/user", (req, res, next) => {
    tradePost.find({ user: req.auth._id }, (err, tradePosts) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        res.status(200).send(tradePosts);
    });
});

// Post post

tradeRouter.post('/', (req, res, next) => {
    req.body.user = req.auth._id
    const newTradePost = new tradePost(req.body);
    newTradePost.save((err, savedTradePost) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(201).send(savedTradePost);
    });
});

// Delete post

tradeRouter.delete('/:postId', (req, res, next) => {
    tradePost.findByIdAndDelete({ _id: req.params.postId, user: req.auth._id }, (err, deletedPost) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(`deleted ${deletedPost}`);
    });
});

// Update post

tradeRouter.put('/:postId', (req, res, next) => {

    tradePost.findByIdAndUpdate(
        { _id: req.params.postId, user: req.auth._id },
        req.body,
        { new: true },
        (err, updatedPost) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(201).send(updatedPost);
        }
    );
});

// Get comments

tradeRouter.get('/:postId/comments', (req, res, next) => {
    tradePost.findById(req.params.postId, (err, tradePost) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        if (!tradePost) {
            res.status(404);
            return next(new Error('Trade post not found'));
        }
        return res.status(200).send(tradePost.comments);
    });
});

// Post Comment

tradeRouter.post('/:postId/comments', (req, res, next) => {
    const { author, content } = req.body;
    const comment = { author: author || 'Anonymous', content };

    tradePost.findByIdAndUpdate(
        req.params.postId,
        { $push: { comments: comment } },
        { new: true },
        (err, updatedPost) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(200).send(updatedPost);
        }
    );
});

// Delete Comment

tradeRouter.delete('/:postId/comments/:commentId', (req, res, next) => {
    tradePost.findByIdAndUpdate(
        req.params.postId,
        { $pull: { comments: { _id: req.params.commentId } } },
        { new: true },
        (err, updatedPost) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(200).send(updatedPost);
        }
    );
});

// Update Comment

tradeRouter.put('/:postId/comments/:commentId', (req, res, next) => {
    tradePost.findOneAndUpdate(
        { _id: req.params.postId, 'comments._id': req.params.commentId },
        { $set: { 'comments.$.content': req.body.content } },
        { new: true },
        (err, updatedPost) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(200).send(updatedPost);
        }
    );
});

tradeRouter.put('/upVote/:postId', (req, res,next)=>{

    tradePost.findOneAndUpdate(
        {_id: req.params.postId},
        {
            $addToSet: {upVotes:req.auth._id},
            $pull: {downVotes:req.auth._id}

        },
        {new:true},
        (err,updatedPost)=>{
            if(err){
                res.status(500);
                return next(err)
            }
            return res.status(200).send(updatedPost)
        }

    )
})
tradeRouter.put('/downVote/:postId', (req, res,next)=>{

    tradePost.findOneAndUpdate(
        {_id: req.params.postId},
        {
            $addToSet: {downVotes:req.auth._id},
            $pull: {upVotes:req.auth._id}

        },
        {new:true},
        (err,updatedPost)=>{
            if(err){
                res.status(500);
                return next(err)
            }
            return res.status(200).send(updatedPost)
        }

    )
})

module.exports = tradeRouter;
