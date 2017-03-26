var userWeapon;
var compWeapon;
var gameGrid = [0,0,0,0,0,0,0,0,0];
//take in memory user choice for X or O
$('#x').on('click', function() {
  userWeapon = $('#x').html();
  compWeapon = 'o';
  console.log(userWeapon);
});

$('#o').on('click', function() {
  userWeapon = $('#o').html();
  compWeapon = 'x';
  console.log(userWeapon);
});

//detects the click from user
$('.xo').on('click', function() {
  if (userWeapon === undefined) {
    console.log("please choose your weapon first!");
  } else {
    var userChoice = $(this).attr('id');//Takes the id of the clicked div
    $('#'+userChoice).html(userWeapon);

    gameGrid[userChoice] = userWeapon;
    console.log(gameGrid);
  }

});

//from the user choice X or O + click on DIV, store the value to an empty array of 9 zeros
