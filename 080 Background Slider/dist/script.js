const slides = document.querySelectorAll(".slide");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");

let activeSlide = 0;

leftBtn.addEventListener("click", () => {
  setActiveSlide(-1);
});

rightBtn.addEventListener("click", () => {
  setActiveSlide(1);
});

setBgToBody();

function setActiveSlide(direction) {
  activeSlide = (activeSlide + direction + slides.length) % slides.length;
  setBgToBody();
  updateSlideClasses();
}

function setBgToBody() {
  document.body.style.backgroundImage =
    slides[activeSlide].style.backgroundImage;
}

function updateSlideClasses() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === activeSlide);
  });
}