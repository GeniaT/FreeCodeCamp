//events creation vars
var eventStart
var eventPause
var eventResetTimer
var eventPomodoroChoosen


$('.reset').on('click', function() {
  console.log('A reset should now happen!');
});

$('.pomodoro_duration').on('change', function() {
  console.log('the duration has changed!');
})
