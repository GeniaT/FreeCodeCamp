var start; //will be passed on "on" or "off" when clicking on start/pause button
var countdown; //Used globally to play with setInterval and clearInterval on start/pause button
var timerValue;
//Setting the timer according to the choice of Pomodoro duration
function updateTimerAtInit() {
  var min = $('#pomodoro_duration').val();
  var sec = "00";

  if (min > 5) { //Display 05:00 instead of 5:00
    timerValue = min + " : " + sec;
  } else {
    timerValue = "0" + min + " : " + sec;
  }

  $('.timer').html(timerValue);
}

function countDown() {
  //2 main points: reduction from tens to units. Then from minutes to secs.
  //from secs to minutes
    if (timerValue[1] === "0" && timerValue[5] === "0" && timerValue[6] === "0") { // if format 20 : 00 to 19 : 59 (0 in minutes thens)
      if (timerValue === "00 : 00") { //Logic to add: Switch to break ar pomodoro timer depending on current timer
        console.log("Please pause!");
        clearInterval(countdown);
      } else {
        timerValue = Number(timerValue[0]-1) + "9 : 59";
        console.log("FIRST EVER if " + timerValue);
      }
   } else if (timerValue[5] === "0" && timerValue[6] === "0") { //if format 25 : 00, we need to pass on 24 : 59
    timerValue = timerValue[0] + Number(timerValue[1]-1) + " : 59";
    console.log("if " + timerValue);
  } else {                                      //if we in format 24 : 59, we need to reduce till 24 : 00/ 2 points: from 24 : 59 to 24 : 50 & from 24 : 50 to 24 : 49
    if (timerValue[6] === "0") {                //if format 24 : 50, we reduce the tens number by one and set last character to 9
      timerValue = timerValue[0] + timerValue[1] + " : " + Number(timerValue[5]-1) + "9";
      console.log("if else if" + timerValue);
    } else {                                    //if format 24 : 59, we reduce last character by one
      timerValue = timerValue[0] + timerValue[1] + timerValue[2] + timerValue[3] + timerValue[4] + timerValue[5] + Number(timerValue[6]-1);
      console.log("if else else" + timerValue);
    }
  }

  //Then from pomodoro to break timer

  console.log("one sec has passed");
  console.log(timerValue);
  $('.timer').html(timerValue);
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
  updateTimerAtInit();
});

$('.start_pause').on('click', function() { //Depending on if the timer state (running or in pause), we start/pause it and change it's state again.
  //var timer = $('.timer').html();
  if (start === "on") {
    console.log("PAUSED!");
    clearInterval(countdown);
    start = "off";
  } else {
    countdown = setInterval(countDown, 100);
    console.log("started!");
    start = "on";
  }

});
/*
to do next:
  update the timer values via the countDown function, No bugs to correct at this time
*/
