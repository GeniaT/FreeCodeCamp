/*
var frm = document.getElementById('inp');
var userInput = frm.value; //Empty at first, that's why it works after refresh
var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=%22tennis%22&format=json&callback=?%22';
var urlforAjax = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=%22' + userInput + '%22&format=json&callback=?%22';
*/

function getWiki() {
  var frm = document.getElementById('inp');
  var userInput = frm.value; //Empty at first, that's why it works after refresh
  //var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=%22tennis%22&format=json&callback=?%22';
  var urlForAjax = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=%22' + userInput + '%22&format=json&callback=?%22';

$.ajax({
  type: 'GET',
  url: urlForAjax, //'https://en.wikipedia.org/w/api.php?action=opensearch&search=%22tennis%22&format=json&callback=?%22',
  dataType: 'jsonp',
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



$('.inp').on('click', function () {
  //$('form').attr('action', urlForAjax); // Normally not mandatory if api call is done with correct url
  getWiki();
});

/*
function fromSearchBox () {
  var frm = document.getElementById('inp');
  var userInput = frm.value;
  var urlForAjax;
  if (frm) {
    var urlForAjax=("https://en.wikipedia.org/w/api.php?action=opensearch&search=%22" + userInput + "%22&format=json&callback=?%22");
    $('form').attr('action', frm.action); //now that the action link is known, we push it to html
  }
}

$('.inp').on('click', function () {
  var urlForAjax;
  fromSearchBox();
});
*/

getWiki();
