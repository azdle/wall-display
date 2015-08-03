$ = require('zepto-browserify').$;
var moment = require('moment');

$(document).on('ready', function(event) {
	updateTime();
	window.setInterval(updateTime, 1000);

	updateDate();
	window.setInterval(updateDate, 10 * 1000);

	updateWeather();
	window.setInterval(updateWeather, 15 * 60 * 1000);
});

function updateTime(){
	var d = new Date();
	var dateStr = moment().format('hh:mm');
	if ($('#time').html() != dateStr) {
		$('#time').html(dateStr);
	}
}

function updateDate(){
	var d = new Date();
	var dateStr = moment().format('MMMM Do YYYY');
	if ($('#date').html() != dateStr) {
		$('#date').html(dateStr);
	}
}

function updateWeather(){
	//$('#weather').html("It Gonn' Rain!");
}