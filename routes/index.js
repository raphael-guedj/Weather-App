var express = require("express");
var router = express.Router();

var request = require("sync-request");
var weatherData = require("../models/cities");

/* GET login page. */
router.get("/", function (req, res, next) {
  res.render("login", { title: "Express" });
});

/* GET weather page. */

router.get("/weather", async function (req, res, next) {
  var cityList = await weatherData.weatherModel.find();
  console.log(cityList);
  res.render("weather", { cityList, error: false });
});

/*post add city*/

router.post("/add-city", async function (req, res) {
  var cityList = await weatherData.weatherModel.find();

  var ville = request(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=${req.body.nomVille}&appid=a8fc1d70682a7fe6d0101219935fb5b5&units=metric&lang=fr`
  );

  ville = JSON.parse(ville.body);
  console.log(ville);

  var exist = false;
  var error = false;

  for (var i = 0; i < cityList.length; i++) {
    if (
      cityList[i].nomVille.toLowerCase() === req.body.nomVille.toLowerCase()
    ) {
      exist = true;
    }
  }

  if (exist === false && ville.cod == "200") {
    var weather = new weatherData.weatherModel({
      nomVille: req.body.nomVille,
      urlImage: `http://openweathermap.org/img/wn/${ville.weather[0].icon}@2x.png`,
      descriptif: ville.weather[0].description,
      tempMin: ville.main.temp_min,
      tempMax: ville.main.temp_max,
      longitude: ville.coord.lon,
      latitude: ville.coord.lat,
    });

    var weatherSaved = await weather.save();
  }

  if (ville.cod == "404" || ville.cod == "400" || ville.cod == "500") {
    error = true;
  }
  cityList = await weatherData.weatherModel.find();

  res.render("weather", { cityList, error: error });
});

/* GET delete page. */

router.get("/delete-city", async function (req, res, next) {
  await weatherData.weatherModel.deleteOne({ _id: req.query.id });
  var cityList = await weatherData.weatherModel.find();

  res.render("weather", { cityList, error: false });
});

/* Get refresh */
router.get("/update-data", async function (req, res) {
  var cityList = await weatherData.weatherModel.find();

  console.log(cityList);

  for (var i = 0; i < cityList.length; i++) {
    var ville = await request(
      "GET",
      `https://api.openweathermap.org/data/2.5/weather?q=${cityList[i].nomVille}&appid=a8fc1d70682a7fe6d0101219935fb5b5&units=metric&lang=fr`
    );
    ville = JSON.parse(ville.body);

    await weatherData.weatherModel.updateOne(
      { _id: cityList[i]._id },
      {
        nomVille: cityList[i].nomVille,
        urlImage: `http://openweathermap.org/img/wn/${ville.weather[0].icon}@2x.png`,
        descriptif: ville.weather[0].description,
        tempMin: ville.main.temp_min,
        tempMax: ville.main.temp_max,
      }
    );
  }

  var cityList = await weatherData.weatherModel.find();

  res.render("weather", { cityList, error: false });
});

module.exports = router;
