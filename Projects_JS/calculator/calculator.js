/* Scenarios:
- the user makes a basis aperation type a * b with one digits
- same but multi digit
- the user writes a long chained operation before pushing =
- the user writes a chained operation but use = at each operation to check the result
- the user wants to CleanAll to restart his operation
- the user wants only to Clear the last inputs for correction */

//operations:

var base = null; //base represents result aswell.
var nbr = ""; //set as a string so we can store a multi digit number as string first.
var opToExecute; //add, sub, div, mult
var opChain = []; //used for chained operations like 2+4-7x3=? ther array will be like [1,"+",3,"-",2,"x",4,"+",2,"/",3]
var userInput = []; //used to check if a =, . or special cases were pushed and behavior must be adapted.
var dotInOp = "no";

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
    opChain = [];
    lineOne("0");
    $(".lineTwo").html("");
}

function lineOne(char) {
  $(".lineOne").html(char);
}

function lineTwo(char) {
  $(".lineTwo").append(char);
}

//events
$(".number").click(function () {
  console.log(dotInOp);
  if (this.id !== ".") {
    nbr += this.id;
    lineOne(nbr);
    lineTwo(nbr);
  } else if (dotInOp === "no") { //meaning its a point
    console.log("inside");
    dotInOp = "yes";
    console.log(dotInOp);
    nbr += this.id;
    lineOne(nbr);
    lineTwo(nbr);
  }


});

$(".operation").click(function () {
    console.log(this.id);
    opToExecute = this.id;
    if (nbr !== "") {
      opChain.push(Number(nbr));//Pushing now coz the nbr has been typed
    }

    //avoid pushing in the chain multiple operation without numbers between like "add sub mul" instead of "add 2 mul 3 sub 4"
    if ((opChain[opChain.length-1] !== "add") && (opChain[opChain.length-1] !== "sub") && (opChain[opChain.length-1] !== "mul") && (opChain[opChain.length-1] !== "div")) {
      opChain.push(opToExecute);//for chained operations
      lineTwo(this.innerHTML);
      console.log(opChain);
    }


    base = base === null ? nbr : base; //if base = null,we give it the value of nbr, otherwise it keeps its same value

    //check if we are in the beginning of the operation after giving to base the nbr value.
    if (base === null && nbr === "") {
        base = 0;
    }

    nbr = ""; //reset of nbr now that base has a value

});

$("#clear").click(function () {
    clear();
});

$("#percent").click(function () {
    base = base === null ? nbr : base; //if base = null,we give it the value of nbr, otherwise it keeps its same value
    base = Number(base) / 100;

    opChain.push(base);
    console.log(opChain);
    nbr = "";//to avoid duplicate in the push with operation class

    console.log(base);
    lineOne(base);
    lineTwo("%");
})

$("#calculate").click(function () {

  if (opChain.length === 3) { //if simple operation
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
  } else { //meaning chained operations
      //via equal, we push the last nbr into the array before executing the operation
      if (nbr !== "") {
        opChain.push(Number(nbr));//Pushing now coz the nbr has been typed
      }

      //calculating divisions and multiplication and replacing  a*b or a/b by its results in the array
      while (opChain.indexOf("mul") !== (-1)) { //while we have multiplication in the array
        base = opChain[(opChain.indexOf("mul"))-1]; //we take the number around the mult operation
        nbr = opChain[(opChain.indexOf("mul"))+1];
        mul(nbr);
        opChain.splice(((opChain.indexOf("mul"))-1),3, base); //once the product is done, we modify the array like [2,"add",3, "mul",4] into [2, "add", 12]
        console.log(base);
        console.log(opChain);
      }

      //same logic but with divisions
      while (opChain.indexOf("div") !== (-1)) {
        base = opChain[(opChain.indexOf("div"))-1];
        nbr = opChain[(opChain.indexOf("div"))+1];
        div(nbr);
        opChain.splice(((opChain.indexOf("div"))-1),3, base);
        console.log(base);
        console.log(opChain);
      }


      //same logics but calculating the additions and substractions now to finish with a final result.
      while (opChain.indexOf("add") !== (-1)) {
        base = opChain[(opChain.indexOf("add"))-1];
        nbr = opChain[(opChain.indexOf("add"))+1];
        add(nbr);
        opChain.splice(((opChain.indexOf("add"))-1),3, base);
        console.log(base);
        console.log(opChain);
      }

      while (opChain.indexOf("sub") !== (-1)) {
        base = opChain[(opChain.indexOf("sub"))-1];
        nbr = opChain[(opChain.indexOf("sub"))+1];
        sub(nbr);
        opChain.splice(((opChain.indexOf("sub"))-1),3, base);
        console.log(base);
        console.log(opChain);
      }
  }

  //now that the result is know, display it on the screen
  lineOne(base);
  lineTwo("=" + base);


});


//random tests

/* to do:
- find good css for buttons
- add the rest of css for global design
- deal with  the scenario when multiple operators are clicked, the last should be taken into account

bugs on calculator example:
  2+3/2 = 2,5 but should be 3,5 as multiplication/division has priority.
  -0,12 x 11 should display 1,32 and not 1,31, the rounding rule is wrong.

*/
