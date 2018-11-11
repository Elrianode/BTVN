const express = require('express');
const bodyparser =require('body-parser');
const UserRouter = express.Router();
const mongoose = require('mongoose');
//Middleware
const UserModel = require('../models/userModel');

UserRouter.use((req,res ,next) =>{
    console.log('User middleware');
    next();
    });

//get all users
UserRouter.get('/',(req,res) =>{
        console.log("getall")
        const userId = req.params.id;
        console.log("Get all users");
        UserModel.find({},"-password")
        .populate("post")
        .exec((err,users) => {
                if(err) res.status(500).json({success : 0, message : err})
                else res.json({success : 1 ,users });
        });
})

//get user by id 
UserRouter.get('/:id',(req,res) =>{
    console.log("getusers")
    const userId = req.params.id;
    console.log("Get all users");
    UserModel.findById(userId,"-password",(err,userFound) => {
            if(err) res.status(500).json({success : 0, message : err})
            else if (!userFound._id) res.status(404).json({success : 0 ,message : "Not found!"})
            else res.json({success : 1 ,user : userFound});
    });
})

//create an user       
UserRouter.post('/', (req,res) => {
    console.log(req.body);
    const {name , email, password , avatar ,intro ,posts} = req.body;
    UserModel.create({ name ,email , password, avatar, intro ,posts}, (err, userCreated   ) => {
        if(err) res.status(500).json({ success : 0 , message : err});
        else res.status(201).json({ success : 1 , user : userCreated});
        });
})

//get detail user by id
UserRouter.get('/detail/:id' ,(req,res) => {
    console.log("edituser");
    const userId = req.params.id;
    UserModel.findById(userId, (err, userFound) => {
        if(err) res.status(500).json({ success : 0 , message : err})
        else if(!userFound) res.status(404).json({ success : 0, message : err})
        else {
            console.log("da chay vao day ");
            userFound.name = "Dachuyenxongrnhe";
            userFound.email = "cdssfdcnhe@gmail.com";
           userFound.save((err,userUpdated) => {
                if(err) console.log(err)
              
                else  res.json({success : 1 , user : userUpdated});
            })
            
        }
    })
})
//edit user
UserRouter.put("/:id",(req,res) => {
    const userId = req.params.id;
    const {name , password , avatar , intro} = req.body;

    // UserModel.findByIdAndUpdate(userId, {name,password,avatar,intro} , {new : true } ,(err,userUpdated) => {
    //     if(err) res.status(500).json({ success : 0 , message : err})    
    //     else res.json({ success : 1 , user : userUpdated})
    // })

    UserModel.findById(userId , (err , userFound) => {
        if(err) res.status(500).json({ success: 1 , message : err })
        else if(!userFound._id) res.status(404).json({ success : 1 , message : "Not found!"})
        else {
            userFound.name = name || userFound.name;
            userFound.password = password || userFound.password;
            userFound.avatar = avatar || userFound.avatar;
            userFound.intro = intro || userFound.intro;

            userFound.save((err,userUpdated) => {
                if(err) res.status(500).json({ success : 0 , message : err})
                else res.json({ success : 1 , user : userUpdated});
            })
        }
    })
})
//delete user
UserRouter.get('/delete/:id', (req,res) =>{
    const userId = req.params.id;
    UserModel.findByIdAndDelete(userId, (err,userFound) => {
        if(err) res.status(500).json({ success: 0, message : err})
        else if (!userFound._id) res.status(404).json({success : 0 ,message : "Not found!"})
        else {
            res.json({ success : 1 , user : userFound});
            // userFound.save((err,userDeleted) => {
            //     if(err) res.status(500).json({ success : 0 , message : err})
            //     else res.json({ success : 1 , user : userDeleted});
            // })
        }
    })
})

UserRouter.delete("/:id" ,(req,res) => {
    const userId = req.params.id;
    UserModel.remove({_id : userId} , (err)=> {
        if(err) res.status(500).json({ success : 0 , message : err});
        else res.json({ success : 1})
    });
})

module.exports = UserRouter;    