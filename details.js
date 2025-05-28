let count = parseInt(localStorage.getItem("cigaretteCount")) || 0;
const max = 10; 

const numberDisplay = document.querySelector('.number');
const textDisplay = document.querySelector(".text");
const btnPlus = document.querySelector('.btnPlus');
const btnMinus = document.querySelector('.btnMinus');

function updateDisplay() {
  numberDisplay.textContent = `🚬 ${count}/10`;
  textDisplay.textContent = count = 10 ? "You've hit your limit!" : "Try to smoke less, it's bad for you.";
  localStorage.setItem("cigaretteCount", count); 
}

btnPlus.addEventListener("click", () => {
  if (count < 10) count++;
  updateDisplay();
});

btnMinus.addEventListener("click", () => {
  if (count > 0) count--;
  updateDisplay();
});

updateDisplay();