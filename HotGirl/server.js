const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRouter = require('./routers/userRouter');
const imageRouter = require('./routers/imageRouter');
const commentRouter = require('./routers/commentRouter');

mongoose.connect("mongodb://localhost/techkidhotgirl", (err) => {
    if (err) console.log(err);
    else console.log("DB connect success")
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/image", imageRouter);
app.use("/api/comment", commentRouter);

const port = 6969;
app.listen(port, (err)=>{
    if(err) console.log(err)
    else console.log("Listening at port 6969")
    
})
