//jshint esversion:6

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res){
  const query = req.body.cityName;
  const apiKey = "b3baf9eb41e6cac6e967a414ec88e06d";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&APPID="+apiKey+"&units=metric";

  https.get(url, function(response){
  //  console.log(response);

    response.on('data', function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      console.log(temp);
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p>Temperature is "+temp+" </hp>");
      res.write("<h1>Weather is like "+desc+" </h1>");
      res.write("<img src="+imageURL+">");
      res.send();
    });
  });
});

app.listen(3000, function(){
  console.log("Listening on port 3000...");
});
