/* Scenarios:
- the user makes a basis aperation type a * b
- the user writes a long chained operation before pushing =
- the user writes a chained operation but use = at each operation to check the result
- the user wants to CleanAll to restart his operation
- the user wants only to Clear the last inputs for correction */

//operations:

var base; //base represents result aswell.
var nbr;
var opToExecute; //add, sub, div, mult


function add(nbr) {
  //var basis = typeof basis === "undefined" ? base : basis;
  base = base + nbr;
}

function sub(nbr) {
  //var basis = typeof basis === "undefined" ? base : basis;
  base = base - nbr;
}

function mul(nbr) {
  //var basis = typeof basis === "undefined" ? base : basis;
  base = base * nbr;
}

function div(nbr) {
  //var basis = typeof basis === "undefined" ? base : basis;
  base = base / nbr;
}

function CleanAll() {
  base = 0;
}

//events
$(".number").click(function () {

  nbr = parseInt(this.id);
  console.log(nbr);

  base = typeof base === "undefined" ? nbr : base; //if base undefined, set it to nbr s
  console.log(base);
});

$(".operation").click(function () {
  console.log(this.id);
  opToExecute = this.id;
  base = typeof base === "undefined" ? 0 : base; //if base undefined, set it to 0
});

$("#calculate").click(function () {

  if (opToExecute === "add") {
    add(nbr);
    console.log(base); //result
  } else if (opToExecute === "sub") {
    sub(nbr);
    console.log(base); //result
  } else if (opToExecute === "mul") {
    mul(nbr);
    console.log(base); //result
  } else if (opToExecute === "div") {
    div(nbr);
    console.log(base); //result
  }
});
//tests...

/*
add(20);
console.log(base);
sub(10);
console.log(base);
mul(2);
console.log(base);
div(2);
console.log(base);
div(2);
console.log(base);
*/
