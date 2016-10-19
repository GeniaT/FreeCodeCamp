var lat;
var lon;
var cTemp;
var kTemp;
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

//And prepare the variables for url API build
function showPosition(position) {
    lat = position.coords.latitude;                                             // not "var lat =" so the scope of the variable update is global
    lon = position.coords.longitude;
}

$(document).ready(function() {
  getLocation();
  $('.wToday').on('click', function () {
    //Now that we have our location with lat and lon variables, we build the link for calling weather API
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&APPID=e0ee1fd0698ca554514e35d77c06ae12', function(data) { // APPID = user API ID
      var kTemp = data.main.temp;
      var fTemp = (kTemp)*(9/5)-459.67;                                         //We receive the degrees in kelvin.
      var cTemp = kTemp - 273;                                                  //And we need to toggle between Fareneit and Celsius
      var swapToggle = true; // To be able to switch this var to false when clicked & reverse

      console.log(data);
      console.log("City: " + data.name);
      document.getElementById("location").innerHTML = data.name + ", " + data.sys.country;
      console.log("Country: " + data.sys.country);
      console.log("Weather: " + data.weather[0].main);
      document.getElementById("weather").innerHTML = data.weather[0].main;
      console.log("Temperature in Kelvin K: " + data.main.temp);
      //document.getElementById("temperature").innerHTML = data.main.temp + " K°";
      document.getElementById("temperature").innerHTML = (Math.floor(fTemp) + " F°");

      $("#temperature").click(function(){
        if (swapToggle === true) { //It has to be a tripe === here
          $("#temperature").html(Math.floor(cTemp) + " <a> C°</a>"); //Math.floor to avoid many decimals
          swapToggle = false;//dont set "var swapToggle" since we want to modify locally the value
        } else {
          $("#temperature").html(Math.floor(fTemp) + "<a> F°</a>");
          swapToggle = true;
        }
      });





      console.log(data.weather[0].icon);
      var iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon +".png" //Building the url to get the right pic for the weather
      //document.getElementById("weatherImage").innerHTML = "<img src=" + iconUrl + "/>";
      console.log(iconUrl);
    });
  });



});




/* To call the API, works with JSONP aswell with following code:
function getQuote() {
  $.ajax ({
    type: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/weather?id=2802960&APPID=e0ee1fd0698ca554514e35d77c06ae12&jsonp=jsonp_callback', //jsonp=jsonp_callback the API required to specify the callback function name
    dataType: "jsonp",
    jsonp: 'callback',                                                            //Here we define the callback function name that is now insterted in the URL
    jsonpCallback: 'jsonp_callback',
    success: function (data) {
      console.log(data);                                                        //The raw data is now displayed and we can work with it.
    },
    error: function () {
      alert("Error loading a Weather Data, sorry!");
    }
});
}

getQuote();*/

//What can be improved: var declarations, jQuery use (instead of getElementById etc, and innerHTML, rather use jquery $("...").html)
//Better start by testing core functionalities instead of creating bundaries with html divs. That should come last.
