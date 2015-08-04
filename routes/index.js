var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://api.openweathermap.org')
  res.render('index', { title: 'Express' });
});

module.exports = router;
