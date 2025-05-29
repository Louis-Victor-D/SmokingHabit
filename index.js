const currentMonthEl = document.querySelector('.currentMonth');
const calendarGrid = document.getElementById('calendarGrid');
const prevBtn = document.getElementById('prevMonth');
const nextBtn = document.getElementById('nextMonth');

let date = new Date();
const max = 10;

prevBtn.addEventListener('click', () => changeMonth(-1));
nextBtn.addEventListener('click', () => changeMonth(1));

function getColorForCount(count) {
  if (count === 0) return 'green';
  if (count < max) return 'orange';
  return 'red';
}

function getSmokingDataColorMap() {
  const data = JSON.parse(localStorage.getItem("smokingData")) || {};
  const map = {};

  for (const [day, count] of Object.entries(data)) {
    map[day] = getColorForCount(count);
  }

  return map;
}

function renderCalendar() {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const monthName = date.toLocaleString('default', { month: 'long' });
  currentMonthEl.textContent = `${monthName} ${year}`;

  const smokingColorMap = getSmokingDataColorMap();

  calendarGrid.innerHTML = '';
  calendarGrid.style.display = 'grid';
  calendarGrid.style.gridTemplateColumns = 'repeat(7, 1fr)';
  calendarGrid.style.gap = '4px';

  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-cell';
    calendarGrid.appendChild(emptyCell);
  }

  for (let day = 1; day <= lastDate; day++) {
    const cell = document.createElement('div');
    const isoDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    cell.textContent = day;
    cell.className = 'calendar-cell';

    const today = new Date();
    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    if (isToday) {
      cell.classList.add('today');
    }

    const color = smokingColorMap[isoDate];
    if (color) {
      cell.style.backgroundColor = color;
    }

    calendarGrid.appendChild(cell);
  }
}

function changeMonth(delta) {
  date.setMonth(date.getMonth() + delta);
  renderCalendar();
}

renderCalendar();
