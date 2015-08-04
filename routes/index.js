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

    var weather =
      resp.main.temp + ' °C' +
      ' - ' + resp.weather[0].main;

    res.render('index', { title: 'Wall Display', weather: weather });
   })
  }).on('error', function(e) {
    res.render('index', { title: 'Wall Display' });
  });
});

module.exports = router;
