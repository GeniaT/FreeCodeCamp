/*-------------------------------MODEL-----------------------------------------*/
let toggle = "OFF";
let compColors = [];
let userColors = [];
let startMode = "OFF";
let strictMode = "OFF";
let whosTurn = "computer";
let restart = "NO";
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
  compColors.push(colors[random]);
  updateCounter();
  whosTurn = "user";
  kindleCompColors();
}

function reset() {
  /*---MODEL---*/
  toggle = "OFF";
  compColors = [];
  userColors = [];
  startMode = "OFF";
  strictMode = "OFF";
  whosTurn = "computer";
  restart = "NO";
  /*----VIEW-----*/
  $(".screenText").html("");
}

$('.squareCircled').click(function() {
  if (whosTurn === "user" && startMode === "ON") {
    let classArray = $(this).attr('class');
    let splitted = classArray.split(' ');
    userColors.push(splitted[1]);
    let lastUserColorIndex = (userColors.length)-1;

    if (userColors[lastUserColorIndex] === compColors[lastUserColorIndex]) {
      audio[splitted[1]].play();
      if (userColors.length === compColors.length) {
        if (userColors.length === 20) {
          alert("YOU HAVE WON THIS GAME!!!!!!");
          reset();
          startMode = "ON";
          setTimeout(function() {
            compPlay();
          }, 2000);
        } else {
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
      restart = "YES";
      console.log("restarted");
      reset();
      toggle = "ON";//after reset, we keep the game ON
      startMode = "ON"; //after reset = OFF
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

function kindleCompColors() {
  for (let i = 0; i < compColors.length; i++) {
    const color = compColors[i];
      setTimeout(function() {
        console.log("inside 1st timeout");
        $("." + color).attr('id',color);
        audio[color].play();
        setTimeout(function() {
          console.log("inside 2nd timeout");
          $('.' + color).removeAttr('id');
        }, i + 1000);
      }, i * 1500); //not 1500 so there is a break between 2 same colors
  }
  whosTurn = "user";
}
