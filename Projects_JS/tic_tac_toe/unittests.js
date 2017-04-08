var userWeapon = "";
var compWeapon = "";
var gameGrid = [0,0,0,0,0,0,0,0,0]; //0 = not taken yet, X / O = taken. Will be used to various check for move logics and victory detection.
var freeIdsToChooseFrom = [];// = [0,1,2,3,4,5,6,7,8] in the beginning
var compChoice = "";
var divIdToUpdate = "";
var victoryIndexes = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
var firstToPlay = Math.floor(Math.random() * 2);
var whoseTurn = "";

function freeIds() {
  for (var i = 0; i < 9; i++) {
    if (gameGrid[i] === 0) {
      freeIdsToChooseFrom.push(i);
    }
  }
}

//check if 2 divs are filled by user and block his move
function blockUsersMove () {
  for (var subArrToCheck = 0; subArrToCheck < victoryIndexes.length; subArrToCheck++) {
    var riskOfUserVictory = 0; //will increment is userWeapon found in victoryIndexes


    for (var subArrItem = 0; subArrItem < 3; subArrItem++) {
      if (gameGrid[victoryIndexes[subArrToCheck][subArrItem]] === userWeapon) {
        riskOfUserVictory++;

        if (riskOfUserVictory === 2) { //if 2 divs on a line taken by user, we block it
          //now that the subArr to block is define, we look for the div to fill
          for (var i = 0; i < 3; i++) { //we go through each of 3 items from the detected array to find the empty one

            if (gameGrid[victoryIndexes[subArrToCheck][i]] === 0) {
              $('#' + victoryIndexes[subArrToCheck][i]).html(compWeapon);

              //update gameGrid and freeIdsToChooseFrom
              gameGrid[victoryIndexes[subArrToCheck][i]] = compWeapon;
              freeIdsToChooseFrom = [];
              freeIds();
              whoseTurn = "user";
              //return;
            }
          }
          //return;
        }
      }
    }
  }
}

function checkIfCompCanWin () {
  for (var subArrToCheck = 0; subArrToCheck < victoryIndexes.length; subArrToCheck++) {
    var probOfVictory = 0; //will increment is userWeapon found in victoryIndexes


    for (var subArrItem = 0; subArrItem < 3; subArrItem++) {
      if (gameGrid[victoryIndexes[subArrToCheck][subArrItem]] === compWeapon) {
        probOfVictory++;

        if (probOfVictory === 2) {
          for (var i = 0; i < 3; i++) { //we go through each of 3 items from the detected array to find the empty one
            if (gameGrid[victoryIndexes[subArrToCheck][i]] === 0) {
              $('#' + victoryIndexes[subArrToCheck][i]).html(compWeapon);

              gameGrid[victoryIndexes[subArrToCheck][i]] = compWeapon;
              freeIdsToChooseFrom = [];
              freeIds();

              whoseTurn = "noone";
              console.log("AI HAS WON!!!");
              var comppoints = Number($('.comppoints').html())+1;
              $('.comppoints').html(comppoints);
              setTimeout(function() {resetAfterGame();
              }, 3000);
            }
          }
          return;
        }
      }
    }
  }
}

function checkIfUserHasWon() {
  for (var subArrToCheck = 0; subArrToCheck < victoryIndexes.length; subArrToCheck++) {
    var usersAlignedDivs = 0;


    for (var subArrItem = 0; subArrItem < 3; subArrItem++) {
      if (gameGrid[victoryIndexes[subArrToCheck][subArrItem]] === userWeapon) {
        usersAlignedDivs++;
        if (usersAlignedDivs === 3) {
              console.log("USER HAS WON!!!");
              var userpoints = Number($('.userpoints').html())+1;
              $('.userpoints').html(userpoints);
              setTimeout(function() {resetAfterGame();
              }, 3000);
        }
      }
    }
  }
}

function randomFromEmptyLine() {
  for (var subArrToCheck = 0; subArrToCheck < victoryIndexes.length; subArrToCheck++) {
    var emptySquares = 0;


    for (var subArrItem = 0; subArrItem < 3; subArrItem++) {
      if (gameGrid[victoryIndexes[subArrToCheck][subArrItem]] === 0) {
        emptySquares++;

        if (emptySquares === 3) {
          $('#' + victoryIndexes[subArrToCheck][1]).html(compWeapon);

          //update gameGrid and freeIdsToChooseFrom
          gameGrid[victoryIndexes[subArrToCheck][1]] = compWeapon; //we take the middle div from the empty line
          freeIdsToChooseFrom = [];
          freeIds();

          whoseTurn = "user";

          return;
        }
      }
    }
  }
}

function compMove() {
  if (whoseTurn === "comp") {
    checkIfCompCanWin();
  }

  if (whoseTurn === "comp") {
    blockUsersMove();
  }

  //choose from an empty line a random div
  if (whoseTurn === "comp") {
    randomFromEmptyLine();
  }

  //if no empty lines to choose from, choose a random empty div
  if (whoseTurn === "comp") {
    freeIds();
    //make a random selection from comp based of the free divs
    compChoice = Math.floor(Math.random() * (freeIdsToChooseFrom.length-1));

    //based on compChoice, we identify which div will have to be updated & we update the possibilities for next move
    divIdToUpdate = freeIdsToChooseFrom[compChoice];
    freeIdsToChooseFrom.splice(freeIdsToChooseFrom.indexOf(divIdToUpdate),1);
    gameGrid[divIdToUpdate] = compWeapon;

    //update the html
    $('#' + divIdToUpdate).html(compWeapon);
    whoseTurn = "user";
  }

  if (gameGrid.indexOf(0) === -1) {
    console.log("this game is a TIE");
    var ties = Number($('.ties').html())+1;
    $('.ties').html(ties);
    setTimeout(function() {resetAfterGame();
    }, 3000);
  }
}

function resetAfterGame() {
  userWeapon = "";
  compWeapon = "";
  gameGrid = [0,0,0,0,0,0,0,0,0]; //0 = not taken yet, X / O = taken. Will be used to various check for move logics and victory detection.
  freeIdsToChooseFrom = [];// = [0,1,2,3,4,5,6,7,8] in the beginning
  compChoice = "";
  divIdToUpdate = "";
  firstToPlay = Math.floor(Math.random() * 2);
  whoseTurn = "";

  $('button').prop('disabled', false);
  for (var j = 0; j <= 8; j++) {
    $('#' + j).html("");
  }

  if (firstToPlay === 0) {
    firstToPlay = "user";
    whoseTurn = "user";
  } else {
    firstToPlay = "computer";
    whoseTurn = "comp"
  }

}

if (firstToPlay === 0) {
  firstToPlay = "user";
  whoseTurn = "user";
} else {
  firstToPlay = "computer";
  whoseTurn = "comp"
}

//take in memory user choice for X or O and defines comp's X or O
$('#x').on('click', function() {
  userWeapon = $('#x').html();
  compWeapon = 'o';
  $('button').prop('disabled', true);

  if (firstToPlay === "computer") {
    setTimeout(function() {compMove();
    }, 1000);
  }
});

$('#o').on('click', function() {
  userWeapon = $('#o').html();
  compWeapon = 'x';
  $('button').prop('disabled', true);

  if (firstToPlay === "computer") {
    setTimeout(function() {compMove();
    }, 1000);
  }
});

//detects the click from user
$('.xo').on('click', function() {
  if (userWeapon === "") {
    console.log("please choose your weapon first!");
  } else {
    if (whoseTurn === "user") {
      //detect the selected div ID & update html
      var userChoice = $(this).attr('id');//Takes the id of the clicked div
      if ($('#' + userChoice).is(':empty')) {
        $('#' + userChoice).html(userWeapon);

        //update the gameGrid and list of freeIds
        gameGrid[userChoice] = userWeapon;
        freeIdsToChooseFrom = [];
        freeIds();

        //check if the user won the game
        checkIfUserHasWon();

        if (whoseTurn === "user") {
          whoseTurn = "comp";
        }

        if (gameGrid.indexOf(0) === -1) {
          console.log("this game is a TIE");
          var ties = Number($('.ties').html())+1;
          $('.ties').html(ties);
          setTimeout(function() {resetAfterGame();
          }, 3000);
        } else {
          setTimeout(function() {compMove();
          }, 1000);
        }
      }
    }
  }
});

/* to do next:
  bug:
*/
