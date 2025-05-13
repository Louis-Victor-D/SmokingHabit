let count = 0;
const max = 10; 

const numberDisplay = document.querySelector('.number');
const btnPlus = document.querySelector('.btnPlus');
const btnMinus = document.querySelector('.btnMinus');

function updateDisplay() {
    numberDisplay.textContent = `🚬 ${count}/10`;
}

btnPlus.addEventListener('click', () => {
    if (count < max) {
        count++;
        updateDisplay();
    }
});

btnMinus.addEventListener('click', () => {
    if (count > 0) {
        count--;
        updateDisplay();
    }
});

updateDisplay();