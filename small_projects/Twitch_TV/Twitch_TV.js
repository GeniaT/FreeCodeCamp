var games = ["CS","LoL","GTA V", "HeartStone","FreeCodeCamp", "Dota2","OverWatch","TitanFall2"];
var gamePics = ["http://findicons.com/files/icons/1008/quiet/128/counterstrike.png","http://orig11.deviantart.net/8078/f/2013/336/5/d/league_of_legends_icon_by_theman4556-d6wic5y.png",
"http://cdn.wccftech.com/wp-content/uploads/2012/03/GTA-V-Logo.png","http://iosicongallery.com/img/512/hearthstone-heroes-warcraft-2015.png","https://avatars2.githubusercontent.com/u/9892522?v=3&s=400",
"http://orig15.deviantart.net/3881/f/2011/230/b/b/dota_2_game_icon_by_wolfangraul-d4705v9.png","https://pbs.twimg.com/profile_images/633856419490480128/58pBUIoE_400x400.png",
"http://static1.gamespot.com/uploads/scale_medium/1365/13658182/3077168-titanfall2icon.jpg","http://i.istockimg.com/file_thumbview_approve/21787271/5/stock-photo-21787271-error-404-or-page-not-found-sticky-warning.jpg"];
//Urls for API calls
var apiStreamCall = ["https://api.twitch.tv/kraken/streams/proleaguecsgo","https://api.twitch.tv/kraken/streams/imaqtpie","https://api.twitch.tv/kraken/streams/kevinho90",
"https://api.twitch.tv/kraken/streams/playhearthstone","https://api.twitch.tv/kraken/streams/freecodecamp","https://api.twitch.tv/kraken/streams/dota2ruhub",
"https://api.twitch.tv/kraken/streams/blizzard","https://api.twitch.tv/kraken/streams/cohhcarnage","https://api.twitch.tv/kraken/streams/comster404"];
var channels = ["proleaguecsgo","imaqtpie","kevinho90","playhearthstone","freecodecamp","dota2ruhub","blizzard","cohhcarnage","comster404"]; //Not used in this program, for futur improvements

$(document).ready(function() {
for (var i = 0; i < apiStreamCall.length; i++) {
  var rowToUpdate = ".row" + (i);                                               //This var will help us to select the right row to add a class in.
  var description = $(rowToUpdate).find(".description");                        //This var is mandatory as I can't use find + append in same instruction

  $.ajax({
   type: 'GET',
   //format: url: 'https://api.twitch.tv/kraken/streams/ + "end of a stream visitor url" like "esl_LoL" from https://www.twitch.tv/esl_lol
   url: apiStreamCall[i],
   async:false, //By default set as true. Setting it "false" make the code in each ajax request to execute.
   headers: {   //If set as true (or not set, its by default, all requests are launched at the same time without executing the code inside ajax request)
     'Client-ID': 'f8xpjswqdd4dvy82cqqpxgxhohjt0wx'                             //Key that you get registering your app on twitch.
   },
   success: function(data) {
     var status;


     if (data.stream === null) { //Check if channel online or not
       var status = "offline";
       $(rowToUpdate).find(".col").addClass("offline");           //According to the loop number, we select the right row to add a class in and apply the css on it automatically.
       $(description).append("<p>Offline</p>");
     } else {
       var status = data.stream.channel.status;                                 //Takes the current title of the streaming channel
       $(rowToUpdate).find(".col").addClass("online");
       $(description).append("<p>" + status + "</p>");
     }
   },

   error: function () {
    $(rowToUpdate).find(".col").addClass("error");
    $(description).append("<p>Streamer doesn't exist</p>");
   }
  });
}
});
