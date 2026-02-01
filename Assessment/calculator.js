
const display = document.getElementById('display');

//Append input to the display//
function appendToDisplay(input) {
    if (display.innerText === "0" || display.innerText === "Error") {
        display.innerText = input;
    } else {
        display.innerText += input;
    }
}
//Clear the display//
function clearDisplay() {
    display.innerText = "0";
}

//Delete the last character from the display//
function deleteLast() {
    if (display.innerText.length > 1) {
        display.innerText = display.innerText.slice(0, -1);
    } else {
        display.innerText = "0";
    }
}

//Calculate the result and update the display//
function calculate() {
    try {
        // eval handles *, /, +, -, and ** (power)
        let result = eval(display.innerText);
        display.innerText = Number.isInteger(result) ? result : result.toFixed(4);
    } catch (e) {
        display.innerText = "Error";
    }
}