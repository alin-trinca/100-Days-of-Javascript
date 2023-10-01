const container = document.getElementById("container");
const circlesArr = [];
const rows = 12;
const cols = 12;

// create circles
for (let i = 0; i < cols; i++) {
  circlesArr[i] = [];
  for (let j = 0; j < rows; j++) {
    const circle = createCircle();
    container.appendChild(circle);
    circlesArr[i].push(circle);
  }
}

circlesArr.forEach((cols, i) => {
  cols.forEach((circle, j) => {
    circle.addEventListener("click", () => {
      growCircles(i, j);
    });
  });
});

function createCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  return circle;
}

function growCircles(i, j) {
  const circle = circlesArr[i]?.[j];
  if (circle && !circle.classList.contains("grow")) {
    circle.classList.add("grow");
    setTimeout(() => {
      growAdjacentCircles(i, j);
    }, 100);
    setTimeout(() => {
      circle.classList.remove("grow");
    }, 300);
  }
}

function growAdjacentCircles(i, j) {
  growCircles(i - 1, j);
  growCircles(i + 1, j);
  growCircles(i, j - 1);
  growCircles(i, j + 1);
}