//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = [];

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs'); //comes after express app

app.get("/", function(req, res) {

  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    kindOfDay: day,
    newListItems: items
  }); //rendering views>list.ejs matching variables across files
});

app.post("/", function(req, res) {
  var item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});


app.listen(3000, function() {
  console.log("server started on port 3000.");
});
