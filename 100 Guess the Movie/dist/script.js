const moviesObject = {
  "👸👹🌹": "Beauty And The Beast",
  "🧙👓⚡": "Harry Potter",
  "🦇🃏 ": "Joker",
  "👩‍❤️‍👨🚢🥶": "Titanic",
  "👻👻🔫": "Ghostbusters",
  "🐜👨 ": "Antman",
  "🐀👨‍🍳 ": "Ratatouille",
  "🖊️📓👩‍❤️‍👨": "The Notebook",
  "😈👗👠": "Devil Wears Prada",
  "🤥🦗 ": "Pinocchio",
  "🎄😠🟢": "The Grinch",
  "🔍🐟 ": "Finding Nemo",
  "🌌🏀": "Space Jam",
  "🏠😱": "Home Alone",
  "🤠👨‍🚀": "Toy Story",
  "🥋🐼": "Kung Fu Panda",
  "👦👴🚗🕖": "Back To The Future",
  "🏰👭❄️": "Frozen",
  "🐶🍝🐶💑": "Lady And The Tramp",
  "👸💤": "Sleeping Beauty",
  "🕷️🚶": "Spider Man",
  "🐢🐀👊🏻🍕": "Ninja Turtles"
};

const container = document.querySelector(".guess__emoji");
const controls = document.querySelector(".controls");
const startButton = document.getElementById("start");
const letterContainer = document.getElementById("letters");
const userInputSection = document.getElementById("userInput");
const resultText = document.getElementById("result");
const hints = Object.keys(moviesObject);

let randomHint = "";
let randomWord = "";
let winCount = 0;
let lossCount = 5;

const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

const blocker = () => {
  const letterButtons = document.querySelectorAll(".letters");
  letterButtons.forEach((button) => {
    button.disabled = true;
  });
  stopGame();
};

startButton.addEventListener("click", () => {
  controls.classList.add("hide");
  init();
});

const stopGame = () => {
  controls.classList.remove("hide");
};

const generateWord = () => {
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";
  randomHint = hints[generateRandomValue(hints)];
  randomWord = moviesObject[randomHint];
  container.innerHTML = `<div id="movieHint">${randomHint}</div>`;
  let displayItem = "";
  randomWord.split("").forEach((value) => {
    if (value == " ") {
      winCount += 1;
      displayItem += `<span class="inputSpace">&nbsp;</span>`;
    } else {
      displayItem += `<span class="inputSpace">_</span>`;
    }
  });
  userInputSection.innerHTML = displayItem;
};

const init = () => {
  winCount = 0;
  lossCount = 5;
  document.getElementById(
    "chanceCount"
  ).innerHTML = `<span>Tries Left:</span>${lossCount}`;
  randomHint = null;
  randomWord = "";
  userInputSection.innerHTML = "";
  letterContainer.innerHTML = "";
  generateWord();
  for (let i = 65; i < 91; i++) {
    const button = document.createElement("button");
    button.classList.add("letter");
    button.innerText = String.fromCharCode(i);
    button.addEventListener("click", () => {
      const charArray = randomWord.toUpperCase().split("");
      const inputSpace = document.getElementsByClassName("inputSpace");
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            button.classList.add("used");
            inputSpace[index].innerText = char;
            winCount += 1;
            if (winCount == charArray.length) {
              resultText.innerHTML = "Congrats! You guessed it!";
              blocker();
            }
          }
        });
      } else {
        lossCount -= 1;
        document.getElementById(
          "chanceCount"
        ).innerHTML = `<span>Tries Left:</span> ${lossCount}`;
        button.classList.add("used");
        if (lossCount == 0) {
          resultText.innerHTML = "Game Over";
          blocker();
        }
      }
      button.disabled = true;
    });
    letterContainer.appendChild(button);
  }
};

window.onload = () => {
  init();
};