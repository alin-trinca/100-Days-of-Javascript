const container = document.getElementById("container");
const colors = [
  "#4A89DC",
  "#3BAFDA",
  "#37BC9B",
  "#8CC152",
  "#F6BB42",
  "#E9573F",
  "#DA4453",
  "#967ADC",
  "#D770AD"
];
const SQUARES_COUNT = 522;
const DEFAULT_COLOR = "#131c31";
const DEFAULT_BOX_SHADOW = "0 10px 10px 0 rgba(0, 0, 0, 0.05)";

for (let i = 0; i < SQUARES_COUNT; i++) {
  const square = createSquare();
  container.appendChild(square);
}

function createSquare() {
  const square = document.createElement("div");
  square.classList.add("square");

  square.addEventListener("mouseover", () =>
    applyColor(square, getRandomColor())
  );
  square.addEventListener("mouseout", () =>
    applyColor(square, DEFAULT_COLOR, DEFAULT_BOX_SHADOW)
  );

  return square;
}

function applyColor(
  element,
  color,
  boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
) {
  element.style.background = color;
  element.style.boxShadow = boxShadow;
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
