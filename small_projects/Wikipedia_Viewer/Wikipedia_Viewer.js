function getWiki() {
$.ajax({
  type: 'GET',
  url: 'https://en.wikipedia.org/w/api.php?action=opensearch&search=%22tennis%22&format=json&callback=?%22', //'//en.wiktionary.org/w/api.php',
  dataType: 'jsonp',
  success: function (data) {
/*
    console.log("1:");
    console.log(data[1][0]);
    console.log(data[2][0]);
    console.log(data[3][0]);

    console.log("2:");
    console.log(data[1][1]);
    console.log(data[2][1]);
    console.log(data[3][1]);
*/

    for (var i = 0; i < 10; i++) {

      var url = data[3][i];
      var title = data[1][i];
      var description = data[2][i];
      $(".10articles").append("<div class='article'><a href=" + url + " target='_blank'>" + title + "</br>" + description + "</a></div>");
    }

  }
});
};

getWiki();
