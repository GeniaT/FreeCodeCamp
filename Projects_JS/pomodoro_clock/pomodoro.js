var start; //will be passed on "on" or "off" when clicking on start/pause button
var countdown; //Used globally to play with setInterval and clearInterval on start/pause button
var timerValue;
var mode;
//for clock purpose variables
const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.min-hand');

//Setting the timer according to the choice of Pomodoro duration
function updateTimerAtInit() {
  var min = $('#pomodoro_duration').val();
  var sec = "00";

  $('.messageToUser').html("Are You Ready?");
  if (min > 5) { //Display 05:00 instead of 5:00
    timerValue = min + " : " + sec;
  } else {
    timerValue = "0" + min + " : " + sec;
  }

  $('.timer').html(timerValue);
  // and init of the clock accoring to the default pomodoro option
  refreshClock();
}

function countDown() {


  //2 main points: reduction from tens to units. Then from minutes to secs.
  //from secs to minutes
    if (timerValue[1] === "0" && timerValue[5] === "0" && timerValue[6] === "0") { // if format 20 : 00 to 19 : 59 (0 in minutes thens)
      if (timerValue === "00 : 00") { //Logic to add: Switch to break ar pomodoro timer depending on current timer

        if (mode === undefined || mode === "work") {
          mode = "break";
        } else {
          mode = "work";
        }

        clearInterval(countdown);
        var min = $('#break_duration').val();
        var sec = "00";

        if (min > 5) { //Display 05:00 instead of 5:00
          timerValue = min + " : " + sec;
        } else {
          timerValue = "0" + min + " : " + sec;
        }

        if (mode === "break") {
          $('.messageToUser').html("Enjoy some rest...");
        } else if (mode === "work") {
          $('.messageToUser').html("Work Well!");
        }

        $('.timer').html(timerValue);

        countdown = setInterval(countDown, 1000);
      } else {
        timerValue = Number(timerValue[0]-1) + "9 : 59";
      }

   } else if (timerValue[5] === "0" && timerValue[6] === "0") { //if format 25 : 00, we need to pass on 24 : 59
    timerValue = timerValue[0] + Number(timerValue[1]-1) + " : 59";
  } else {                                      //if we in format 24 : 59, we need to reduce till 24 : 00/ 2 points: from 24 : 59 to 24 : 50 & from 24 : 50 to 24 : 49
    if (timerValue[6] === "0") {                //if format 24 : 50, we reduce the tens number by one and set last character to 9
      timerValue = timerValue[0] + timerValue[1] + " : " + Number(timerValue[5]-1) + "9";
    } else {                                    //if format 24 : 59, we reduce last character by one
      timerValue = timerValue[0] + timerValue[1] + timerValue[2] + timerValue[3] + timerValue[4] + timerValue[5] + Number(timerValue[6]-1);
    }
  }

  $('.timer').html(timerValue);
}

//Disabling the select options when everything is not reset
function disable() {
  console.log("inside");
  document.getElementById("pomodoro_duration").disabled=true;
  document.getElementById("break_duration").disabled=true;
}
function enable() {
  console.log("inside");
  document.getElementById("pomodoro_duration").disabled=false;
  document.getElementById("break_duration").disabled=false;
}


 //takes the time by default
 updateTimerAtInit();

//Functions run based on different events
$('#pomodoro_duration').on('change', function() {
  updateTimerAtInit();
});

$('.reset').on('click', function() {
  $('#pomodoro_duration').val("25");//before updating the timer, we reset the option selected as default in pom duration
  $('#break_duration').val("5");
  //global variables reset
  start; //will be passed on "on" or "off" when clicking on start/pause button
  countdown; //Used globally to play with setInterval and clearInterval on start/pause button
  timerValue;
  mode;
  //to stop the timer:
  clearInterval(countdown);
  start = "off";
  //update HTML with options selected
  updateTimerAtInit();
  //unlocking the option selection during reset
  enable();
});

$('.start_pause').on('click', function() { //Depending on if the timer state (running or in pause), we start/pause it and change it's state again.
  //var timer = $('.timer').html();
  if (start === "on") {
    $('.messageToUser').html("The time never really stops...");
    clearInterval(countdown);
    start = "off";
  } else {
    countdown = setInterval(countDown, 1000);
    if (mode === undefined || mode === "work") {
      $('.messageToUser').html("Work Well !");
    } else {
      $('.messageToUser').html("Enjoy some rest...");
    }

    start = "on";
    disable();//we disable the option selection as the timer is started. enabling is only possible at reset.
  }
  //test on clock refresh from HERE==============================
  setInterval(refreshClock,1000);
});

//According to timerValue, we adapt the look of the clock



function refreshClock() {

  const seconds = Number(timerValue[5] + timerValue[6]);
  const secondsDegrees = (seconds / 60) * 360 + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;/*it's not quotes but ctrl+alt+7*/


  //mins
  const minutes = Number(timerValue[0] + timerValue[1]);
  const minutesDegrees = (minutes / 60) * 360 + 90;
  minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

}
/*
Next to do:
  work on resizing of the screen, clearing the buttons and options below the clock on certain sizes etc. 
*/
