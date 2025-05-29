const today = new Date().toISOString().split("T")[0];

let smokingData = JSON.parse(localStorage.getItem("smokingData")) || {};
let count = smokingData[today] || 0;

const max = 10;

const numberDisplay = document.querySelector('.number');
const textDisplay = document.querySelector(".text");
const btnPlus = document.querySelector('.btnPlus');
const btnMinus = document.querySelector('.btnMinus');

function updateDisplay() {
  numberDisplay.textContent = `🚬 ${count}/${max}`;
  textDisplay.textContent = count < max
    ? "Try to smoke less, it's bad for you."
    : "You've hit your limit!";
  
  smokingData[today] = count;
  localStorage.setItem("smokingData", JSON.stringify(smokingData));
}

btnPlus.addEventListener("click", () => {
  if (count < max) count++;
  updateDisplay();
});

btnMinus.addEventListener("click", () => {
  if (count > 0) count--;
  updateDisplay();
});

updateDisplay();