$(document).ready(function() {
  $('.newQuote').on('click', function () {
    $.getJSON('http://quotes.rest/qod.json', function(json) {
      //$('#apiQuote').html(JSON.stringify(json));//Takes API data and add it to html as a string
      var html = "";
      json.forEach(function(val) {
        var keys = Object.keys(val);
        html += "<div class = 'cat'>";
        keys.forEach(function(key){
          html += "<strong>" + key + "</strong>: " + val[key] + "<br>";
        });
        html += "</div><br>";
      });
      $(".message").html(html);
    });
  });
});
