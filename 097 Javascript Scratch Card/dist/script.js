const canvas = document.getElementById("scratch");
const context = canvas.getContext("2d");
const canvasRect = canvas.getBoundingClientRect();
const scratchRadius = 12;
let isDragged = false;

// Define event types for mouse and touch
const events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
    leave: "mouseleave"
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend"
  }
};

// Check if the device is touch-enabled
const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
};

// Get the x and y positions relative to the canvas
const getXY = (e) => {
  const pageX = isTouchDevice() ? e.touches[0].pageX : e.pageX;
  const pageY = isTouchDevice() ? e.touches[0].pageY : e.pageY;
  return {
    x: pageX - canvasRect.left,
    y: pageY - canvasRect.top
  };
};

// Initialize the canvas with a gradient background
const init = () => {
  const gradientColor = context.createLinearGradient(0, 0, 135, 135);
  gradientColor.addColorStop(0, "#0ea5ea");
  gradientColor.addColorStop(1, "#0bd1d1");
  context.fillStyle = gradientColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
};

// Start scratching
const startScratch = (event) => {
  isDragged = true;
  const { x, y } = getXY(event);
  scratch(x, y);
};

// Continue scratching
const continueScratch = (event) => {
  if (!isTouchDevice()) {
    event.preventDefault();
  }
  if (isDragged) {
    const { x, y } = getXY(event);
    scratch(x, y);
  }
};

// Stop scratching
const stopScratch = () => {
  isDragged = false;
};

// Scratch function
const scratch = (x, y) => {
  context.globalCompositeOperation = "destination-out";
  context.beginPath();
  context.arc(x, y, scratchRadius, 0, 2 * Math.PI);
  context.fill();
};

// Event listeners
canvas.addEventListener(events.mouse.down, startScratch);
canvas.addEventListener(events.mouse.move, continueScratch);
canvas.addEventListener(events.mouse.up, stopScratch);
canvas.addEventListener(events.mouse.leave, stopScratch);

// Initialize canvas
window.onload = init;