const eyes = document.querySelectorAll(".eye-roll");

const rotateEyes = (eye, mouseX, mouseY) => {
  const eyeRect = eye.getBoundingClientRect();
  const eyeCenterX = eyeRect.left + eyeRect.width / 2;
  const eyeCenterY = eyeRect.top + eyeRect.height / 2;
  const radian = Math.atan2(mouseX - eyeCenterX, mouseY - eyeCenterY);
  const degree = radian * (180 / Math.PI) * -1 + 90;
  eye.style.transform = `rotate(${degree}deg)`;
};

window.addEventListener("mousemove", (e) => {
  const mouseX = e.pageX;
  const mouseY = e.pageY;

  eyes.forEach((eye) => {
    rotateEyes(eye, mouseX, mouseY);
  });
});
