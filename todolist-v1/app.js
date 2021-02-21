//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
//const ejsLint = require("ejs-lint");
//const ejs = require('ejs');

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

let items = [];

app.get("/", function(req, res){
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  let day = today.toLocaleDateString("en-US", options);
  //ejsLint("list", options);
  res.render("list",{kindOfDay: day, List: items});
});

app.post("/", function(req, res){
  items.push(req.body.newItem);
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("server running");
});
