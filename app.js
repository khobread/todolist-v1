//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
console.log(date);

const app = express();

const items = ["Buy Ingredients", "Cook Food", "Eat"];
const workItems = [];

app.set('view engine', 'ejs'); //comes after express app

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {

  const day = date.getDate(); //OR date.getDay(); to just display weekday

  res.render("list", {
    listTitle: day,
    newListItems: items
  }); //rendering views>list.ejs matching variables across files
});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", function(req, res){
  res.render("about");
});

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(3000, function() {
  console.log("server started on port 3000.");
});
