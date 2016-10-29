var games = ["CS","LoL","GTA V", "HeartStone","FreeCodeCamp", "Dota2","OverWatch","TitanFall2"];
var gamePics = ["http://findicons.com/files/icons/1008/quiet/128/counterstrike.png","http://orig11.deviantart.net/8078/f/2013/336/5/d/league_of_legends_icon_by_theman4556-d6wic5y.png",
"http://cdn.wccftech.com/wp-content/uploads/2012/03/GTA-V-Logo.png","http://iosicongallery.com/img/512/hearthstone-heroes-warcraft-2015.png","https://avatars2.githubusercontent.com/u/9892522?v=3&s=400",
"http://orig15.deviantart.net/3881/f/2011/230/b/b/dota_2_game_icon_by_wolfangraul-d4705v9.png","https://pbs.twimg.com/profile_images/633856419490480128/58pBUIoE_400x400.png",
"http://static1.gamespot.com/uploads/scale_medium/1365/13658182/3077168-titanfall2icon.jpg"];
var urls = ["https://api.twitch.tv/kraken/streams/amazhs","https://api.twitch.tv/kraken/streams/underground_dv","https://api.twitch.tv/kraken/streams/proleaguecsgo",
"https://api.twitch.tv/kraken/streams/pandagirl91","https://api.twitch.tv/kraken/streams/freecodecamp"];

var channels = ["amazhs","underground_dv","proleaguecsgo","pandagirl91","freecodecamp","brunofin","comster404"];

$.ajax({
 type: 'GET',
 //The url for various stream check is this format: url: 'https://api.twitch.tv/kraken/streams/ + "end of a stream visitor url" like "esl_LoL" from https://www.twitch.tv/esl_lol
 headers: {
   'Client-ID': 'f8xpjswqdd4dvy82cqqpxgxhohjt0wx'                               //Key that you get registering your app on twitch.
 },
 success: function(data) {
   var status;
   console.log(data);
   console.log(data.stream);

   if (data.stream === null) { //Check if channel online or not
     var status = "Offline";
     console.log("This channel is offline at the moment");
   } else {
     var status = data.stream.channel.status; //Takes the current title of the streaming channel
     var logo = data.stream.channel.logo;
     console.log("Lucky you, it's online!");
     console.log(status);
   }

 }
});
