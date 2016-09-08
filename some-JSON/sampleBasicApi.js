/* notes:
$.ajax({
  type: 'GET',
  url: 'http://rest.learncode.academy/api/johnbob/friends',
  success: function(data) {
    console.log("I have friends!", data); //returns all of johnbob's friends
  }
});

$.ajax({
  type: 'POST',
  url: 'http://rest.learncode.academy/api/johnbob/friends',
  data: {name: 'Billy Bob', age: 27},
  success: function(data) {
    console.log("Friend added!", data); //the new item is returned with an ID
  }
});
*/
//==============================================================================
//Lets adapte API of john friends to his orders example.
$(function() {
  var $friends = $('#friends');
  $.ajax({
    type:'GET',
    url: 'http://rest.learncode.academy/api/johnbob/friends',
    success: function (friends) {
      $.each(friends, function(i, friend) {
        $friends.append('<li>name: '+ friend.name +', age: ' +friend.age +'</li>');
      });
    }
  });
});

