const player = {
  x: "<i class='fa-solid fa-x'></i>",
  o: "<i class='fa-solid fa-0'></i>",
  turn: "",
  moves: 0,
  isGameOver: false
};

const spans = document.getElementsByTagName("span");
const restartButton = '<button onclick="playAgain()">Play again</button>';

function play(y) {
  if (y.dataset.player == "none" && !player.isGameOver) {
    y.innerHTML = player.turn;
    y.dataset.player = player.turn;
    player.moves++;
    togglePlayerTurn();
  }

  /* Win Types */
  checkWinner(1, 2, 3);
  checkWinner(4, 5, 6);
  checkWinner(7, 8, 9);
  checkWinner(1, 4, 7);
  checkWinner(2, 5, 8);
  checkWinner(3, 6, 9);
  checkWinner(1, 5, 9);
  checkWinner(3, 5, 7);

  /* No Winner */
  if (player.moves === 9 && !player.isGameOver) {
    draw();
  }
}

function togglePlayerTurn() {
  player.turn = player.turn === player.x ? player.o : player.x;
}

function checkWinner(a, b, c) {
  a--;
  b--;
  c--;
  if (
    spans[a].dataset.player === spans[b].dataset.player &&
    spans[b].dataset.player === spans[c].dataset.player &&
    spans[a].dataset.player === spans[c].dataset.player &&
    (spans[a].dataset.player === player.x ||
      spans[a].dataset.player === player.o) &&
    !player.isGameOver
  ) {
    spans[a].parentNode.classList.add("activeBox");
    spans[b].parentNode.classList.add("activeBox");
    spans[c].parentNode.classList.add("activeBox");
    gameOver(a);
  }
}

function playAgain() {
  const alertElement = document.querySelector(".alert");
  if (alertElement) {
    alertElement.parentNode.removeChild(alertElement);
  }
  resetGame();
  player.isGameOver = false;
  for (let k = 0; k < spans.length; k++) {
    spans[k].parentNode.classList.remove("activeBox");
  }
}

function resetGame() {
  for (let i = 0; i < spans.length; i++) {
    spans[i].dataset.player = "none";
    spans[i].innerHTML = "&nbsp;";
  }
  player.turn = player.x;
}

function gameOver(a) {
  const playerSymbol = spans[a].dataset.player === player.x ? "X" : "O";
  const gameOverAlertElement = `
    <b>GAME OVER</b><br> Player ${playerSymbol} Win !!! <br>
    ${restartButton}
  `;
  const div = document.createElement("div");
  div.className = "alert";
  div.innerHTML = gameOverAlertElement;
  document.getElementsByTagName("body")[0].appendChild(div);
  player.isGameOver = true;
  player.moves = 0;
}

function draw() {
  const drawAlertElement = `<b>DRAW!!!</b><br>${restartButton}`;
  const div = document.createElement("div");
  div.className = "alert";
  div.innerHTML = drawAlertElement;
  document.getElementsByTagName("body")[0].appendChild(div);
  player.isGameOver = true;
  player.moves = 0;
}