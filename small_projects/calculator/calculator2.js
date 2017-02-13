
//Vars for calculation purpose only
var userInput = [];
var arrForCalcul = [];
//vars for screen display
var firstLineChars = "";
var secondLineChars = "";

function inputControl (key) {

    if ((Number(key) >= 0 && Number(key) <= 9)) {
          if ((userInput.length < 8) && (arrForCalcul[arrForCalcul.length-1] !== "%")) {       //limit for the screen and no dots yet
            if ((Number(key) === 0) && (userInput.length === 0)) { //Avoid displaying multiple zeros on the screen
              return;
            } else if ((Number(key) === 0) && (userInput[userInput.length - 1]) === "%") {
              return;
            } else {
              userInput.push(key);
              displayFirstLine(key);
              displaySecondLine(key);
            }
          }

    } else if ((key === ".") && (userInput.indexOf(key) === (-1))) {
      if (userInput.length === 0) { //avoiding dots after % like 4%. resulting in a NaN later
        return;
      } else {
        userInput.push(key);
        displayFirstLine(key);
        displaySecondLine(key);
      }
    } else if (key === "/" || key === "x" || key === "+" || key === "-") {
          firstLineChars = ""; //we repplace the 1st line with the operational sign
          if (userInput.length > 0) { // I only push into another arr if userInput isnt empty
            arrForCalcul.push(Number(userInput.join(""))); //we push as a number the multi digit in the arr for later calculation
          }
          if ((typeof arrForCalcul[arrForCalcul.length-1] === "number") || (arrForCalcul[arrForCalcul.length-1] === "%")) {
            arrForCalcul.push(key);
            userInput = [];           //clearing the userInput so we can build a new string of digits
          }
          displayFirstLine(key);
          displaySecondLine(key);
          if (firstLineChars.length > 0) { //after the displayFirstLine fct run, we clear the variable
            firstLineChars = "";
          }

    } else if ( key === "%") {
          if (userInput.length > 0) {
            arrForCalcul.push(Number(userInput.join("")));
            userInput = [];
          }
          if (typeof arrForCalcul[arrForCalcul.length-1] === "number") {
            arrForCalcul.push(key);
            displayFirstLine(key);
            displaySecondLine(key);
          }
    } else if (key === "C") {
          clear();
    }

}


function add(nbr1, nbr2) {
  var result = Math.round((nbr1 + nbr2) * 1000) / 1000;
}

function sub(nbr1, nbr2) {
  var result = Math.round((nbr1 - nbr2) * 1000) / 1000;
}

function mul(nbr1, nbr2) {
  var result = Math.round((nbr1 * nbr2) * 1000) / 1000;
}

function div(nbr1, nbr2) {
  var result = Math.round((nbr1 / nbr2) * 1000) / 1000;
}


function clear () {
  userInput = [];
  arrForCalcul = [];
  firstLineChars = "";
  secondLineChars = "";
  $(".lineOne").html("0");
  $(".lineTwo").html("0");
}

  function displayFirstLine(key) {
    firstLineChars += key;
    $(".lineOne").html(firstLineChars);
  }

  function displaySecondLine(key) {
    var secondLine = arrForCalcul.join("");
    if (arrForCalcul.length > 0) {
      $(".lineTwo").html(secondLine);
    }
  }


function calculateResult() {
  //reduce the array of chained operations by calculating first the %

  //Then the * and /

  //then + and -

  //return a final value
}


$(".key").click(function () {
  inputControl(this.innerHTML);
  console.log(userInput);
  console.log(arrForCalcul);
  console.log(firstLineChars);
});

$("#calculate").click(function () {
  calculateResult();
});
