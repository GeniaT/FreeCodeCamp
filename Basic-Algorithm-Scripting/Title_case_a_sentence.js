<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Test page</title>
  </head>
  <body>
    <script>
    /* The exercice here is to take any random string as Input and create a new one with each first letter as a CAPS. */
// START: First version of the program that gives correct results but doesn't pass FCC checks
/*function titleCase(str) {
str = str.toLowerCase();
str = str.split(" ");
var str1=[];
for (i = 0; i < str.length; i++) {                        //longeur de l'array
var maj = str[i][0];                                    //chaque 1st character
maj = maj.toUpperCase();                                //Make the 1st letter of word UpperCase
var test = str[i].replace(str[i][0],maj.toUpperCase()); //replace the word of my initial array by the word with 1st letter as UpperCase
str1 = (str1 + " ").concat(test);                       //concat all words with a space in between
}
str = String(str1);
console.log(str);
return str;                                              //return the value outside for loop
}
titleCase("I'm a little tea pot");
*/
//END of the 1st version.
//---------------------------------------------------------------------------------------------------------------------------------------
//START 2nd version:
//Note written by me:
String.prototype.replaceAt = function(index, character) {   //==> To clarify.
  return this.substr(0, index) + character + this.substr(index+character.length);
};


function titleCase(str) {
  var newTitle = str.split(' ');
  var updatedTitle = [];
  for (var st in newTitle) {                                                                            //Another way to each word in newTitle. var st = newTitle[i] à priori.
      updatedTitle[st] = newTitle[st].toLowerCase().replaceAt(0, newTitle[st].charAt(0).toUpperCase()); //Array in which we create each word by setting it in
  }                                                                                                     //lowercase then replacing the first character by upperCase
  return updatedTitle.join(' '); //Then we join all words of the array into a single string.
}

titleCase("I'm a little tea pot");
//END 2nd version.
//-----------------------------------------------------------------------------------------------------------------------------------------
//START version 3 with map method ==> BEST FOR ME AT THE MOMENT (28/08/2016)
function titleCase(str) {
  var convertToArray = str.toLowerCase().split(" ");
  var result = convertToArray.map(function(val){
      return val.replace(val.charAt(0), val.charAt(0).toUpperCase());
  });
  return result.join(" ");
}
//END of version 3
//------------------------------------------------------------------------------------------------------------------------------------------
//START version 4: most advanced and optimized
function titleCase(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}
//END version 4
    </script>
  </body>
</html>
