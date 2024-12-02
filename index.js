const output = document.getElementById("output");
const buttons = document.querySelectorAll(".btn");
const calc = document.querySelector(".equal");
const del = document.querySelector(".del");
const reset = document.querySelector(".reset");
const body = document.getElementsByName("body");
const color2 = document.querySelectorAll(".color-2");
const color3 = document.querySelectorAll(".num");
const keypad = document.querySelector(".keypad");
document.querySelector(".switch").addEventListener("click", function () {
  let currentState = parseInt(localStorage.getItem("themeState") || "0");
  let nextState = (currentState + 1) % 3; // Cycle through 0, 1, 2
  this.setAttribute("data-state", nextState);
  localStorage.setItem("themeState", nextState);

  applyTheme(nextState);
});

function applyTheme(state) {
  if (state === 0) {
    document.body.style.backgroundColor = 'hsl(222, 26%, 31%)';
    color2.forEach((color) => {
      color.style.color = 'hsl(0, 0%, 100%)';
    });
    color3.forEach((color) => {
      color.style.color = 'hsl(221, 14%, 31%)';
      color.style.backgroundColor = 'hsl(30, 25%, 89%)';
      color.style.boxShadow = '0 2px 0px 0px hsl(28, 16%, 65%)';
    });
    output.style.backgroundColor = 'hsl(224, 36%, 15%)';
    reset.style.backgroundColor = 'hsl(225, 21%, 49%)';
    reset.style.color = 'hsl(0, 0%, 100%)';
    reset.style.boxShadow = '0 2px 0px 0px hsl(224, 28%, 35%)';
    del.style.backgroundColor = 'hsl(225, 21%, 49%)';
    del.style.boxShadow = '0 2px 0px 0px hsl(224, 28%, 35%)';
    calc.style.backgroundColor = 'hsl(6, 63%, 50%)';
    calc.style.color = 'hsl(0, 0%, 100%)';
    calc.style.boxShadow = '0 2px 0px 0px hsl(6, 70%, 34%)';
    keypad.style.backgroundColor = 'hsl(223, 31%, 20%)';
  } else if (state === 1) {
    document.body.style.backgroundColor = 'hsl(0, 0%, 90%)';
    color2.forEach((color) => {
      color.style.color = 'hsl(60, 10%, 19%)';
    });
    color3.forEach((color) => {
      color.style.color = 'hsl(60, 10%, 19%)';
      color.style.backgroundColor = 'hsl(45, 7%, 89%)';
      color.style.boxShadow = '0 2px 0px 0px hsl(35, 11%, 61%)';
    });
    output.style.backgroundColor = 'hsl(0, 0%, 93%)';
    reset.style.backgroundColor = 'hsl(185, 42%, 37%)';
    reset.style.color = 'hsl(0, 0%, 100%)';
    reset.style.boxShadow = '0 2px 0px 0px hsl(185, 58%, 25%)';
    del.style.backgroundColor = 'hsl(185, 42%, 37%)';
    del.style.boxShadow = '0 2px 0px 0px hsl(185, 58%, 25%)';
    calc.style.backgroundColor = 'hsl(25, 98%, 40%)';
    calc.style.color = 'hsl(0, 0%, 100%)';
    calc.style.boxShadow = '0 2px 0px 0px hsl(25, 99%, 27%)';
    keypad.style.backgroundColor = 'hsl(0, 5%, 81%)';
  } else if (state === 2) {
    document.body.style.backgroundColor = 'hsl(268, 75%, 9%)'; 
    color2.forEach((color) => {
      color.style.color = 'hsl(52, 100%, 62%)';
    });
    output.style.backgroundColor = 'hsl(268, 71%, 12%)';
    color3.forEach((color) => {
      color.style.backgroundColor = 'hsl(268, 47%, 21%)';
      color.style.boxShadow = '0 2px 0px 0px hsl(290, 70%, 36%)';
    });
    reset.style.backgroundColor = 'hsl(281, 89%, 26%)';
    reset.style.boxShadow = '0 2px 0px 0px hsl(285, 91%, 52%)';
    del.style.backgroundColor = 'hsl(281, 89%, 26%)';
    del.style.boxShadow = '0 2px 0px 0px hsl(285, 91%, 52%)';
    calc.style.backgroundColor = 'hsl(176, 100%, 44%)';
    calc.style.boxShadow = '0 2px 0px 0px hsl(177, 92%, 70%)';
    calc.style.color = 'hsl(198, 20%, 13%)';
    keypad.style.backgroundColor = 'hsl(268, 71%, 12%)';
  }
}

// Apply the saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
  let savedState = parseInt(localStorage.getItem("themeState") || "0");
  document.querySelector(".switch").setAttribute("data-state", savedState);
  applyTheme(savedState);
});


buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const value = this.textContent.trim();
    let currentOutput = output.textContent.trim();

    if (/[0-9]/.test(value)) {
      // If it's a number
      if (currentOutput === '0' || currentOutput === 'Error') {
        output.textContent = value;
      } else {
        const parts = currentOutput.split(/([+\-x/])/);
        let lastPart = parts.pop() || '';
        lastPart = (lastPart + value).replace(/,/g, '');
        parts.push(formatNumber(lastPart));
        output.textContent = parts.join('');
      }
    } else if (value === '.') {
      // Handle decimal point
      const parts = currentOutput.split(/([+\-x/])/);
      let lastPart = parts.pop() || '0';
      if (!lastPart.includes('.')) {
        lastPart += '.';
        parts.push(lastPart);
        output.textContent = parts.join('');
      }
    } else if (/[+\-x/]/.test(value)) {
      // If it's an operator
      if (currentOutput === '' || currentOutput === 'Error') {
        if (value === '-') output.textContent = value;
      } else {
        const lastChar = currentOutput.slice(-1);
        if (/[+\-x/]/.test(lastChar)) {
          output.textContent = currentOutput.slice(0, -1) + value;
        } else {
          output.textContent += `${value} `;
        }
      }
    }
  });
});

function formatNumber(num) {
  const parts = num.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

calc.addEventListener("click", () => {
  try {
      // Replace x with * for multiplication and remove commas for evaluation
      const expression = output.textContent.replace(/x/g, '*').replace(/,/g, '');
      const result = eval(expression);
      output.textContent = result.toLocaleString(undefined, { maximumFractionDigits: 20 }); // Display the result with commas
  } catch (error) {
      output.textContent = "Error";
  }
});

del.addEventListener("click", () => {
  let currentValue = output.textContent.trim();
  if (/[\+\-\x\/] $/.test(currentValue)) {
      // If the last character is an operator, remove it entirely
      currentValue = currentValue.slice(0, -3);
  } else {
      // Otherwise, remove the last character and reformat numbers
      const parts = currentValue.split(/([\+\-\x\/])/); // Split by operators
      let lastPart = parts.pop(); // Extract the last part
      lastPart = lastPart.replace(/,/g, '').slice(0, -1); // Remove last digit
      parts.push(lastPart); // Push the updated number
      currentValue = parts.join('');
  }
  output.textContent = currentValue || '';
});

reset.addEventListener("click", () => {
  output.textContent = "";
});
