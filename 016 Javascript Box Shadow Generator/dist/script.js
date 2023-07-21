const preview = document.getElementById("preview");
const styles = document.getElementById("styles");
const ranges = document.querySelectorAll(".settings input");
const copyButton = document.getElementById("copy-styles");

// Add event listener to each range input
ranges.forEach((slider) => {
  slider.addEventListener("input", generateStyles);
});

// Function to generate and update styles
function generateStyles() {
  const xShadow = getValue("x-shadow");
  const yShadow = getValue("y-shadow");
  const blurRadius = getValue("blur-r");
  const spreadRadius = getValue("spread-r");
  const shadowColor = getValue("shadow-color");
  const shadowOpacity = getValue("shadow-opacity");
  const shadowInset = getValue("inset-shadow") === "true";
  const borderRadius = getValue("border-r");

  // Create the box shadow CSS property value
  const boxShadow = `${
    shadowInset ? "inset " : ""
  }${xShadow}px ${yShadow}px ${blurRadius}px ${spreadRadius}px ${hexToRgba(
    shadowColor,
    shadowOpacity
  )}`;

  // Update the preview element styles
  preview.style.boxShadow = boxShadow;
  preview.style.borderRadius = `${borderRadius}px`;

  // Update textarea with generated styles
  styles.textContent = `box-shadow: ${boxShadow};\nborder-radius: ${borderRadius}px;`;
}

// Function to get the value of an input element
function getValue(id) {
  return document.getElementById(id).value;
}

// Function to convert hex color and opacity to rgba format
function hexToRgba(shadowColor, shadowOpacity) {
  const r = parseInt(shadowColor.substr(1, 2), 16);
  const g = parseInt(shadowColor.substr(3, 2), 16);
  const b = parseInt(shadowColor.substr(5, 2), 16);

  return `rgba(${r}, ${g}, ${b}, ${shadowOpacity})`;
}

// Function to copy the generated styles
function copyStyles() {
  styles.select();
  document.execCommand("copy");
  copyButton.innerText = "Copied!";
  setTimeout(() => {
    copyButton.innerText = "Copy";
  }, 500);
}

copyButton.addEventListener("click", copyStyles);

generateStyles();