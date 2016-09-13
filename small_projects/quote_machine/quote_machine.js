$(document).ready(function() {
  $('.newQuote').on('click', function () {
    $.getJSON('http://quotes.rest/qod.json', function(data) {
      console.log(data);                          //Testing the data from API.
      console.log(data.contents.quotes[0].quote); //testing a specific part of the data. 
    });
  });
});




// /!\ IMPORTANT!!!!! When selecting data from API, check if you go through an object or array:
//Example : data.contents.quotes[0].quote (data is the root of the whole JSON call, contents is object and quotes is array.)

//continue on https://www.smashingmagazine.com/2012/02/beginners-guide-jquery-based-json-api-clients/
//There is shown how to get a specific data from API "complex" objects.
