"use strict";

const celsiusInput = document.getElementById("celsius");
const fahrenheitInput = document.getElementById("fahrenheit");

const convertCelsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
const convertFahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;

celsiusInput.addEventListener("input", () => {
  const celsiusValue = parseFloat(celsiusInput.value);
  const fahrenheitValue = convertCelsiusToFahrenheit(celsiusValue);
  fahrenheitInput.value = fahrenheitValue.toFixed(2);
});

fahrenheitInput.addEventListener("input", () => {
  const fahrenheitValue = parseFloat(fahrenheitInput.value);
  const celsiusValue = convertFahrenheitToCelsius(fahrenheitValue);
  celsiusInput.value = celsiusValue.toFixed(2);
});