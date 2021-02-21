//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', function(req, res){
  res.sendFile(__dirname+'/bmiCalculator.html');
});

app.get('/about', function(req, res){
  res.send('<h3>About Me!</h3>');
});

app.post('/', function(req, res){
  var height = parseFloat(req.body.height);
  var weight = parseFloat(req.body.weight);

  var bmi = weight/(height*height);
  res.send('BMI value is '+bmi);
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
