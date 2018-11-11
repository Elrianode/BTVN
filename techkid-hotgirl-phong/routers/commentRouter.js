const express = require('express');
const mongoose = require('mongoose');
const CommentRouter = express.Router();
const bodyparser =require('body-parser');

const CommentModel = require('../models/commentModel');


CommentRouter.use((req,res ,next) =>{
    console.log('Image middleware');
    next();
    });


// "/api/comments" => get all
CommentRouter.get("/", (req, res) => {
	console.log("Get all comments");
    CommentModel.find({})
    .populate("user", ("name avatar"))
    .exec((err, comments) => {
		if(err) res.status(500).json({ success: 0, error: err })
		else res.json({ success: 1, comments });
	});
});

// get user by id
CommentRouter.get("/:id", (req, res) => {
	let commentId = req.params.id;
	CommentModel.findById(commentId, (err, commentFound) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else if(!commentFound._id) res.status(404).json({ success: 0, message: "Not found!" })
		else res.json({ success: 1, comment : commentFound });
	});
});

// Create user
CommentRouter.post("/", (req, res) => {
	console.log(req.body)
	const { user,content } = req.body;
	CommentModel.create({ user,content }, (err, commentCreated) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else res.status(201).json({ success: 1, comment : commentCreated });
	});
});

// Edit user
CommentRouter.put("/:id", (req, res) => {
	const commentId = req.params.id;
	const { content } = req.body;

	CommentModel.findById(commentId, (err, commentFound) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else if(!commentFound._id) res.status(404).json({ success: 0, message: "Not found!" })
		else {
			for(key in { content }) {
				if(commentFound[key] && req.body[key]) commentFound[key] = req.body[key];
			}

			commentFound.save((err, commentCreated) => {
				if(err) res.status(500).json({ success: 0, message: err })
				else res.json({ success: 1, comment: commentCreated });
			});
		};
	});
});

// Delete user => BTVN
CommentRouter.delete("/:id", (req, res) => {
	const commentId = req.params.id;
	CommentModel.remove({_id: commentId }, (err) => {
		if(err) res.status(500).json({ success: 0, message: err})
		else res.json({ success: 1 });
	});
});

module.exports = CommentRouter;
