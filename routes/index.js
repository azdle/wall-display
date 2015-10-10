var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
  var temp_symbol = {
    "metric": " °C",
    "imperial": " °F",
    "kelvin": " K",
  }

  var q = req.query.q || "minneapolis,us";
  var units = req.query.units || "metric";

  http.get("http://api.openweathermap.org/data/2.5/weather?APPID=77b8262890b262a44778a1a01a6b7cb2&q=" + q + ",us&units=" + units, function(wres) {
   var data = "";
   wres.on('data', function(chunk) {
    data += chunk.toString();
   })

   wres.on("end", function() {
    var resp = JSON.parse(data);

    var weather, weatherIcon;

    try{
      weather =
        resp.main.temp + temp_symbol[units] +
        ' - ' + resp.weather[0].main;

      weatherIcon = "<img src='/img/w/" +
        resp.weather[0].icon + ".png' alt='" + resp.weather[0].description + "' />";
    } catch(e) {
      weather = resp;
      weatherIcon = "";
    }

    console.log(weatherIcon);

    res.render('index', {
      title: 'Wall Display',
      weather: weather ,
      weatherIcon: weatherIcon });
   })
  }).on('error', function(e) {
    res.render('index', { title: 'Wall Display' });
  });
});

module.exports = router;
