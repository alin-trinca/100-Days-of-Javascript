const scoreEl = document.getElementById("score");
const gameBoard = document.getElementById("game-board");

let board = Array.from({ length: 4 }, () => Array(4).fill(0));
let score = 0;

function startGame() {
  board = Array.from({ length: 4 }, () => Array(4).fill(0));
  addNewTile();
  addNewTile();
  updateBoard();
  score = 0;
  updateScore();
}

function addNewTile() {
  const emptyTiles = [];

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === 0) {
        emptyTiles.push({ row, col });
      }
    }
  }

  if (emptyTiles.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyTiles.length);
    const { row, col } = emptyTiles[randomIndex];
    const newValue = Math.random() < 0.9 ? 2 : 4;

    board[row][col] = newValue;
  }
}

function updateBoard() {
  gameBoard.innerHTML = "";

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const tileValue = board[row][col];
      const tile = document.createElement("div");

      tile.className = "tile";
      tile.textContent = tileValue !== 0 ? tileValue : "";

      tile.style.backgroundColor = getTileColor(tileValue);
      tile.style.color = [2, 4, 8].includes(tileValue) ? "#fff" : "#fff";

      gameBoard.appendChild(tile);
    }
  }
}

function getTileColor(value) {
  if (value === 0) return "#4d4d4d";

  const colors = [
    "#4d4d4d",
    "#D770AD",
    "#3BAFDA",
    "#37BC9B",
    "#F6BB42",
    "#4A89DC",
    "#967ADC",
    "#8CC152",
    "#E9573F",
    "#434A54"
  ];

  for (let i = 0; i < colors.length; i++) {
    if (2 ** i === value) {
      return colors[i];
    }
  }

  return "#ecc95c";
}

function moveTiles(direction) {
  let tileMoved = false;
  const rowIndices = direction === "up" ? [0, 1, 2, 3] : [3, 2, 1, 0];
  const colIndices = direction === "left" ? [0, 1, 2, 3] : [3, 2, 1, 0];

  for (let row of rowIndices) {
    for (let col of colIndices) {
      const currentValue = board[row][col];

      if (currentValue === 0) continue;

      let newRow = row;
      let newCol = col;
      let currentRow = row;
      let currentCol = col;

      while (true) {
        if (direction === "up") {
          newRow--;
          currentRow = newRow + 1;
        } else if (direction === "down") {
          newRow++;
          currentRow = newRow - 1;
        } else if (direction === "left") {
          newCol--;
          currentCol = newCol + 1;
        } else if (direction === "right") {
          newCol++;
          currentCol = newCol - 1;
        }

        if (newRow < 0 || newRow >= 4 || newCol < 0 || newCol >= 4) {
          newRow -= direction === "up" ? -1 : 1;
          newCol -= direction === "left" ? -1 : 1;
          break;
        }

        const newValue = board[newRow][newCol];

        if (newValue === 0) {
          board[newRow][newCol] = currentValue;
          board[currentRow][currentCol] = 0;
          tileMoved = true;
        } else if (newValue === currentValue) {
          board[newRow][newCol] += currentValue;
          board[currentRow][currentCol] = 0;
          tileMoved = true;
          score += currentValue;
          updateScore();
          break;
        } else {
          newRow -= direction === "up" ? -1 : 1;
          newCol -= direction === "left" ? -1 : 1;
          break;
        }
      }
    }
  }

  if (tileMoved) {
    addNewTile();
    updateBoard();
  }
}

function updateScore() {
  scoreEl.innerText = score;
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    moveTiles("up");
  } else if (event.key === "ArrowDown") {
    moveTiles("down");
  } else if (event.key === "ArrowLeft") {
    moveTiles("left");
  } else if (event.key === "ArrowRight") {
    moveTiles("right");
  }
});

const newGameBtn = document.getElementById("new-game-btn");
newGameBtn.addEventListener("click", startGame);

startGame();