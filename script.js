const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let resultDisplayed = false;

function updateDisplay() {
  display.textContent = currentInput || "0";
}

function calculate() {
  try {
    currentInput = eval(currentInput).toString();
  } catch {
    currentInput = "Error";
  }
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (value === "C") {
      currentInput = "";
    } else if (value === "+-") {
      if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString();
      }
    } else if (value === "=") {
      calculate();
      resultDisplayed = true;
    } else {
      if (resultDisplayed && !isNaN(value)) {
        currentInput = value;
      } else {
        currentInput += value;
      }
      resultDisplayed = false;
    }

    updateDisplay();
  });
});

// Keyboard Support
document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (!isNaN(key) || "+-*/.%".includes(key)) {
    currentInput += key;
  } else if (key === "Enter") {
    calculate();
    resultDisplayed = true;
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
  } else if (key.toLowerCase() === "c") {
    currentInput = "";
  }
  updateDisplay();
});
