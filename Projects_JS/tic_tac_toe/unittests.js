var userWeapon;
var compWeapon;
var gameGrid = [0,0,0,0,0,0,0,0,0]; //0 = not taken yet, X / O = taken. Will be used to various check for move logics and victory detection.
var freeIdsToChooseFrom = [];// = [0,1,2,3,4,5,6,7,8];//ids that are free for choice
var compChoice;
var divIdToUpdate;
var victoryIndexes = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
//who's first to play?
var firstToPlay = Math.floor(Math.random() * 2);
var whoseTurn;

console.log(firstToPlay);
function freeIds() {
  for (var i = 0; i < 9; i++) {
    if (gameGrid[i] === 0) {
      freeIdsToChooseFrom.push(i);
    }
  }
  //console.log(freeIdsToChooseFrom); gives [0,1,2,3,4,5,6,7,8] without hardcode, based on gameGrid. Via this fct we only maintain one var instead of 2
}

//check if 2 divs are filled by user and block his move
function blockUsersMove () {
  for (var subArrToCheck = 0; subArrToCheck < victoryIndexes.length; subArrToCheck++) {
    var riskOfUserVictory = 0; //will increment is userWeapon found in victoryIndexes


    for (var subArrItem = 0; subArrItem < 3; subArrItem++) {
      if (gameGrid[victoryIndexes[subArrToCheck][subArrItem]] === userWeapon) {
        riskOfUserVictory++;

        if (riskOfUserVictory === 2) { //if 2 divs on a line taken by user, we block it
          console.log("risk is 2!!");
          //now that the subArr to block is define, we look for the div to fill
          for (var i = 0; i < 3; i++) { //we go through each of 3 items from the detected array to find the empty one
            if (gameGrid[victoryIndexes[subArrToCheck][i]] === 0) {
              $('#' + victoryIndexes[subArrToCheck][i]).html(compWeapon);
              //update gameGrid and freeIdsToChooseFrom
              console.log("gameGrid before: " + gameGrid);
              console.log("freeIdsToChooseFrom before: " + freeIdsToChooseFrom);

              gameGrid[victoryIndexes[subArrToCheck][i]] = compWeapon;
              freeIdsToChooseFrom = [];
              freeIds();


              console.log("gameGrid after update: " + gameGrid);
              console.log("freeIdsToChooseFrom after update: " + freeIdsToChooseFrom);

              whoseTurn = "user";
            }
          }
          return;
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

        if (probOfVictory === 2) { //if 2 divs on a line taken by user, we block it
          //now that the subArr to block is define, we look for the div to fill
          for (var i = 0; i < 3; i++) { //we go through each of 3 items from the detected array to find the empty one
            if (gameGrid[victoryIndexes[subArrToCheck][i]] === 0) {
              $('#' + victoryIndexes[subArrToCheck][i]).html(compWeapon);

              console.log("gameGrid before: " + gameGrid);
              console.log("freeIdsToChooseFrom before: " + freeIdsToChooseFrom);

              gameGrid[victoryIndexes[subArrToCheck][i]] = compWeapon;
              freeIdsToChooseFrom = [];
              freeIds();

              console.log("gameGrid after update: " + gameGrid);
              console.log("freeIdsToChooseFrom after update: " + freeIdsToChooseFrom);

              whoseTurn = "user";
            }
          }
          return;
        }
      }
    }
  }
}

function compMove(userWeapon) {
  if (whoseTurn !== "user") {
    checkIfCompCanWin();
  }

  if (whoseTurn !== "user") {
    blockUsersMove();
  }

  if (whoseTurn !== "user") {
    freeIds();
    //make a random selection from comp based of the free divs
    compChoice = Math.floor(Math.random() * (freeIdsToChooseFrom.length-1));

    //based on compChoice, we identify which div will have to be updated & we update the possibilities for next move
    divIdToUpdate = freeIdsToChooseFrom[compChoice];
    freeIdsToChooseFrom.splice(freeIdsToChooseFrom.indexOf(divIdToUpdate),1);
    gameGrid[divIdToUpdate] = compWeapon;

    //update the html
    $('#' + divIdToUpdate).html(compWeapon);
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

  if (firstToPlay === "computer") {
    console.log("computer goo");
    compMove();
  }
});

$('#o').on('click', function() {
  userWeapon = $('#o').html();
  compWeapon = 'x';

  if (firstToPlay === "computer") {
    compMove();
  }
});

//detects the click from user
$('.xo').on('click', function() {
  if (userWeapon === undefined) {
    console.log("please choose your weapon first!");
  } else {
    //detect the selected div ID & update html
    var userChoice = $(this).attr('id');//Takes the id of the clicked div
    $('#' + userChoice).html(userWeapon);
    whoseTurn = "comp";

    //update the gameGrid
    gameGrid[userChoice] = userWeapon;
    freeIdsToChooseFrom = [];
    freeIds();

    //After user's move, update freeIdsToChooseFrom array by splicing the index that was set in gameGrid and therefore is not available anymore.
    //freeIdsToChooseFrom.splice(freeIdsToChooseFrom.indexOf(Number(userChoice)),1);

    compMove();
  }
});

/* to do next:
  When clicking on a taken div, do nothing ! Atm, it's replacing the div content by a new value.
  Disable the click on X or O once the user has made his choice. (no change possible)
*/
