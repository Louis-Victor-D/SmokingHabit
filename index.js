const currentMonthEl = document.querySelector('.currentMonth');
const calendarGrid = document.getElementById('calendarGrid');
const prevBtn = document.getElementById('prevMonth');
const nextBtn = document.getElementById('nextMonth');

let date = new Date();
let colorMap = {}; 

prevBtn.addEventListener('click', () => changeMonth(-1));
nextBtn.addEventListener('click', () => changeMonth(1));

function renderCalendar() {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const monthName = date.toLocaleString('default', { month: 'long' });
  currentMonthEl.textContent = `${monthName} ${year}`;

  calendarGrid.innerHTML = '';
  calendarGrid.style.display = 'grid';
  calendarGrid.style.gridTemplateColumns = 'repeat(7, 1fr)';
  calendarGrid.style.gap = '4px';


  for (let day = 1; day <= lastDate; day++) {
    const cell = document.createElement('div');
    const isoDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    cell.textContent = day;
    cell.className = 'calendar-cell';

    // Highlight today
    const today = new Date();
    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    if (isToday) {
      cell.classList.add('today');
    }

    if (colorMap[isoDate]) {
      cell.style.backgroundColor = colorMap[isoDate];
    }

    cell.addEventListener('click', () => {
      const colors = ['green', 'orange', 'red', ''];
      const current = colorMap[isoDate] || '';
      const nextColor = colors[(colors.indexOf(current) + 1) % colors.length];

      if (nextColor) {
        colorMap[isoDate] = nextColor;
      } else {
        delete colorMap[isoDate];
      }
      renderCalendar();
    });

    calendarGrid.appendChild(cell);
  }
}

function changeMonth(delta) {
  date.setMonth(date.getMonth() + delta);
  renderCalendar();
}

renderCalendar();
