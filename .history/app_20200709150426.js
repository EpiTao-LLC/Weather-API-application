//jshint eversion:6

const express = require("express");
const app = express();

const https = require("https");
const url = "https://api.openweathermap.org/data/2.5/weather?q=Denver&appid=8764151a3e44d2216699d56cc5c8504a&units=imperial";

app.get("/", function(req, res) {
    https.get(url, function (response) {   //to receive a response from an https API
        response.on("data", function (data) {  //to recieve data from an API
            console.log(data);
            const weatherData = JSON.parse(data);  //parse JSON data
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;  //use JSON View Awesome plug in to get paths
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://api.openweathermap.org/img/win" + icon + "@2x.png";
            console.log(temp);
            console.log(description);
            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<h1>The temperature in Denver is " + temp + " degrees F.</h1>");
            res.write("<img src=imageURL>")
            res.send();
        });
    });

});





app.listen(3000, function () {
    console.log ("Server is running on port 3000.");
});