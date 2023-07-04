let colorOne = document.getElementById("color-a");
let colorTwo = document.getElementById("color-b");
let currentDirection = "to top right";
let outputCode = document.getElementById("code");
let copyBtn = document.getElementById("copy");

function setDirection(value, _this) {
  let directions = document.querySelectorAll(".buttons button");
  for (let i of directions) {
    i.classList.remove("active");
  }
  _this.classList.add("active");
  currentDirection = value;
}

function generateCode() {
  outputCode.value = `background-image: linear-gradient(${currentDirection}, ${colorOne.value}, ${colorTwo.value})`;
  document.getElementsByTagName(
    "body"
  )[0].style.backgroundImage = `linear-gradient(${currentDirection}, ${colorOne.value}, ${colorTwo.value})`;
}

function copyText() {
  outputCode.select();
  document.execCommand("copy");
  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.innerText = "Copy"), 3000);
}

generateCode();