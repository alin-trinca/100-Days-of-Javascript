const billInput = document.getElementById("bill");
const tipInput = document.getElementById("tip");
const noOfPeopleInput = document.getElementById("no-of-people");
const tipAmountOutput = document.getElementById("tip-amount");
const totalAmountOutput = document.getElementById("total-amount");
const tipPercentOutput = document.getElementById("tip-percent");
const splitNumOutput = document.getElementById("split-num");
const tipPerPersonOutput = document.getElementById("tip-per-person");
const totalPerPersonOutput = document.getElementById("total-per-person");

const sliders = document.querySelectorAll("input[type='range']");

sliders.forEach(function (slider) {
  slider.addEventListener("input", calculateTip);
});

billInput.addEventListener("input", calculateTip);
tipInput.addEventListener("input", calculateTip);
noOfPeopleInput.addEventListener("input", calculateTip);

function calculateTip() {
  const bill = parseFloat(billInput.value);
  const tipPercent = parseFloat(tipInput.value);
  const noOfPeople = parseInt(noOfPeopleInput.value);

  const totalTip = (bill * (tipPercent / 100)).toFixed(2);
  const total = (bill + parseFloat(totalTip)).toFixed(2);
  const tipPerPerson = (totalTip / noOfPeople).toFixed(2);
  const totalPerPerson = (total / noOfPeople).toFixed(2);

  billInput.value = bill.toFixed(2);

  tipAmountOutput.textContent = `${totalTip} €`;
  totalAmountOutput.textContent = `${total} €`;
  tipPercentOutput.textContent = `${tipPercent}%`;
  splitNumOutput.textContent = noOfPeople;
  tipPerPersonOutput.textContent = `${tipPerPerson} €`;
  totalPerPersonOutput.textContent = `${totalPerPerson} €`;
}

calculateTip();