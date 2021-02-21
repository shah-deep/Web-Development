//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', function(req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us7.api.mailchimp.com/3.0/lists/a1e3e2005d";

  const options = {
    method: "POST",
    auth: "deepshah1:fdb7ed9a9175823bea97e0e2cd9bbf24-us7"
  };

  const request = https.request(url, options, function(response) {

    response.on("data", function(data) {
      const userData = JSON.parse(data);
      if (userData.error_count !== 0) {
        res.sendFile(__dirname + '/failure.html');
        console.log(userData.errors);
        console.log(userData);
      } else {
        if (response.statusCode === 200) {
          res.sendFile(__dirname + '/success.html');
        } else {
          res.sendFile(__dirname + '/failure.html');
          console.log(userData);
        }
      }
    });
  });

  request.write(jsonData);
  request.end();

});

app.listen(process.env.PORT || 3000, function() {
  console.log('Server running...');
});


//API Key
// fdb7ed9a9175823bea97e0e2cd9bbf24-us7

// List ID
// a1e3e2005d
