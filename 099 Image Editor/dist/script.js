// Define constants for elements
const fileInput = document.getElementById("file");
const image = document.getElementById("image");
const downloadButton = document.getElementById("download");
const aspectRatioBtns = document.querySelectorAll(".aspect-ratio-btns");
const rotateRightButton = document.getElementById("rotate-right");
const rotateLeftButton = document.getElementById("rotate-left");
const scaleXButton = document.getElementById("scale-X-button");
const scaleYButton = document.getElementById("scale-Y-button");
const options = document.querySelector(".editor__options");
const cropper = new Cropper(image);
let fileName = "";
let scaleXClick = false;
let scaleYClick = false;
let rotateRightValue = -45;
let rotateLeftValue = 45;

// Function to hide elements on window load
window.onload = () => {
  downloadButton.classList.add("hide");
  options.classList.add("hide");
};

// Function to handle file input change
fileInput.onchange = () => {
  const reader = new FileReader();
  reader.readAsDataURL(fileInput.files[0]);
  reader.onload = () => {
    image.setAttribute("src", reader.result);
    if (cropper) {
      cropper.destroy();
    }
    cropper.replace(reader.result);
    options.classList.remove("hide");
    downloadButton.classList.remove("hide");
  };
  fileName = fileInput.files[0].name.split(".")[0];
};

// Function to change aspect ratio
aspectRatioBtns.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.innerText === "Free") {
      cropper.setAspectRatio(NaN);
    } else {
      cropper.setAspectRatio(eval(element.innerText.replace(":", "/")));
    }
  });
});

// Function for rotate buttons
rotateRightButton.addEventListener("click", () => {
  cropper.rotate(rotateRightValue);
});

rotateLeftButton.addEventListener("click", () => {
  cropper.rotate(rotateLeftValue);
});

// Function for flip buttons
const toggleScale = (button, axis) => {
  if (button) {
    button.addEventListener("click", () => {
      if (axis === "X") {
        cropper.scaleX(scaleXClick ? 1 : -1);
        scaleXClick = !scaleXClick;
      } else if (axis === "Y") {
        cropper.scaleY(scaleYClick ? 1 : -1);
        scaleYClick = !scaleYClick;
      }
    });
  }
};

toggleScale(scaleXButton, "X");
toggleScale(scaleYButton, "Y");

// Function to download the edited image
downloadButton.addEventListener("click", () => {
  const imgSrc = cropper.getCroppedCanvas({}).toDataURL();
  downloadButton.download = `cropped_${fileName}.png`;
  downloadButton.setAttribute("href", imgSrc);
});