/* WITH JSON: No Cross-origin error but data from API is obsolete
$(document).ready(function() {
  $('.newQuote').on('click', function () {
    $.getJSON('http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en&callback=?', function(data) {
      console.log(data);
      console.log(data.quoteText + "- " + data.quoteAuthor);
    });
  });
});
*/

//With JSONP but originally with Cross-Origin error even with "callback=?"
$(document).ready(function() {
  $.ajax ({ //Getting the quote directly when loading the page
    type: 'GET',
    url: 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=jsonp_callback', //jsonp=jsonp_callback the API required to specify the callback function name
    dataType: "jsonp",
    jsonp: 'callback',                                                            //Here we define the callback function name that is now insterted in the URL
    jsonpCallback: 'jsonp_callback',
    success: function (data) {
      var apiQuote = $('#apiQuote');
      //console.log(data);                                                        //The raw data is now displayed and we can work with it.
      //console.log(data.quoteText + "- " + data.quoteAuthor);                    //Intermediate Test
      document.getElementById("apiQuote").innerHTML = "";                         //Clearing the content if a previous quote is there
      apiQuote.append(data.quoteText + " - " + data.quoteAuthor);
      var tweetUrl = "https://twitter.com/intent/tweet?button_hashtag=GreatQuotes&text="+ data.quoteText + " - " + data.quoteAuthor;
      $(".twitter-hashtag-button").attr('href', tweetUrl);                        //Replace the href of the node having the twitter class with tweetUrl
    },
    error: function () {
      alert("Error loading a new Quote, sorry!");
    }
});

  $('.newQuote').on('click', function() {
    $.ajax ({
      type: 'GET',
      url: 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=jsonp_callback',
      dataType: "jsonp",
      jsonp: 'callback',
      jsonpCallback: 'jsonp_callback',
      success: function (data) {
        var apiQuote = $('#apiQuote');
        document.getElementById("apiQuote").innerHTML = "";
        apiQuote.append(data.quoteText + " - " + data.quoteAuthor);
        var tweetUrl = "https://twitter.com/intent/tweet?button_hashtag=GreatQuotes&text="+ data.quoteText + " - " + data.quoteAuthor;
        $(".twitter-hashtag-button").attr('href', tweetUrl);
      },
      error: function () {
        alert("Error loading a new Quote, sorry!");
      }
    });
  });
});

/* /!\ USEFULL GENERAL INFO:
1/ When selecting data from API, check if you go through an object or array:
//Example : data.contents.quotes[0].quote (data is the root of the whole JSON call, contents is object and quotes is array.)
2/other point: to avoid Cross-origin errors: use &callback=? at the end of the url used for API call.
3/The url build is important and never the same. It's specific to each API.
4/ callback function "callback=?" can be enough in JSON for cross-origin errors but not in jsonp where we need to create a name for the callback
function, then declare and use it.
*/
