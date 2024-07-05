const express = require("express");
const app = express();

app.get("/home", function(req, res){
res.send("hello word");
});

app.listen(3000);