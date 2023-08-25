const elements = {
  download: document.querySelector(".download"),
  dark: document.querySelector(".dark"),
  light: document.querySelector(".light"),
  qrContainer: document.querySelector("#qr-code"),
  qrText: document.querySelector(".qr-text"),
  shareBtn: document.querySelector(".share-btn"),
  sizes: document.querySelector(".sizes")
};

let colorLight = "#fff";
let colorDark = "#000";
let text = "https://www.google.com/";
let size = 600;

function handleDarkColor(e) {
  colorDark = e.target.value;
  generateQRCode();
}

function handleLightColor(e) {
  colorLight = e.target.value;
  generateQRCode();
}

function handleQRText(e) {
  const value = e.target.value;
  text = value || "https://www.google.com/";
  generateQRCode();
}

async function generateQRCode() {
  elements.qrContainer.innerHTML = "";
  new QRCode("qr-code", {
    text,
    height: size,
    width: size,
    colorLight,
    colorDark
  });
  elements.download.href = await resolveDataUrl();
}

async function handleShare() {
  setTimeout(async () => {
    try {
      const base64url = await resolveDataUrl();
      const blob = await (await fetch(base64url)).blob();
      const file = new File([blob], "QRCode.png", {
        type: blob.type
      });
      await navigator.share({
        files: [file],
        title: text
      });
    } catch (error) {
      alert("Your browser doesn't support sharing.");
    }
  }, 100);
}

function handleSize(e) {
  size = e.target.value;
  generateQRCode();
}

function resolveDataUrl() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const img = document.querySelector("#qr-code img");
      if (img.currentSrc) {
        resolve(img.currentSrc);
        return;
      }
      const canvas = document.querySelector("canvas");
      resolve(canvas.toDataURL());
    }, 50);
  });
}

elements.dark.addEventListener("input", handleDarkColor);
elements.light.addEventListener("input", handleLightColor);
elements.qrText.addEventListener("input", handleQRText);
elements.sizes.addEventListener("change", handleSize);
elements.shareBtn.addEventListener("click", handleShare);

generateQRCode();