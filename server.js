var app = require("express")(),
    http = require("http").Server(app),
    bodyParser = require('body-parser');

var messages = [];

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/script.js", function(req, res) {
    res.sendFile(__dirname + "/script.js");
});

app.get("/style.css", function(req, res) {
    res.sendFile(__dirname + "/style.css");
});

app.get("/messages", function(req, res) {
    res.json(messages);
})

app.post("/messages", function(req, res) {
    messages.push(req.body);
    res.end();
})

http.listen(1428, function() {
    console.log("litening on *:1428");
});