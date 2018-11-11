const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const userRouter = require('./routers/userRouter');
const imageRouter = require('./routers/imageRouter');
const commentRouter = require('./routers/commentRouter');

mongoose.connect("mongodb://localhost/techkids-hotgirl")

const app = express();
app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());
app.get('/api',(req,res) => {
    res.send("Api router");
})

app.use('/api/users' ,userRouter);
app.use("/api/images", imageRouter);
app.use('/api/comments',commentRouter);

app.listen(3000, (err) =>{
     if(err) console.log(err);
     else console.log("Connect successful!");   
})