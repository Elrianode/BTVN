const express = require('express');
const ImageRouter = express.Router();
const ImageModel = require('../models/imageModel');


// ImageRouter.use((req, res, next) => {
//     console.log("User middleware");
//     next();
// });

ImageRouter.get("/", async (req, res) => {
    try {
        const images = await ImageModel.find({}).populate("user", "name avatar").populate("comments");
        res.json({ success: 1, images });
    }
    catch (err) {
        res.status(500).json({ success: 0, error: err })
    }
});

ImageRouter.get("/:id", async (req, res) => {
    let imageId = req.params.id;
    try {
        const imageFound = await ImageModel.findById(imageId).populate("user", "name avatar").populate("comments");
        if (!imageFound) res.status(404).json({ success: 0, message: "Not Found" })
        else res.json({ success: 1, image: imageFound })
    }
    catch (err) {
        res.status(500).json({ success: 0, message: err })
    }
});

ImageRouter.post("/", async (req, res) => {
    const { user, url, caption, title } = req.body;
    console.log(req.body);

    try {
        const imageCreated = await ImageModel.create({ user, url, caption, title });
        res.status(201).json({ success: 1, image: imageCreated })
    }
    catch (err) {
        res.status(500).json({ success: 0, message: err });
    }
});

ImageRouter.put("/:id", async (req, res) => {
    let imageId = req.params.id;
    const { url, caption, title, comments } = req.body;
    try {
        const imageFound = await ImageModel.findById(imageId);
        if (!imageFound) res.status(404).json({ success: 0, message: "Not Found" });
        else {
            for (key in { url, caption, title, comments }) {
                if (imageFound[key] && req.body[key]) imageFound[key] = req.body[key];
            }
            let imageUpdated = await imageFound.save();
            res.status(201).json({ success: 1, image: imageUpdated });
        }
    }
    catch (err) {
        res.status(500).json({ success: 0, message: err });
    }
});

ImageRouter.delete("/:id", async (req, res) => {
    let imageId = req.params.id;
    try {
        await ImageModel.findByIdAndRemove(imageId);
        res.json({ success: 1 });
    }
    catch (err) {
        res.status(500).json({ success: 0, message: err });
    }
});

module.exports = ImageRouter;