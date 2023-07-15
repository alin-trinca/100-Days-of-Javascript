const ratioWidth = document.getElementById("ratioWidth");
const ratioHeight = document.getElementById("ratioHeight");
const width = document.getElementById("width");
const height = document.getElementById("height");

const calculateWidth = () => {
  const aspectRatio = ratioWidth.value / ratioHeight.value;
  width.value = (height.value * aspectRatio).toFixed(2);
};

const calculateHeight = () => {
  const aspectRatio = ratioWidth.value / ratioHeight.value;
  height.value = (width.value / aspectRatio).toFixed(2);
};

const updateWidth = () => {
  height.removeEventListener("input", calculateWidth);
  calculateWidth();
  height.addEventListener("input", calculateWidth);
};

const updateHeight = () => {
  width.removeEventListener("input", calculateHeight);
  calculateHeight();
  width.addEventListener("input", calculateHeight);
};

height.addEventListener("input", updateWidth);
width.addEventListener("input", updateHeight);
ratioHeight.addEventListener("input", updateWidth);
ratioWidth.addEventListener("input", updateHeight);
