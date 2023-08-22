const number = document.getElementById("number");
const generateBtn = document.getElementById("generateBtn");

const randomNumberGenerator = () => {
  const randomNumber = Math.floor(Math.random() * 10 + 1);
  number.textContent = randomNumber;
};

generateBtn.addEventListener("click", randomNumberGenerator);

randomNumberGenerator();