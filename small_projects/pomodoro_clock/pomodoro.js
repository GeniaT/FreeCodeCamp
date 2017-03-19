var start; //will be passed on "on" or "off" when clicking on start/pause button
var countdown;
//Setting the timer according to the choice of Pomodoro duration
function updateTimerAtInit() {
  var min = $('#pomodoro_duration').val();
  var sec = "00";
  var timerValue;

  if (min > 5) { //Display 05:00 instead of 5:00
    timerValue = min + " : " + sec;
  } else {
    timerValue = "0" + min + " : " + sec;
  }

  $('.timer').html(timerValue);
}

function countDown() {
  console.log("one sec has passed");
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
  var timer = $('.timer').html();
  if (start === "on") {
    console.log("PAUSED!");
    clearInterval(countdown);
    start = "off";
  } else {
    countdown = setInterval(countDown, 1000);
    console.log("started!");
    start = "on";
  }



  //check if the function that will modify the timer is ready

  //create a setInterval with this function each sec

  //test if ok.
});
/*
Logics to add:
  updateTimer is run at reset, pause, end of pomodoro, end of break, at the init of the app.
  Need to differenciate the cases so the update can be ran according to the trigger.
*/
