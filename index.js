const currentMonthEl = document.querySelector('.currentMonth');
const calendarGrid = document.getElementById('calendarGrid');
const prevBtn = document.getElementById('prevMonth');
const nextBtn = document.getElementById('nextMonth');
const legendEl = document.getElementById('smokingLegend');

let date = new Date();
const dailyMax = 10;
const weeklyMax = dailyMax * 7;

prevBtn.addEventListener('click', () => changeMonth(-1));
nextBtn.addEventListener('click', () => changeMonth(1));

function getColorForCount(count) {
  if (count === 0) return 'green';
  if (count < dailyMax) return 'orange';
  return 'red';
}

function getSmokingData() {
  return JSON.parse(localStorage.getItem("smokingData")) || {};
}

function getSmokingDataColorMap(data) {
  const map = {};
  for (const [day, count] of Object.entries(data)) {
    map[day] = getColorForCount(count);
  }
  return map;
}

function getStartOfWeek(date) {
  const day = new Date(date);
  const dayOfWeek = day.getDay();
  day.setDate(day.getDate() - dayOfWeek);
  day.setHours(0, 0, 0, 0);
  return day;
}

function getSummaryCounts(data) {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();

  const startOfWeek = getStartOfWeek(today);

  let dayCount = 0, weekCount = 0, monthCount = 0;

  for (const [key, count] of Object.entries(data)) {
    const d = new Date(key);
    if (key === todayStr) {
      dayCount = count;
    }

    if (d >= startOfWeek && d <= today) {
      weekCount += count;
    }

    if (d.getFullYear() === thisYear && d.getMonth() === thisMonth) {
      monthCount += count;
    }
  }

  const daysInMonth = new Date(thisYear, thisMonth + 1, 0).getDate();
  const monthlyMax = dailyMax * daysInMonth;

  return {
    dayCount,
    weekCount,
    monthCount,
    weeklyMax,
    monthlyMax
  };
}

function updateLegend(data) {
  const {
    dayCount,
    weekCount,
    monthCount,
    weeklyMax,
    monthlyMax
  } = getSummaryCounts(data);

  document.getElementById("dayCountLabel").textContent = `${dayCount} / ${dailyMax}`;
  document.getElementById("weekCountLabel").textContent = `${weekCount} / ${weeklyMax}`;
  document.getElementById("monthCountLabel").textContent = `${monthCount} / ${monthlyMax}`;

  function updateBar(barId, value, max) {
    const bar = document.getElementById(barId);
    const percent = Math.min(100, (value / max) * 100);
    bar.style.width = percent + "%";

    if (percent === 0) {
      bar.style.backgroundColor = "green";
    } else if (percent < 100) {
      bar.style.backgroundColor = "orange";
    } else {
      bar.style.backgroundColor = "red";
    }
  }

  updateBar("dayBar", dayCount, dailyMax);
  updateBar("weekBar", weekCount, weeklyMax);
  updateBar("monthBar", monthCount, monthlyMax);
}

function renderCalendar() {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const monthName = date.toLocaleString('default', { month: 'long' });
  currentMonthEl.textContent = `${monthName} ${year}`;

  const smokingData = getSmokingData();
  const smokingColorMap = getSmokingDataColorMap(smokingData);

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

  updateLegend(smokingData);
}

function changeMonth(delta) {
  date.setMonth(date.getMonth() + delta);
  renderCalendar();
}

renderCalendar();
