const numberEl = document.getElementsByClassName("number");
const operatorEl = document.getElementsByClassName("operator");
const input = document.getElementById("input");

input.value = 0;
let firstValue = "";
let secondValue = "";
let selectedOperator = "";
let lastEnteredChar = "";

function numbers(e) {
  if (lastEnteredChar == "=") {
    input.value = e.innerHTML;
    lastEnteredChar = e.innerHTML;
    return;
  }
  if (input.value == "0") {
    if (e.innerHTML != ".") {
      input.value = e.innerHTML;
    } else {
      input.value += e.innerHTML;
    }
  } else {
    let lastOperatorIndex = getLastOperatorIndex(input.value);
    let lastValuePart = input.value.substring(lastOperatorIndex + 1);
    if (e.innerHTML == "." && lastValuePart.includes(".")) return;

    if (lastValuePart.includes(".")) {
      let subtext = lastValuePart.substring(lastValuePart.lastIndexOf(".") + 1);
      if (subtext.length < 6) {
        input.value += e.innerHTML;
      }
    } else {
      input.value += e.innerHTML;
    }
  }
  lastEnteredChar = e.innerHTML;
}

function getLastOperatorIndex(text) {
  let lastIndex = -1;
  if (text.lastIndexOf("-") > lastIndex) {
    lastIndex = text.lastIndexOf("-");
  }
  if (text.lastIndexOf("+") > lastIndex) {
    lastIndex = text.lastIndexOf("+");
  }
  if (text.lastIndexOf("*") > lastIndex) {
    lastIndex = text.lastIndexOf("*");
  }
  if (text.lastIndexOf("/") > lastIndex) {
    lastIndex = text.lastIndexOf("/");
  }

  return lastIndex;
}

function isOperator(ch) {
  if (
    ch.trim() == "-" ||
    ch.trim() == "+" ||
    ch.trim() == "*" ||
    ch.trim() == "/"
  ) {
    return true;
  }

  return false;
}

function clearAll() {
  input.value = "0";
  selectedOperator = "";
  firstValue = "";
  secondValue = "";
  lastEnteredChar = "0";
}

function operators(e) {
  let operator = e.innerHTML.trim();
  if (lastEnteredChar == "=" && operator == "=") return;
  if (operator == "=" && !(firstValue && selectedOperator && !secondValue)) {
    let second = input.value.substring(
      input.value.indexOf(selectedOperator) + 1
    );
    if (!second) {
      return;
    }
  }

  if (!firstValue) {
    firstValue = input.value;
    selectedOperator = operator;
    if (operator == "=") return;
    input.value += operator;
    secondValue = "";
    return;
  } else if (firstValue && selectedOperator && !secondValue) {
    let second = input.value.substring(
      input.value.indexOf(selectedOperator) + 1
    );
    if (!second) {
      return;
    }

    secondValue = second;
    let calculatedValue = calculate(firstValue, secondValue, selectedOperator);
    if (calculatedValue % 1 != 0) {
      calculatedValue = calculatedValue.toFixed(6);
    }
    input.value = calculatedValue;
    firstValue = calculatedValue;

    if (operator == "=") {
      selectedOperator = "";
      input.value = firstValue;
    } else {
      selectedOperator = operator;
      input.value = firstValue + operator;
    }

    secondValue = "";
  } else if (firstValue && !selectedOperator) {
    selectedOperator = operator;
    input.value += operator;
  }
  lastEnteredChar = operator;
}

function del() {
  let lastChar = input.value.substring(input.value.length - 1);
  if (!selectedOperator) {
    input.value = input.value.slice(0, input.value.length - 1);
    firstValue = input.value;
  } else if (selectedOperator && isOperator(lastChar)) {
    input.value = input.value.slice(0, input.value.length - 1);
    firstValue = "";
    selectedOperator = "";
  } else if (selectedOperator && !isOperator(lastChar)) {
    input.value = input.value.slice(0, input.value.length - 1);
  }
  if (input.value.length == "0") {
    input.value = "0";
  }
  lastEnteredChar = input.value.substring(input.value.length - 1);
}

// function del() {
//   let lastChar = input.value.substring(input.value.length - 1);
//   let lastOperatorIndex = getLastOperatorIndex(input.value);

//   if (lastOperatorIndex == -1) {
//     input.value = input.value.slice(0, input.value.length - 1);
//   } else if (lastOperatorIndex > -1 && isOperator(lastChar)) {
//     input.value = input.value.slice(0, input.value.length - 1);
//     firstValue = null;
//     selectedOperator = null;
//   } else if (lastOperatorIndex > -1 && !isOperator(lastChar)) {
//     input.value = input.value.slice(0, input.value.length - 1);
//   }

//   if (input.value.length == "0") {
//     input.value = "0";
//   }
// }

// Senaryo 1 Sadece (Sayı olma durumu)
// ekranda sadece sayı var bu durumda
// firstValue Empty,
// secondValue Empty
// opertor Empty

// Senaryo 2 (sayı ve opertor olmas durumu)
// ekranda sayıve operator var bu durumda
// firstValue Filled,
// secondValue Empty
// opertor Filled

// Senaryo 3 (iki sayı ve oerator olmas durumu)
// ekranda sayıve operator ve tekrar sayı var bu durumda
// firstValue Filled,
// secondValue Empty
// opertor Filled

// Senaryo 4
// ekranda sayıve operator ve tekrar sayı varken herhangi bir opertore basdığı durum
// firstValue Filled,
// secondValue Empty
// opertor Filled

/*
function operators(e) {
  handleOperator(e.innerHTML);
  input.value += e.innerHTML;
}

function handleOperator(nextOperator) {
  if (selectedOperator && secondValue) {
    selectedOperator = nextOperator;
    return;
  }
  if (firstValue === "") {
    firstValue = input.value;
  } else if (selectedOperator) {
    const result = calculate(firstValue, input.value, selectedOperator);
    input.value = result;
    firstValue = result;
  }
  secondValue = true;
  selectedOperator = nextOperator;
}
*/
function calculate(firstValue, secondValue, selectedOperator) {
  firstValue = parseFloat(firstValue);
  secondValue = parseFloat(secondValue);

  if (selectedOperator === "+") {
    return firstValue + secondValue;
  } else if (selectedOperator === "-") {
    return firstValue - secondValue;
  } else if (selectedOperator === "*") {
    return firstValue * secondValue;
  } else if (selectedOperator === "/") {
    return firstValue / secondValue;
  }
}
