var app = require("express")(),
    http = require("http").Server(app),
    bodyParser = require('body-parser');

var messages = [];
var users = [];

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

app.get("/users", function(req, res) {
    res.json(users);
})

app.post("/messages", function(req, res) {
    chackValidMessage(req.body);
    res.end();
})

app.post("/users", function(req, res) {
    users.push(req.body);
    res.end();
})

function chackValidMessage(msg) {
    if (msg.text !== '') {
      messages.push(msg);
    }
    if (messages.length > 100) {
      messages.shift();
    }
  }

http.listen(1428, function() {
    console.log("litening on *:1428");
});