/*-------------------------------MODEL-----------------------------------------*/
let toggle = "OFF";
let compColors = [];
let userColors = [];
let startMode = "OFF";
let strictMode = "OFF";
let whosTurn = "computer";
let turnOn = [];
let turnOff = [];
const colors = ["green", "red", "blue", "yellow"];
const audio = {
  green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
  error: new Audio("https://www.soundjay.com/button/sounds/button-4.mp3")
}

function compPlay() {
  const random = Math.floor(Math.random()*4); //[0,3]
  if (whosTurn === "computer") {
    compColors.push(colors[random]);
    console.log(compColors);
    updateCounter();
    disableClickOnColors();
    kindleCompColors();
    whosTurn = "user";
    setTimeout(enableClickOnColors, 1500*compColors.length); //estimation done to set a timeout according to the number of colors that has to be kindled first
  }
}

function reset() {
  /*---MODEL---*/
  toggle = "OFF";
  compColors = [];
  userColors = [];
  startMode = "OFF";
  strictMode = "OFF";
  whosTurn = "computer";

  /*----VIEW-----*/
  $(".screenText").html("");
  $('.red').removeAttr('id');
  $('.blue').removeAttr('id');
  $('.green').removeAttr('id');
  $('.yellow').removeAttr('id');
  $('.strict').removeAttr('id');
}

$('.squareCircled').click(function() {
  if (whosTurn === "user" && startMode === "ON") {
    let classArray = $(this).attr('class');
    let splitted = classArray.split(' ');
    userColors.push(splitted[1]);
    let lastUserColorIndex = (userColors.length) - 1;

    if (userColors[lastUserColorIndex] === compColors[lastUserColorIndex]) {
      audio[splitted[1]].play();
      if (userColors.length === compColors.length) {
        if (userColors.length === 3) {
          alert("YOU HAVE WON THIS GAME!!!!!!");
          reset();
          startMode = "ON";
          setTimeout(function() {
            compPlay();
          }, 2000);
        } else {
          whosTurn = "computer";
          setTimeout(function() {
            compPlay();
          }, 1000);
          userColors = [];
        }
      }
    } else {
      audio.error.play();
      if (strictMode === "ON") {
        setTimeout(function() {
          reset();
          strictMode = "ON";
          $('.strict').attr('id', 'on');
          toggle = "ON";//after reset, we keep the game ON
          startMode = "ON"; //after reset = OFF
          compPlay();
        }, 1000);
      } else {
        userColors = [];
      }
    }
  }
});

/*-------------------------------CONTROLLER------------------------------------*/
function start() {
  if (toggle === "ON") {
    if (startMode === "OFF") {
      startMode = "ON";
      compPlay();
    } else {
      reset();
      toggle = "ON";//after reset, we keep the game ON
      startMode = "ON"; //after reset = OFF
      clearTimeoutsForRestart();
      setTimeout(function() {
        compPlay();
      }, 2000);
    }

  }
}

function strict() {
  if (toggle === "ON") {
    if (strictMode === "ON") {
      $('.strict').removeAttr('id');
      strictMode = "OFF";
    } else {
      $('.strict').attr('id', 'on');
      strictMode = "ON";
    }
  }
}

/*----------------------------------VIEW---------------------------------------*/
function Switch() {
  const onoff = document.getElementById('toggle');
    if (onoff.checked) {
      toggle = "ON";
      $(".screenText").html("- -");
    } else {
      toggle = "OFF";
      reset();
      clearTimeoutsForRestart(); //to avoid colors playing when toggle is OFF
      $('.strict').removeAttr('id');
    }
}

function updateCounter() {
  const count = compColors.length;
  if (count <= 9) {
    $(".screenText").html("0" + count);
  } else {
    $(".screenText").html(count);
  }
}

function clearTimeoutsForRestart() {
  turnOn.forEach(function(timer){
    clearTimeout(timer);
  });

  turnOff.forEach(function(timer2){
    clearTimeout(timer2);
  });
}

function kindleCompColors() {
  for (let i = 0; i < compColors.length; i++) {
    const color = compColors[i];

      turnOn.push(setTimeout(function() { //push each iteration to an array so I can clear them all via smt like: clearMe.forEach(function(timer){ clearTimeout(timer); });
        $("." + color).attr('id',color);
        audio[color].play();
        turnOff.push(setTimeout(function() {
          $('.' + color).removeAttr('id');
        }, i + 1000));
      }, i * 1500)); //not 1500 so there is a break between 2 same colors
  }
  whosTurn = "user";
}

function disableClickOnColors() {
  $(".red").css("pointer-events", "none");
  $(".yellow").css("pointer-events", "none");
  $(".blue").css("pointer-events", "none");
  $(".green").css("pointer-events", "none");
}

function enableClickOnColors() {
  $(".red").css("pointer-events", "auto");
  $(".yellow").css("pointer-events", "auto");
  $(".blue").css("pointer-events", "auto");
  $(".green").css("pointer-events", "auto");
}
