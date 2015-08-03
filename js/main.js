var moment = require('moment');

var timeDiv, dateDiv, weatherDiv;

document.addEventListener("DOMContentLoaded", function(event) {
	timeDiv = document.getElementById('time');
	dateDiv = document.getElementById('date');
	weatherDiv = document.getElementById('weather');

	updateTime();
	window.setInterval(updateTime, 1000);

	updateDate();
	window.setInterval(updateDate, 10 * 1000);

	updateWeather();
	window.setInterval(updateWeather, 15 * 60 * 1000);
});

function updateTime(){
	var d = new Date();
	var dateStr = moment().format('HH:mm');
	if (timeDiv.innerHTML != dateStr) {
		timeDiv.innerHTML = dateStr;
	}
}

function updateDate(){
	var d = new Date();
	var dateStr = moment().format('MMMM Do YYYY');
	if (dateDiv.innerHTML != dateStr) {
		dateDiv.innerHTML = dateStr;
	}
}

function updateWeather(){
	//weatherDiv.innerHTML = "It Gonn' Rain!";
}