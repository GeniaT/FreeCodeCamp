/*$.getJSON('https://api.twitch.tv/kraken/streams/freecodecamp?client_id=f8xpjswqdd4dvy82cqqpxgxhohjt0wx?callback=?', function(data) {
  console.log(data);
}); */


$.ajax({
 type: 'GET',
 //The url for various stream check is this format: url: 'https://api.twitch.tv/kraken/streams/ + "end of a stream visitor url" like "esl_LoL" from https://www.twitch.tv/esl_lol
 url: 'https://api.twitch.tv/kraken/streams/freecodecamp',
 headers: {
   'Client-ID': 'f8xpjswqdd4dvy82cqqpxgxhohjt0wx' //Key that you get registering your app on twitch. 
 },
 success: function(data) {
   console.log(data);
 }
});

/* if offline, the response is in the following format:
{"stream":null,"_links":{"self":"https://api.twitch.tv/kraken/streams/test_channel","channel":"https
://api.twitch.tv/kraken/channels/test_channel"}}
*/
