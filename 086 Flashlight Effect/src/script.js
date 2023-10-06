const flashlight = document.getElementById("flashlight");

function getMousePosition(e) {
  const { pageX, pageY, touches } = e;
  const mouseX = touches ? touches[0].pageX : pageX;
  const mouseY = touches ? touches[0].pageY : pageY;

  flashlight.style.setProperty("--Xpos", mouseX + "px");
  flashlight.style.setProperty("--Ypos", mouseY + "px");
}

document.addEventListener("mousemove", getMousePosition);
document.addEventListener("touchmove", getMousePosition);

function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}
