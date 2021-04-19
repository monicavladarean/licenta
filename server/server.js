var express = require("express")
var db = require("./database.js")
var app = express()

var HTTP_PORT = 8080 
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/", (req, res, next) => {
    res.json({"message":"Server is working"})
});

// Insert other API endpoints

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});