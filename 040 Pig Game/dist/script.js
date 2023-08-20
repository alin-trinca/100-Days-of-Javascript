"use strict";

"use strict";

// Selecting elements
const playerEls = [
  document.querySelector(".player--1"),
  document.querySelector(".player--2")
];
const scoreEls = [
  document.getElementById("score--1"),
  document.getElementById("score--2")
];
const currentEls = [
  document.getElementById("current--1"),
  document.getElementById("current--2")
];

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

// Initialize game state
const initGame = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreEls.forEach((scoreEl) => (scoreEl.textContent = 0));
  currentEls.forEach((currentEl) => (currentEl.textContent = 0));

  diceEl.classList.add("hidden");
  playerEls.forEach((playerEl) => {
    playerEl.classList.remove("player--winner", "player--active");
  });
  playerEls[0].classList.add("player--active");
};

const switchPlayer = function () {
  currentEls[activePlayer].textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEls.forEach((playerEl) => playerEl.classList.toggle("player--active"));
};

const rollDice = function () {
  if (playing) {
    const diceValue = Math.trunc(Math.random() * 6) + 1;
    const diceMapping = ["one", "two", "three", "four", "five", "six"];
    const diceClass = `fa-dice-${diceMapping[diceValue - 1]}`;

    diceEl.classList.remove("hidden");
    diceEl.innerHTML = `<i class="fas ${diceClass} fa-5x"></i>`;

    if (diceValue !== 1) {
      currentScore += diceValue;
      currentEls[activePlayer].textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
};

const holdScore = function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    scoreEls[activePlayer].textContent = scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add("hidden");
      playerEls[activePlayer].classList.add("player--winner");
      playerEls[activePlayer].classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
};

// Event listeners
btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", holdScore);
btnNew.addEventListener("click", initGame);

// Initialize game on page load
initGame();