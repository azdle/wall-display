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
	if (typeof(XMLHttpRequest) !== "function") {
		weatherDiv.innerHTML = 'XHR Not Available';
		return;
	}

	function reqListener () {
		console.log(this.responseText);

		var resp = JSON.parse(this.responseText);

		weatherDiv.innerHTML =
			resp.main.temp + ' °C' +
			' - ' + resp.weather[0].main;
	}

	//var url = "http://api.openweathermap.org/data/2.5/forecast?q=minneapolis,us&units=metric";
	var url = "http://api.openweathermap.org/data/2.5/weather?q=minneapolis,us&units=metric";

	var oReq = new XMLHttpRequest();
	oReq.addEventListener('load', reqListener);
	oReq.open("get", url, true);
	oReq.send();
}