let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let divide = (a, b) => a / b;
let multiply = (a, b) => a * b;

let operate = (operand1, operator, operand2) => {
  if (operator === "+") return add(operand1, operand2);
  if (operator === "-") return subtract(operand1, operand2);

  // prevent overflow of floating numbers,max count of divideresult set to 5
  if (operator === "/") {
    let divideResult = divide(operand1, operand2);
    let divideResultCount = divideResult.toString().length;
    if (divideResult % 1 === divideResult) return divideResult;
    if (divideResultCount > 5) return divideResult.toFixed(5);
    return divideResult;
  }
  if (operator === "*") return multiply(operand1, operand2);
};

let firstNumber = "";
let secondNumber = "";
let operation = "";

// operator fn :1.basic swap,2.two operation assignments due to mouse=(e.target) and keyboard=(!e.target) events
function operator(e) {
  secondNumber = Number(firstNumber);
  firstNumber = "";
  if (e.target) {
    operation = e.target.getAttribute("data-value");
    return;
  }
  operation = e.getAttribute("data-value");
}

// limits the output to 11 and displays it
function valueOnScreen(e) {
  let firstNumberCount = firstNumber.toString().length;
  if (firstNumberCount > 11) return;
  if (e.target) {
    firstNumber += e.target.getAttribute("data-value");
    display.textContent = firstNumber;
    return;
  }
  firstNumber += e.getAttribute("data-value");
  display.textContent = firstNumber;
}

function reset() {
  secondNumber = "";
  operation = "";
}

// computes the whole arithmethic operation and other "=" behaviours of calculator
function equals() {
  if (firstNumber === "" || operation === "") {
    reset();
    return (display.textContent = `${Number(firstNumber)}`);
  }
  firstNumber = Number(firstNumber);
  // divison by zero
  if (firstNumber === 0 && secondNumber !== 0) return (display.textContent = "nice try pal");
  let output = operate(secondNumber, operation, firstNumber);
  let outputCount = output.toString().length;
  if (outputCount > 13) {
    output = Number(output.toString().slice(0, 13));
  }
  display.textContent = output;
  firstNumber = output;
  reset();
}

// default
let display = document.querySelector("#display-content");
display.textContent = "0";

let clearEverything = document.querySelector(`button[data-value="AC"]`);
clearEverything.addEventListener("click", () => {
  display.textContent = "0";
  firstNumber = "";
});

// backspace funtionality
function removeLast() {
  firstNumberCount = firstNumber.toString().length;
  if (firstNumberCount === 1 || firstNumber === "") {
    firstNumber = "";
    return (display.textContent = Number(firstNumber));
  }
  firstNumber = firstNumber.toString().slice(0, -1);
  display.textContent = firstNumber;
}

let backSpaceButton = document.querySelector(`button[data-value="Backspace"]`);
backSpaceButton.addEventListener("click", removeLast);

let negativeButton = document.querySelector(`button[data-value="negative"]`);
negativeButton.addEventListener("click", (e) => {
  firstNumber -= firstNumber * 2;
  display.textContent = firstNumber;
});

function dotFunction() {
  ifDot = firstNumber.toString().includes(".");
  if (ifDot) return;
  firstNumber += ".";
  display.textContent = firstNumber;
}

let dotButton = document.querySelector(`button[data-value="."]`);
dotButton.addEventListener("click", dotFunction);

let plusButton = document.querySelector(`button[data-value="+"]`);
plusButton.addEventListener("click", operator);

let minusButton = document.querySelector(`button[data-value="-"]`);
minusButton.addEventListener("click", operator);

let divideButton = document.querySelector(`button[data-value="/"]`);
divideButton.addEventListener("click", operator);

let multiplyButton = document.querySelector(`button[data-value="*"]`);
multiplyButton.addEventListener("click", operator);

// equals button
let equalsButton = document.querySelector(`button[data-value="Enter"]`);
equalsButton.addEventListener("click", equals);

let one = document.querySelector(`button[data-value="${1}"]`);
one.addEventListener("click", valueOnScreen);

let two = document.querySelector(`button[data-value="${2}"]`);
two.addEventListener("click", valueOnScreen);

let three = document.querySelector(`button[data-value="${3}"]`);
three.addEventListener("click", valueOnScreen);

let four = document.querySelector(`button[data-value="${4}"]`);
four.addEventListener("click", valueOnScreen);

let five = document.querySelector(`button[data-value="${5}"]`);
five.addEventListener("click", valueOnScreen);

let six = document.querySelector(`button[data-value="${6}"]`);
six.addEventListener("click", valueOnScreen);

let seven = document.querySelector(`button[data-value="${7}"]`);
seven.addEventListener("click", valueOnScreen);

let eight = document.querySelector(`button[data-value="${8}"]`);
eight.addEventListener("click", valueOnScreen);

let nine = document.querySelector(`button[data-value="${9}"]`);
nine.addEventListener("click", valueOnScreen);

let zero = document.querySelector(`button[data-value="${0}"]`);
zero.addEventListener("click", valueOnScreen);

// keyboard eventListeners using e.key
function keyboardDigits(e) {
  let key = document.querySelector(`button[data-value="${e.key}"]`);
  if (e.key === "/") e.preventDefault();
  if (e.key === "+" || e.key === "/" || e.key === "-" || e.key === "*") return operator(key);
  if (e.key === "Enter") return equals();
  if (e.key === "Backspace") return removeLast();
  if (e.key >= 0 || e.key <= 9) return valueOnScreen(key);
  if (e.key === "Shift") return;
  return valueOnScreen(key);
}
window.addEventListener("keydown", keyboardDigits);
