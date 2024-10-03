const resultElement= document.getElementById("result");
const clearBtn = document.getElementById("clear-button");
const deleteBtn = document.getElementById("delete-button");
const divideBtn = document.getElementById("divide-button");
const multiplyBtn = document.getElementById("multiply-button");
const addBtn = document.getElementById("add-button");
const subtractBtn = document.getElementById("subtract-button");
const decimalBtn = document.getElementById("decimal-button");
const equalBtn = document.getElementById("equal-button");
const numberBtns = document.querySelectorAll(".number");

let result = "";
let operation = "";
let previousOperand = 0;

const appendnumber = (number) =>{
    if (number === "." && result.includes(".")){
        return;
    }
    result += number;
    updateDisplay();
}

const updateDisplay = () => {
    if(operation){
    resultElement.innerText = `${previousOperand} ${operation} ${result}`;
    }
    else{
        resultElement.innerText = result;
    }
}

 const selectOperator = (operatorvalue) =>{
    if (result ==="") return;

    else if (operation !== "" && previousOperand !== ""){
        calculateResult();
    }
    operation = operatorvalue;
    previousOperand = result;
    result = "";
    updateDisplay();
}

const calculateResult = () =>{
      let evaluateResult;
      const prev = parseFloat (previousOperand);
      const current = parseFloat (result);
    console.log(prev,current)
      if(isNaN(prev) || isNaN(current)) return;

      switch(operation){
        case "+":
            evaluateResult = prev + current;
            break;
        
        case "-":
            evaluateResult = prev - current;
            break;
        
        case "*":
            evaluateResult = prev * current;
            break;
        
        case "/":
            evaluateResult = prev / current;
            break;
        
        default:
            return;
    }
    result = evaluateResult.toString();
    operation = "";
    previousOperand = "";
}

numberBtns.forEach(button => {
    button.addEventListener("click", ()=>{
    appendnumber(button.innerText);
    });
});

const clearDisplay = () =>{
    result="";
    previousOperand = "";
    operation="";
    updateDisplay();
}

const deleteLastDigit =() =>{
    if(result=== "" || operation !== ""){
        operation = ""
        // operation = operation.slice(0,-1);
    }
    else if(result !== ""){
        result = result.slice(0,-1);
    }
    // operation = operation.slice(0,-1);
    updateDisplay();

}

decimalBtn.addEventListener("click", () => appendnumber("."));
addBtn.addEventListener("click", () => selectOperator("+"));
subtractBtn.addEventListener("click", () => selectOperator("-"));
divideBtn.addEventListener("click", () => selectOperator("/"));
multiplyBtn.addEventListener("click", () => selectOperator("*"));
equalBtn.addEventListener("click",()=>{
    if (result === "" || operation === "") return;
    calculateResult();
    updateDisplay();
});
deleteBtn.addEventListener("click",deleteLastDigit);
clearBtn.addEventListener("click",clearDisplay)