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
  base = Math.round((Number(base) + Number(nbr))*1000) / 1000;
}

function sub(nbr) {
  base = Math.round((Number(base) - Number(nbr))*1000) / 1000;
}

function mul(nbr) {
  base = Math.round(((Number(base) * Number(nbr))*1000)) / 1000;
}

function div(nbr) {
  base = Math.round(((Number(base) / Number(nbr))*1000)) / 1000;
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

  base = base === null ? nbr : base; //if base = null,we give it the value of nbr, otherwise it keeps its same value
  //check if we are in the beginning of the operation
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

$("#percent").click(function () {
  base = base === null ? nbr : base; //if base = null,we give it the value of nbr, otherwise it keeps its same value
  base = Number(base) / 100;
  console.log(base);
})

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
  } else if (opToExecute === "percent") {
    percent(nbr);
    console.log(base);
  }
});


//random tests

/* to do:
make possible to calculate results when pushing an additional operation instead of "equal"
*/
