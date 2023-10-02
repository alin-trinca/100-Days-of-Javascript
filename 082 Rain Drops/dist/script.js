function createCircle() {
  const circleEl = document.createElement("div");
  circleEl.classList.add("circle");
  setRandomPosition(circleEl);
  document.body.appendChild(circleEl);

  setTimeout(() => {
    circleEl.remove();
  }, 4000);
}

function setRandomPosition(element) {
  element.style.top = Math.random() * window.innerHeight + "px";
  element.style.left = Math.random() * window.innerWidth + "px";
}

setInterval(createCircle, 300);