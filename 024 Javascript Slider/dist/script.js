const left = document.querySelector(".fa-chevron-left");
const right = document.querySelector(".fa-chevron-right");
const slider = document.querySelector(".slider__wrapper");
const images = document.querySelectorAll(".slider__image");
const bottom = document.querySelector(".slider__bottom");

let slideNumber = 1;
const length = images.length;

for (let i = 0; i < length; i++) {
  const div = document.createElement("div");
  div.className = "buttons";
  bottom.appendChild(div);
}

const buttons = document.querySelectorAll(".buttons");
buttons[0].style.backgroundColor = "#b9e0f2";

const resetBg = () => {
  buttons.forEach((button) => {
    button.style.backgroundColor = "transparent";
  });
};

const changeSlide = (index) => {
  slider.style.transform = `translateX(-${(index - 1) * 700}px)`;
  slideNumber = index;
  resetBg();
  buttons[slideNumber - 1].style.backgroundColor = "#b9e0f2";
};

buttons.forEach((button, i) => {
  button.addEventListener("click", () => {
    changeSlide(i + 1);
  });
});

const nextSlide = () => {
  slideNumber < length ? changeSlide(slideNumber + 1) : changeSlide(1);
};

const prevSlide = () => {
  slideNumber > 1 ? changeSlide(slideNumber - 1) : changeSlide(length);
};

right.addEventListener("click", nextSlide);
left.addEventListener("click", prevSlide);