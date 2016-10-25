function getWiki() {
$.ajax({
  type: 'GET',
  url: 'https://en.wikipedia.org/w/api.php?action=opensearch&search=%22lineage%22&format=json&callback=?%22', //'//en.wiktionary.org/w/api.php',
  dataType: 'jsonp',
  success: function (data) {
/*
    console.log("1:");
    console.log(data[1][0]);
    console.log(data[2][0]);
    console.log(data[3][0]);

    console.log("2:");
    console.log(data[1][1]);
    console.log(data[2][1]);
    console.log(data[3][1]);
*/
    for (var i = 0; i < 10; i++) {
      console.log(i + 1 + ":");
      console.log(data[1][i]);
      console.log(data[2][i]);
      console.log(data[3][i]);
    }

  }
});
};

getWiki();
/* result from: https://en.wikipedia.org/w/api.php?action=opensearch&search=%22tennis%22&format=json&callback=?%22
/*
"(["\"tennis\"", //Labels of each page
["Tennis scoring system",
"Tennis at the 1999 Southeast Asian Games",
"Tennis at the 2012 Summer Olympics",
"Tennis Court (song)",
"Tennis at the 2013 Summer Universiade \u2013 Women's Singles",
"Tennis elbow","Tennis at the 2013 Summer Universiade \u2013 Men's Singles",
"Tennis at the 1920 Summer Olympics",
"Tennis at the 2016 Summer Olympics",
"Tennis for Two"],
["A tennis tournament is organized into matches between players (for singles tournaments) or teams of two players (for doubles tournaments).", //description of each page
"Tennis at the 1999 Southeast Asian Games was held in Hassanal Bolkiah National Stadium Tennis Court, Bandar Seri Begawan, Brunei Darussalam from 8 to 14 August 1999 Tennis had team, doubles, and singles events for men and women, as well as a mixed doubles competition.",
"The tennis tournaments at the 2012 Summer Olympics in London were staged at the All England Club in Wimbledon, from 28 July to 5 August.",
"\"Tennis Court\" is a song by New Zealand singer Lorde, taken from her debut album Pure Heroine (2013). On 7 June 2013, the song was released as the album's second single by Universal Music Group, following \"Royals\".",
"The women's singles tennis event at the 2013 Summer Universiade was held from July 8 to 16, 2013 at the Tennis Academy in Kazan, Russia.",
"Tennis elbow or lateral epicondylitis is a condition in which the outer part of the elbow becomes sore and tender.",
"The men's singles tennis event at the 2013 Summer Universiade was held from July 8 to 16 at the Tennis Academy in Kazan, Russia.",
"Final results for the Tennis competition at the 1920 Summer Olympics in Antwerp, Belgium. The competition was held from Monday, August 16, 1920 to Tuesday, August 24, 1920.",
"The tennis tournament at the 2016 Summer Olympics was held at the Olympic Tennis Centre, from 6 to 14 August.",
"Tennis for Two is a sports video game developed in 1958, which simulates a game of tennis, and was one of the first games developed in the early history of video games."],
["https://en.wikipedia.org/wiki/Tennis_scoring_system", //link for each page
"https://en.wikipedia.org/wiki/Tennis_at_the_1999_Southeast_Asian_Games",
"https://en.wikipedia.org/wiki/Tennis_at_the_2012_Summer_Olympics",
"https://en.wikipedia.org/wiki/Tennis_Court_(song)",
"https://en.wikipedia.org/wiki/Tennis_at_the_2013_Summer_Universiade_%E2%80%93_Women%27s_Singles",
"https://en.wikipedia.org/wiki/Tennis_elbow",
"https://en.wikipedia.org/wiki/Tennis_at_the_2013_Summer_Universiade_%E2%80%93_Men%27s_Singles",
"https://en.wikipedia.org/wiki/Tennis_at_the_1920_Summer_Olympics",
"https://en.wikipedia.org/wiki/Tennis_at_the_2016_Summer_Olympics",
"https://en.wikipedia.org/wiki/Tennis_for_Two"]
])
*/
