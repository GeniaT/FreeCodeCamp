/* Scenarios:
- the user makes a basis aperation type a * b with one digits
- same but multi digit
- the user writes a long chained operation before pushing =
- the user writes a chained operation but use = at each operation to check the result
- the user wants to CleanAll to restart his operation
- the user wants only to Clear the last inputs for correction */

//operations:

var base = null; //base represents result aswell.
var nbr = "";
var opToExecute; //add, sub, div, mult

function add(nbr) {
  base = Number(base) + Number(nbr);
}

function sub(nbr) {
  base = Number(base) - Number(nbr);
}

function mul(nbr) {
  base = Number(base) * Number(nbr);
}

function div(nbr) {
  base = Number(base) / Number(nbr);
}

function clear() {
  base = null;
  nbr = "";
}

//events
$(".number").click(function () {
  nbr += this.id;
});

$(".operation").click(function () {
  console.log(this.id);
  opToExecute = this.id;
  //base = typeof base === "undefined" ? nbr : base; //if base undefined, set it to 0
  base = base === null ? nbr : base; //if base = null,we give it the value of nbr, otherwise it keeps its same value
  if (base === null) {
    if (nbr === "") {
      base = 0;
    } else {
      base = nbr;
    }
  }

    nbr = ""; //reset of nbr now that base has a value



});

$("#clear").click(function () {
  clear();
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


//random tests

/* to do:
deal with results like "3,100000000005"
make possible to calculate results when pushing an additional operation instead of "equal"
*/
