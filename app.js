const express = require("express");
const https = require("https");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extend: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const appid = process.env.APP_ID;
  const cityName = req.body.cityName;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    appid +
    "&units=metric";

  https.get(url, (httpsRes) => {
    console.log(res.statusCode);

    httpsRes.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const weatherIcon =
        "http://openweathermap.org/img/wn/" +
        weatherData.weather[0].icon +
        "@2x.png";

      res.write(
        "<h1>The temperature in "+cityName+" is " + temp + " degrees Celsius.</h1>"
      );

      res.write(
        "<h1>The weather is currently " + weatherDescription + " .</h1>"
      );

      res.write("<img src=" + weatherIcon + ">");

      res.send();
    });
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
