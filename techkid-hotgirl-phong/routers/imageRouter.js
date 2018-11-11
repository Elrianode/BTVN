const express = require('express');
const mongoose = require('mongoose');
const ImageRouter = express.Router();
const bodyparser =require('body-parser');

const ImageModel = require('../models/imageModel');


ImageRouter.use((req,res ,next) =>{
    console.log('Image middleware');
    next();
    });


// "/api/images" => get all
ImageRouter.get("/", (req, res) => {
	console.log("Get all image");
    ImageModel.find({})
    .populate("user", ("name avatar"))
    .exec((err, images) => {
		if(err) res.status(500).json({ success: 0, error: err })
		else res.json({ success: 1, images });
	});
});

// get user by id
ImageRouter.get("/:id", (req, res) => {
	let imageId = req.params.id;
	ImageModel.findById(imageId, (err, imageFound) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else if(!imageFound._id) res.status(404).json({ success: 0, message: "Not found!" })
		else res.json({ success: 1, image: imageFound });
	});
});

// Create user
ImageRouter.post("/", (req, res) => {
	console.log(req.body)
	const { user, url, caption, title  } = req.body;
	ImageModel.create({ user, url, caption, title }, (err, imageCreated) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else res.status(201).json({ success: 1, image : imageCreated });
	});
});

// Edit user
ImageRouter.put("/:id", (req, res) => {
	const imageId = req.params.id;
	const { url, caption, title } = req.body;

	ImageModel.findById(imageId, (err, imageFound) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else if(!imageFound._id) res.status(404).json({ success: 0, message: "Not found!" })
		else {
			for(key in { url, caption, title }) {
				if(imageFound[key] && req.body[key]) imageFound[key] = req.body[key];
			}

			imageFound.save((err, imageUpdated) => {
				if(err) res.status(500).json({ success: 0, message: err })
				else res.json({ success: 1, image: imageUpdated });
			});
		};
	});
});

// Delete user => BTVN
ImageRouter.delete("/:id", (req, res) => {
	const imageId = req.params.id;
	ImageModel.remove({_id: imageId }, (err) => {
		if(err) res.status(500).json({ success: 0, message: err})
		else res.json({ success: 1 });
	});
});

module.exports = ImageRouter;
