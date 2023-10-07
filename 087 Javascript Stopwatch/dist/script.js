let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let timerRef = document.querySelector(".timer");
let intervalId = null;

function startTimer() {
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(updateTimer, 10);
}

function updateTimer() {
  milliseconds += 10;
  if (milliseconds === 1000) {
    seconds++;
    milliseconds = 0;
  }
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
  if (minutes === 60) {
    hours++;
    minutes = 0;
  }

  const h = String(hours).padStart(2, "0");
  const m = String(minutes).padStart(2, "0");
  const s = String(seconds).padStart(2, "0");
  const ms = String(milliseconds).padStart(3, "0");

  timerRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}

function pauseTimer() {
  clearInterval(intervalId);
}

function resetTimer() {
  clearInterval(intervalId);
  milliseconds = seconds = minutes = hours = 0;
  timerRef.innerHTML = "00 : 00 : 00 : 000";
}

document.getElementById("start-timer").addEventListener("click", startTimer);
document.getElementById("pause-timer").addEventListener("click", pauseTimer);
document.getElementById("reset-timer").addEventListener("click", resetTimer);