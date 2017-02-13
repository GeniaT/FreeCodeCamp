
//Vars for calculation purpose only
var userInput = [];
var arrForCalcul = [];
//vars for screen display
var firstLineChars = "";
var secondLineChars = "";

function inputControl (key) {

    if ((Number(key) >= 0 && Number(key) <= 9)) {
          if ((userInput.length < 8) && (arrForCalcul[arrForCalcul.length-1] !== "%")) {       //limit for the screen
            if ((Number(key) === 0) && (userInput.length === 1) && userInput[0] === "0") { //Avoid displaying multiple zeros on the screen before the decimals
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
          //we add a sign on 2nd line only if there is no one yet:
          if (secondLineChars[secondLineChars.length-1] !== "+" && secondLineChars[secondLineChars.length-1] !== "-" &&
              secondLineChars[secondLineChars.length-1] !== "x" && secondLineChars[secondLineChars.length-1] !== "/" ) {
            displaySecondLine(key);
          }
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
    } else if (key === "=") {
          firstLineChars = "";
          if (userInput.length > 0) { // I only push into another arr if userInput isnt empty
            arrForCalcul.push(Number(userInput.join(""))); //we push as a number the multi digit in the arr for later calculation
          }
          displaySecondLine(key);
          firstLineChars = "";
          secondLineChars = "";
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
    secondLineChars += key;
    $(".lineTwo").html(secondLineChars);
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
});

$("#calculate").click(function () {
  var lastInput = arrForCalcul[arrForCalcul.length-1];
  if ((lastInput === "-" || lastInput === "x" || lastInput === "/" || lastInput === "+") && userInput.length === 0) {
    return;
  } else {
    console.log("supposed to calculate now");
    calculateResult();
  }
});

/*good to add later
  deal with 0.1 in the middle of an operation like: 2+3-5%x3.2-1= (instead of 2+3-5%x3.2-0.1=)
  clear/reduce the code
  add the possibility to start operation by a sign and not a number
  add a 3rd line for the various error/alert messages
*/
