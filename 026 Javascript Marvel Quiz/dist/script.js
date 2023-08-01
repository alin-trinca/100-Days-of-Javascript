const data = [
  {
    id: 1,
    question: "How many Infinity Stones are there?",
    answers: [
      { answer: "Four", isCorrect: false },
      { answer: "Five", isCorrect: false },
      { answer: "Six", isCorrect: true },
      { answer: "Seven", isCorrect: false }
    ]
  },
  {
    id: 2,
    question: "Who is Tony Stark’s father?",
    answers: [
      { answer: "Eddard Stark", isCorrect: false },
      { answer: "Howard Stark", isCorrect: true },
      { answer: "Robb Stark", isCorrect: false },
      { answer: "Ben Stark", isCorrect: false }
    ]
  },
  {
    id: 3,
    question: "Which actor voices the character of Groot?",
    answers: [
      { answer: "Dwayne Johnson", isCorrect: false },
      { answer: "Vin Diesel", isCorrect: true },
      { answer: "Jason Momoa", isCorrect: false },
      { answer: "John Cena", isCorrect: false }
    ]
  },
  {
    id: 4,
    question: "About how old is Thor?",
    answers: [
      { answer: "500", isCorrect: false },
      { answer: "1500", isCorrect: true },
      { answer: "50", isCorrect: false },
      { answer: "5000", isCorrect: false }
    ]
  },
  {
    id: 5,
    question: "Who cut Thanos head off?",
    answers: [
      { answer: "Hawkeye", isCorrect: false },
      { answer: "Scarlet Witch", isCorrect: false },
      { answer: "Doctor Strange", isCorrect: false },
      { answer: "Thor", isCorrect: true }
    ]
  }
];

const gameScreen = document.getElementsByClassName("quiz")[0];
const resultScreen = document.getElementsByClassName("result")[0];
const questionElement = document.getElementsByClassName("quiz__question")[0];
const answersContainer = document.getElementsByClassName("quiz__answers")[0];
const submitButton = document.getElementsByClassName("quiz__submit")[0];
const playButton = document.getElementsByClassName("play")[0];
const alert = document.getElementById("alert");

let questionIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let selectedAnswer;

playButton.addEventListener("click", playGame);
submitButton.addEventListener("click", submitAnswer);

function playGame() {
  resetGame();
  updateScreen(gameScreen, resultScreen);
  showQuestion(questionIndex);
}

function submitAnswer() {
  if (selectedAnswer !== null) {
    selectedAnswer === "true" ? correctCount++ : wrongCount++;
    questionIndex++;
    showQuestion(questionIndex);
    alert.hidden = true;
  } else {
    alert.textContent = "Please select an option!";
    alert.hidden = false;
  }
}

function resetGame() {
  questionIndex = 0;
  correctCount = 0;
  wrongCount = 0;
}

function showQuestion(qNumber) {
  if (questionIndex === data.length) return showResult();

  selectedAnswer = null;

  const { question, answers } = data[qNumber];
  questionElement.textContent = question;
  answersContainer.innerHTML = answers
    .map(
      (item, index) =>
        `
            <div class="quiz__answer">
                <input type="radio" id=${index} name="answer" value=${item.isCorrect} />
                <label for="${index}">${item.answer}</label>
            </div>
        `
    )
    .join("");

  selectAnswer();
}

function selectAnswer() {
  answersContainer.querySelectorAll("input").forEach((el) => {
    el.addEventListener("click", (e) => {
      selectedAnswer = e.target.value;
    });
  });
}

function showResult() {
  updateScreen(resultScreen, gameScreen);

  resultScreen.getElementsByClassName(
    "correct"
  )[0].textContent = `Correct Answers: ${correctCount}`;
  resultScreen.getElementsByClassName(
    "wrong"
  )[0].textContent = `Wrong Answers: ${wrongCount}`;
  resultScreen.getElementsByClassName("score")[0].textContent = `Score: ${
    (correctCount - wrongCount) * 10
  }`;
}

function updateScreen(screenToShow, screenToHide) {
  screenToShow.style.display = "block";
  screenToHide.style.display = "none";
}

// Show first question
showQuestion(questionIndex);