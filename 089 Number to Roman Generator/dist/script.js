// Get DOM elements
const input = document.getElementById("input");
const button = document.getElementById("submit");
const errorMessage = document.getElementById("error");
const output = document.getElementById("output");

// Roman numeral object
const romanObject = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  XXX: 30,
  XX: 20,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1
};

// Add event listener to the button
button.addEventListener("click", () => {
  const inputValue = input.value.trim();

  if (isValidInput(inputValue)) {
    const result = convertToRoman(parseInt(inputValue));
    output.innerHTML = result;
    errorMessage.innerHTML = "";
  } else {
    errorMessage.innerHTML = "Invalid Input";
    output.innerHTML = "";
  }

  input.value = "";
});

// Function to validate input
function isValidInput(inputValue) {
  const number = parseInt(inputValue);
  return !isNaN(number) && number >= 1 && number <= 9999;
}

// Function to convert number to Roman numeral
function convertToRoman(num) {
  let result = "";
  const romanValues = Object.keys(romanObject);

  romanValues.forEach((key) => {
    while (romanObject[key] <= num) {
      num -= romanObject[key];
      result += key;
    }
  });

  return result;
}