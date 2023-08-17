const playBoard = document.querySelector(".board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");
const notification = document.querySelector(".alert");

let gameOver = false;
let foodX, foodY;
let snakeX = 5,
  snakeY = 5;
let velocityX = 0,
  velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;

function updateHighScore() {
  highScoreElement.innerText = `High Score: ${highScore}`;
}

function updateFoodPosition() {
  foodX = Math.floor(Math.random() * 50) + 1;
  foodY = Math.floor(Math.random() * 50) + 1;
}

function showNotification(message) {
  notification.textContent = message;
  notification.classList.add("active");
  setTimeout(() => {
    notification.classList.remove("active");
  }, 30000);
}

function handleGameOver() {
  clearInterval(setIntervalId);
  showNotification("Game Over!");
  location.reload();
}

function changeDirection(key) {
  if (key === "ArrowUp" && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (key === "ArrowDown" && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (key === "ArrowLeft" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (key === "ArrowRight" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

function handleButtonClick(button) {
  changeDirection(button.dataset.key);
}

function initGame() {
  if (gameOver) return handleGameOver();

  let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  if (snakeX === foodX && snakeY === foodY) {
    updateFoodPosition();
    snakeBody.push([foodY, foodX]);
    score++;
    highScore = Math.max(score, highScore);
    localStorage.setItem("high-score", highScore);
    scoreElement.innerText = `Score: ${score}`;
    updateHighScore();
  }

  snakeX += velocityX;
  snakeY += velocityY;

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];

  if (snakeX <= 0 || snakeX > 50 || snakeY <= 0 || snakeY > 50) {
    gameOver = true;
    showNotification("Game Over!");
    return;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
      showNotification("Game Over!");
    }
  }

  playBoard.innerHTML = html;
}

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);

controls.forEach((button) => {
  button.addEventListener("click", () => handleButtonClick(button));
});

document.addEventListener("keyup", (e) => changeDirection(e.key));
updateHighScore();
