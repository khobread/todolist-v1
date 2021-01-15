//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = [];

app.set('view engine', 'ejs'); //comes after express app

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {

  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    kindOfDay: day,
    newListItems: items
  }); //rendering views>list.ejs matching variables across files
});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});


app.listen(3000, function() {
  console.log("server started on port 3000.");
});
