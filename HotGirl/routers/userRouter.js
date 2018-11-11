const express = require('express');
const UserRouter = express.Router();
const UserModel = require('../models/userModel');

// UserRouter.use((req, res, next) => {
//     console.log("User middleware");
//     next();
// });

UserRouter.get("/", async (req, res) => {
    try {
        const users = await UserModel.find({}, "name email avatar intro posts").populate("posts");
        res.json({ success: 1, users })
    }
    catch{
        res.status(500).json({ success: 0, error: error })
    }

    // .then(users => res.json({ success: 1, users }))
    // .catch(err => res.status(500).json({ success: 0, error: err }))
});

UserRouter.get("/:id", async (req, res) => {
    let userId = req.params.id;
    try {
        const userFound = await UserModel.findById(userId).populate("posts");
        if (!userFound) res.status(404).json({ success: 0, message: "Not Found" });
        else {
            res.json({ success: 1, user: userFound });
        }
    }
    catch (error) {
        res.status(500).json({ success: 0, error: error });
    }
});

UserRouter.post("/", async (req, res) => {
    const { name, email, password, avatar, intro } = req.body;
    console.log(req.body);

    try {
        const userCreated = await UserModel.create({ name, email, password, avatar, intro });
        res.status(201).json({ success: 1, user: userCreated })
    }

    catch (err) {
        res.status(500).json({ success: 0, message: err });
    }
});

UserRouter.put("/:id", async (req, res) => {
    let userId = req.params.id;
    const { name, password, avatar, intro, posts } = req.body;
    // UserModel.findById(userId, (err, userFound) => {
    //     if (err) res.status(500).json({ success: 0, message: err })
    //     else if (!userFound) res.status(404).json({ success: 0, message: "Not Found" })
    //     else {
    //         for(key in { name, password, avatar, intro, posts }) {
    //             if(userFound[key] && req.body[key]) userFound[key] = req.body[key];
    //         }
    //         userFound.save((err, userUpdated) => {
    //             if (err) res.status(500).json({ success: 0, message: err })
    //             else res.status(201).json({ success: 1, user: userUpdated })
    //         })
    //     }
    // })
    try {
        const userFound = await UserModel.findById(userId);
        if (!userFound) {
            res.status(404).json({ success: 0, message: "Not found" });
        } else {
            for (key in { name, password, avatar, intro, posts }) {
                if (userFound[key] && req.body[key]) userFound[key] = req.body[key];
            }
            let userUpdated = await userFound.save();
            res.json({ success: 1, user: userUpdated });
        }
    } catch (error) {
        res.status(500).json({ success: 0, message: error });
    }
});

UserRouter.delete("/:id", async (req, res) => {
    let userId = req.params.id;
    try {
        await UserModel.findByIdAndRemove(userId);
        res.json({ success: 1 });
    }
    catch (err) {
        res.status(500).json({ success: 0, message: err })
    }
});

module.exports = UserRouter;

