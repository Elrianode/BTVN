const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true }
});

const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = CommentModel;