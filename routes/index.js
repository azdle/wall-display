var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
  http.get("http://api.openweathermap.org/data/2.5/weather?q=minneapolis,us&units=metric", function(wres) {
   var data = "";
   wres.on('data', function(chunk) {
    data += chunk.toString();
   })

   wres.on("end", function() {
    var resp = JSON.parse(data);

    var weather, weatherIcon;

    try{
      weather =
        resp.main.temp + ' °C' +
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
