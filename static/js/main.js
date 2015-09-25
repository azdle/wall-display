var moment = require('moment-timezone');

var timeDiv, dateDiv, weatherDiv;

var tz = getQueryParam('tz');

document.addEventListener("DOMContentLoaded", function(event) {
	timeDiv = document.getElementById('time');
	dateDiv = document.getElementById('date');
	weatherDiv = document.getElementById('weather');

	updateTime();
	window.setInterval(updateTime, 1000);

	updateDate();
	window.setInterval(updateDate, 10 * 1000);

	window.setInterval(updateWeather, 15 * 60 * 1000);
});

function updateTime(){
	var dateStr;
	if (tz !== undefined) {
		dateStr = moment().tz(tz).format('HH:mm');
	} else {
		dateStr = moment().format('HH:mm');
	}

	if (timeDiv.innerHTML != dateStr) {
		timeDiv.innerHTML = dateStr;
	}
}

function updateDate(){
	var dateStr;
	if (tz !== undefined) {
		dateStr = moment().tz(tz).format('MMMM Do YYYY');
	} else {
		dateStr = moment().format('MMMM Do YYYY');
	}

	if (dateDiv.innerHTML != dateStr) {
		dateDiv.innerHTML = dateStr;
	}
}

function updateWeather(){
	if (typeof(XMLHttpRequest) !== "function" || window.location.protocol != "http:") {
		location.reload();
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

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

function getQueryParam(param) {
    params = getQueryParams(document.location.search);
    return params[param];
}