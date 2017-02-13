
//Vars for calculation purpose only
var userInput = [];
var arrForCalcul = [];
//vars for screen display
var firstLineChars = "";
var secondLineChars = "";
var result; //for calculations inside fcts

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
          //push the number before the % to the array for calcul
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
    }

}


function add(nbr1, nbr2) {
  result = Math.round((nbr1 + nbr2) * 1000) / 1000;
}

function sub(nbr1, nbr2) {
  result = Math.round((nbr1 - nbr2) * 1000) / 1000;
}

function mul(nbr1, nbr2) {
  result = Math.round((nbr1 * nbr2) * 1000) / 1000;
}

function div(nbr1, nbr2) {
  result = Math.round((nbr1 / nbr2) * 1000) / 1000;
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
  while (arrForCalcul.indexOf("%") !== -1) {
    arrForCalcul.splice(arrForCalcul.indexOf("%")-1, 2, (arrForCalcul[arrForCalcul.indexOf("%")-1])/100); //we pass from [5, "+", 3, "%", "-", 2] to [5, "+", 0.03, "-", 2]
  }
  //Then the * and /
  while (arrForCalcul.indexOf("x") !== -1) {
    nbr1 = arrForCalcul[arrForCalcul.indexOf("x")-1];
    nbr2 = arrForCalcul[arrForCalcul.indexOf("x")+1];
    mul(nbr1,nbr2);
    arrForCalcul.splice(arrForCalcul.indexOf("x")-1, 3,result);
  }

  while (arrForCalcul.indexOf("/") !== -1) {
    nbr1 = arrForCalcul[arrForCalcul.indexOf("/")-1];
    nbr2 = arrForCalcul[arrForCalcul.indexOf("/")+1];
    div(nbr1,nbr2);
    arrForCalcul.splice(arrForCalcul.indexOf("/")-1, 3,result);
  }

  //then + and -. Subs should be done before additions! if not, wrong results. example: 3%-2x3+4/2+1-3x4+5%
  while (arrForCalcul.indexOf("-") !== -1) {
    nbr1 = arrForCalcul[arrForCalcul.indexOf("-")-1];
    nbr2 = arrForCalcul[arrForCalcul.indexOf("-")+1];
    sub(nbr1,nbr2);
    arrForCalcul.splice(arrForCalcul.indexOf("-")-1, 3,result);
  }

  while (arrForCalcul.indexOf("+") !== -1) {
    nbr1 = arrForCalcul[arrForCalcul.indexOf("+")-1];
    nbr2 = arrForCalcul[arrForCalcul.indexOf("+")+1];
    add(nbr1,nbr2);
    arrForCalcul.splice(arrForCalcul.indexOf("+")-1, 3,result);
  }

}


$(".key").click(function () {
  inputControl(this.innerHTML);
});

$("#calculate").click(function () {
  var lastInput = arrForCalcul[arrForCalcul.length-1];
  if ((lastInput === "-" || lastInput === "x" || lastInput === "/" || lastInput === "+") && userInput.length === 0) {
    return; //disabling = when preceded by a sign
  } else {
    calculateResult();
    //Once we have the final result, we display it on the line 1 and reset the variables for next inputs
    $(".lineOne").html(arrForCalcul[0]);
    userInput = [];
    //adding the result to line 2 after the sign "="
    secondLineChars += arrForCalcul[0];
    $(".lineTwo").html(secondLineChars);
    arrForCalcul = [];
    secondLineChars = "";
  }
});

/*good to add later
  clear/reduce the code
  add the possibility to start operation by a sign and not a number
  add a 3rd line for the various error/alert messages
  add a limit for chained operations depending on the length permitted by the css
*/
