const colors = ["#4A89DC", "#37BC9B", "#F6BB42", "#DA4453", "#967ADC"];
const btn = document.getElementById("btn");
const color = document.querySelector(".color");

btn.addEventListener("click", changeBackgroundColor);

function changeBackgroundColor() {
  const randomNumber = getRandomNumber();
  const selectedColor = colors[randomNumber];

  document.body.style.backgroundColor = selectedColor;
  color.style.color = selectedColor;
  color.textContent = selectedColor;
}

function getRandomNumber() {
  return Math.floor(Math.random() * colors.length);
}
