const express = require('express');
const CommentRouter = express.Router();
const CommentModel = require('../models/commentModel');


// CommentRouter.use((req, res, next) => {
//     console.log("User middleware");
//     next();
// });

CommentRouter.get("/", async (req, res) => {
    try {
        const comments = await CommentModel.find({}).populate("user", "name avatar");
        res.json({ success: 1, comments });
    }
    catch (err) {
        res.status(500).json({ success: 0, message: err });
    }
});

CommentRouter.get("/:id", async (req, res) => {
    let commentId = req.params.id;
    try {
        const commentFound = await CommentModel.findById(commentId).populate("user", "name avatar");
        if (!commentFound) res.status(404).json({ success: 0, message: "Not Found" })
        else res.json({ success: 1, comment: commentFound })
    }
    catch (err) {
        res.status(500).json({ success: 0, message: err })
    }
});

CommentRouter.post("/", (req, res) => {
    const { user, content } = req.body;
    console.log(req.body);

    CommentModel.create({ user, content }, (err, commentCreated) => {
        if (err) res.status(500).json({ success: 0, message: err })
        else res.status(201).json({ success: 1, comment: commentCreated })
    })
});

CommentRouter.put("/:id", async (req, res) => {
    let commentId = req.params.id;
    const { user, content } = req.body;
    try {
        const commentFound = await CommentModel.findById(commentId);
        if (!commentFound) res.status(404).json({ success: 0, message: "Not Found" })
        else {
            for (key in { user, content }) {
                if (commentFound[key] && req.body[key]) commentFound[key] = req.body[key];
            }
            let commentUpdated = await commentFound.save();
            res.status(201).json({ success: 1, comment: commentUpdated })
        }
    }
    catch (err) {
        res.status(500).json({ success: 0, message: err });
    }
});

CommentRouter.delete("/:id", async (req, res) => {
    var commentId = req.params.id;
    try {
        await CommentModel.findByIdAndRemove(commentId);
        res.json({ success: 1 });
    }
    catch (err) {
        res.status(500).json({ success: 0, message: err });
    }
});

module.exports = CommentRouter;