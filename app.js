//jshint esversion:6
const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const { dirname } = require("path");
const https = require("https");

const app = express();
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firstname = req.body.fname;
  var lastname = req.body.lname;
  var email = req.body.email;
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        mergefields: {
          fname: firstname,
          lname: lastname
        }
      }
    ]
  };
  var JsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/d9076e0656";
  const options = {
    method: "POST",
    auth: "maa:8bb056f704fbd258a7d973d9eccf0be7-us21"
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/sucess.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(JsonData);
  request.end();
});
app.post("/failure", function (req, res) {
  res.redirect("/");
});
app.listen(3000, function () {
  console.log("app is hosting on 3000 port");
});

//api key
//8bb056f704fbd258a7d973d9eccf0be7-us21
// d9076e0656
