// Function to calculate age
const calculateAge = () => {
  // Get today's date
  const today = new Date();

  // Get the input birthdate from the user
  const inputDate = new Date(document.getElementById("date-input").value);

  // Extract birth details (day, month, year)
  const birthDetails = {
    date: inputDate.getDate(),
    month: inputDate.getMonth() + 1, // Months are 0-indexed
    year: inputDate.getFullYear()
  };

  // Get current date details
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();

  // Check if the birthdate is in the future
  if (isFutureDate(birthDetails, currentYear, currentMonth, currentDate)) {
    alert("Not Born Yet");
    displayResult("-", "-", "-");
    return;
  }

  // Calculate age
  const { years, months, days } = calculateAgeDetails(
    birthDetails,
    currentYear,
    currentMonth,
    currentDate
  );

  // Display the age
  displayResult(days, months, years);
};

// Function to check if the birthdate is in the future
const isFutureDate = (birthDetails, currentYear, currentMonth, currentDate) => {
  return (
    birthDetails.year > currentYear ||
    (birthDetails.year === currentYear &&
      (birthDetails.month > currentMonth ||
        (birthDetails.month === currentMonth &&
          birthDetails.date > currentDate)))
  );
};

// Function to calculate age details (years, months, days)
const calculateAgeDetails = (
  birthDetails,
  currentYear,
  currentMonth,
  currentDate
) => {
  let years = currentYear - birthDetails.year;
  let months, days;

  if (currentMonth < birthDetails.month) {
    years--;
    months = 12 - (birthDetails.month - currentMonth);
  } else {
    months = currentMonth - birthDetails.month;
  }

  if (currentDate < birthDetails.date) {
    months--;
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const daysInLastMonth = getDaysInMonth(lastMonth, currentYear);
    days = daysInLastMonth - (birthDetails.date - currentDate);
  } else {
    days = currentDate - birthDetails.date;
  }

  return { years, months, days };
};

// Function to get the number of days in a month
const getDaysInMonth = (month, year) => {
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysInMonth = [
    31, // January
    isLeapYear ? 29 : 28, // February
    31, // March
    30, // April
    31, // May
    30, // June
    31, // July
    31, // August
    30, // September
    31, // October
    30, // November
    31 // December
  ];
  return daysInMonth[month - 1]; // Adjust for 0-based index
};

// Function to display the age
const displayResult = (bdate, bMonth, bYear) => {
  document.getElementById("years").textContent = bYear;
  document.getElementById("months").textContent = bMonth;
  document.getElementById("days").textContent = bdate;
};

// Attach the calculateAge function to the button click event
document.getElementById("calc-age-btn").addEventListener("click", calculateAge);
