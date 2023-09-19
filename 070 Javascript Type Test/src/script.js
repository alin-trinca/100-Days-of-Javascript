const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");
const timerDisplay = document.getElementById("timer");
const mistakesDisplay = document.getElementById("mistakes");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const resultDiv = document.querySelector(".result");
const startButton = document.getElementById("start-test");
const stopButton = document.getElementById("stop-test");

let quote = "";
let time = 60;
let timer = null;
let mistakes = 0;

// Display random quotes
const renderNewQuote = async () => {
  const response = await fetch(quoteApiUrl);
  const data = await response.json();
  quote = data.content;

  const charArray = quote.split("").map((char) => {
    return `<span class='quote-chars'>${char}</span>`;
  });

  quoteSection.innerHTML = charArray.join("");
};

// Compare user input with the quote
userInput.addEventListener("input", () => {
  const quoteChars = document.querySelectorAll(".quote-chars");
  const userInputChars = userInput.value.split("");

  quoteChars.forEach((char, index) => {
    if (char.innerText == userInputChars[index]) {
      char.classList.add("success");
    } else if (userInputChars[index] == null) {
      char.classList.remove("fail", "success");
    } else {
      if (!char.classList.contains("fail")) {
        mistakes++;
        char.classList.add("fail");
      }
      mistakesDisplay.innerText = mistakes;
    }

    const allCorrect = [...quoteChars].every((element) => {
      return element.classList.contains("success");
    });

    if (allCorrect) {
      displayResult();
    }
  });
});

// Update timer
function updateTimer() {
  if (time === 0) {
    displayResult();
  } else {
    timerDisplay.innerText = `${--time}s`;
  }
}

// Set timer
const timeReduce = () => {
  time = 60;
  timer = setInterval(updateTimer, 1000);
};

// End test
const displayResult = () => {
  resultDiv.style.display = "block";
  clearInterval(timer);
  stopButton.style.display = "none";
  userInput.disabled = true;

  const timeTaken = time === 0 ? 1 : (60 - time) / 100;

  wpmDisplay.innerText = `${(userInput.value.length / 5 / timeTaken).toFixed(
    2
  )}wpm`;
  accuracyDisplay.innerText = `${Math.round(
    ((userInput.value.length - mistakes) / userInput.value.length) * 100
  )}%`;
};

// Start test
const startTest = () => {
  mistakes = 0;
  timer = null;
  userInput.disabled = false;
  timeReduce();
  startButton.style.display = "none";
  stopButton.style.display = "block";
};

window.onload = () => {
  userInput.value = "";
  startButton.style.display = "block";
  stopButton.style.display = "none";
  userInput.disabled = true;
  renderNewQuote();
};
