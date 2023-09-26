const calculateGridDimensions = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const rowLength = Math.floor(height / 44);
  const colLength = Math.floor(width / 44) - 1;
  return { width, height, rowLength, colLength };
};

const getRandomWinner = (maxValue) => {
  return Math.floor(Math.random() * maxValue);
};

const { width, height, rowLength, colLength } = calculateGridDimensions();
console.log(width, height, rowLength, colLength);

for (let i = 0; i < rowLength; i++) {
  const row = document.createElement("div");
  row.classList.add("row");

  for (let j = 0; j < colLength; j++) {
    const circle = document.createElement("div");
    circle.classList.add("circle");

    const nr = i * colLength + j;
    const winner = getRandomWinner(rowLength * colLength);
    console.log(nr, winner);

    if (winner === nr) {
      circle.classList.add("winner");
      const inner = document.createElement("div");
      inner.innerText = "You are a winner!";
      circle.appendChild(inner);
    }

    row.appendChild(circle);
  }

  document.body.appendChild(row);
}
