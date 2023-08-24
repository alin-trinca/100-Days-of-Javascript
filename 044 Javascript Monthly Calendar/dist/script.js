"use strict";

function createCalendar(year, month) {
  const date = new Date(year, month - 1);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; // Adjust the order of days
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const yearAndMonth = `${monthNames[date.getMonth()]} ${year}`;
  document.getElementById("info").textContent = yearAndMonth;

  const tableDays = document.getElementById("days");
  for (const day of days) {
    const td = document.createElement("td");
    td.textContent = day;
    tableDays.appendChild(td);
  }

  let firstDay = new Date(year, month - 1, 1).getDay();
  // Adjust the first day index to start with Monday
  if (firstDay === 0) {
    firstDay = 6;
  } else {
    firstDay -= 1;
  }

  const numberOfDays = new Date(year, month, 0).getDate();

  const tableDates = document.getElementById("dates");
  for (let i = 0; i < firstDay; i++) {
    const td = document.createElement("td");
    tableDates.appendChild(td);
  }

  const today = new Date();
  for (let i = 1; i <= numberOfDays; i++) {
    const td = document.createElement("td");
    td.textContent = i;
    tableDates.appendChild(td);

    if (
      year === today.getFullYear() &&
      month - 1 === today.getMonth() &&
      i === today.getDate()
    ) {
      td.classList.add("current-day");
    }

    if ((i + firstDay) % 7 === 0) {
      const tr = document.createElement("tr");
      tableDates.appendChild(tr);
    }
  }
}

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

createCalendar(currentYear, currentMonth);