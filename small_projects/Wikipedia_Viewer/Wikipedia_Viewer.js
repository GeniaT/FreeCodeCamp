function getWiki() {

  var userInput = $("#searchTerm").val(); //Allows to get the data from the input value set by the user
  var urlForAjax = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + userInput + '&format=json&callback=?';

$.ajax({
  type: "GET",
  url: urlForAjax,
  dataType: "jsonp",
  success: function (data) {

    for (var i = 0; i < 10; i++) {
      var url = data[3][i];
      var title = data[1][i];
      var description = data[2][i];
      $(".10articles").append("<div class='article'><a href=" + url + " target='_blank'>" + title + "</br>" + "<div class='description'>" + description + "</div>" + "</a></div>");
    }

  }
});
};



$(document).ready(function() {

  $('.inp').click(function () {
    $(".10articles").empty(); //Clearing the articles from the page to append new ones.
    getWiki();
  });

});
