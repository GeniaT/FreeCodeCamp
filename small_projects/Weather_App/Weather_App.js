$(document).ready(function() {
  $('.weather').on('click', function () {
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?id=2802960&APPID=e0ee1fd0698ca554514e35d77c06ae12', function(data) { //id=city ID and APPID = user API ID
      console.log(data);
      console.log("City: " + data.name);
      console.log("Country: " + data.sys.country);
      console.log("Weather: " + data.weather[0].main);
      console.log("Temperature in Kelvin K: " + data.main.temp);
      //Kelvin K -273,15= Temp in C°
      //Kelvin K -459,67= Temp in F°
      console.log(data.weather[0].icon);
      var iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon +".png";
      console.log(iconUrl);
    });
  });
});

//Getting the current location of the user
var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

//And insert the localisation it in HTML file
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}


/* To call the API, works with JSONP aswell with following code:
function getQuote() {
  $.ajax ({ //Getting the quote directly when loading the page
    type: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/weather?id=2802960&APPID=e0ee1fd0698ca554514e35d77c06ae12&jsonp=jsonp_callback', //jsonp=jsonp_callback the API required to specify the callback function name
    dataType: "jsonp",
    jsonp: 'callback',                                                            //Here we define the callback function name that is now insterted in the URL
    jsonpCallback: 'jsonp_callback',
    success: function (data) {
      console.log(data);                                                        //The raw data is now displayed and we can work with it.
    },
    error: function () {
      alert("Error loading a new Quote, sorry!");
    }
});
}

getQuote();*/
