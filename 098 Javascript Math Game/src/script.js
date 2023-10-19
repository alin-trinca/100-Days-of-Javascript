const operators = ["+", "-", "*"];
const startBtn = document.getElementById("start-btn");
const question = document.getElementById("question");
const controls = document.querySelector(".controls");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-msg");
let answerValue;
let operatorQuestion = false;

// Random Value Generator
const randomValue = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateQuestion = () => {
  const num1 = randomValue(1, 20);
  const num2 = randomValue(1, 20);
  const randomOperator =
    operators[Math.floor(Math.random() * operators.length)];
  const solution = eval(`${num1} ${randomOperator} ${num2}`);

  const randomVar = randomValue(1, 4);
  switch (randomVar) {
    case 1:
      answerValue = num1;
      question.innerHTML = `<input type="number" id="inputValue" placeholder="?"> ${randomOperator} ${num2} = ${solution}`;
      break;
    case 2:
      answerValue = num2;
      question.innerHTML = `${num1} ${randomOperator} <input type="number" id="inputValue" placeholder="?"> = ${solution}`;
      break;
    case 3:
      answerValue = randomOperator;
      operatorQuestion = true;
      question.innerHTML = `${num1} <input type="text" id="inputValue" placeholder="?"> ${num2} = ${solution}`;
      break;
    default:
      answerValue = solution;
      question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="inputValue" placeholder="?">`;
  }
};

const checkAnswer = () => {
  errorMessage.classList.add("hide");
  const userInput = document.getElementById("inputValue").value;
  if (userInput) {
    if (userInput == answerValue) {
      stopGame(`Yippie!! <span>Correct</span> Answer`);
    } else if (operatorQuestion && !operators.includes(userInput)) {
      errorMessage.classList.remove("hide");
      errorMessage.innerHTML = "Please enter a valid operator";
    } else {
      stopGame(`Opps!! <span>Wrong</span> Answer`);
    }
  } else {
    errorMessage.classList.remove("hide");
    errorMessage.innerHTML = "Input Cannot Be Empty";
  }
};

const startGame = () => {
  operatorQuestion = false;
  answerValue = "";
  errorMessage.innerHTML = "";
  errorMessage.classList.add("hide");
  controls.classList.add("hide");
  startBtn.classList.add("hide");
  generateQuestion();
};

const stopGame = (resultText) => {
  result.innerHTML = resultText;
  startBtn.innerText = "Play again";
  controls.classList.remove("hide");
  startBtn.classList.remove("hide");
};

startBtn.addEventListener("click", startGame);
submitBtn.addEventListener("click", checkAnswer);
