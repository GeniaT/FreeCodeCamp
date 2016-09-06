$.ajax({
  type: 'GET',
  url: 'http://rest.learncode.academy/api/johnbob/friends', //That's where we will take (GET) the data from
  success: function(data) {
    console.log("I have friends!", data); //returns all of johnbob's friends //Raw data is displayed in the console. 
  }
});

