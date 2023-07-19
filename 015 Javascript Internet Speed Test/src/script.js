let imageSize = "";
let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 1;
let testCompleted = 0;

const bitSpeed = document.getElementById("card__bits");
const kbSpeed = document.getElementById("card__kbs");
const mbSpeed = document.getElementById("card__mbs");
const info = document.getElementById("card__info");

const imageApi = "https://source.unsplash.com/random?topic=sun";
const image = new Image();

image.onload = async function () {
  const endTime = new Date().getTime();

  const response = await fetch(imageApi);
  const contentLength = response.headers.get("content-length");
  imageSize = contentLength;

  calculateSpeed(endTime);
};

function calculateSpeed(endTime) {
  const timeDuration = (endTime - startTime) / 1000;
  const loadedBits = imageSize * 8;
  const speedInBts = loadedBits / timeDuration;
  const speedInKbs = speedInBts / 1024;
  const speedInMbs = speedInKbs / 1024;

  totalBitSpeed += speedInBts;
  totalKbSpeed += speedInKbs;
  totalMbSpeed += speedInMbs;

  testCompleted++;

  if (testCompleted === numTests) {
    const averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
    const averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
    const averageSpeedInMbps = (totalMbSpeed / numTests).toFixed(2);

    bitSpeed.innerHTML = averageSpeedInBps;
    kbSpeed.innerHTML = averageSpeedInKbps;
    mbSpeed.innerHTML = averageSpeedInMbps;
    info.innerHTML = "Test Completed!";
  } else {
    startTime = new Date().getTime();
    image.src = imageApi;
  }
}

const init = async () => {
  info.innerHTML = "Testing...";
  startTime = new Date().getTime();
  image.src = imageApi;
};

window.onload = () => {
  for (let i = 0; i < numTests; i++) {
    init();
  }
};
