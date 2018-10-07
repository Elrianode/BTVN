const express = require("express");
const axios = require("axios");
const fs = require("fs");

var app = express();
const objData = {
    name : 'huy',
    age : 18
};

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})
app.get("/nodejs/web15.json", function (req, res) {
    axios.get("https://btvn-web15s.herokuapp.com/api/web15")
        .then(res => {
            fs.writeFileSync("../nodejs/web15.json", JSON.stringify(res.data), (err) => {
                console.log(err);
            });
        })
        .catch(err => {
            console.log(err);
        });

    res.sendFile(__dirname + "/web15.json");
})
app.listen(8888, (err) => {
    if (err) console.log(err);
});
