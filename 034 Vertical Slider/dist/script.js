const sliderContainer = document.querySelector(".slider");
const slideRight = document.querySelector(".slider__right");
const slideLeft = document.querySelector(".slider__left");
const upButton = document.querySelector(".buttons__up");
const downButton = document.querySelector(".buttons__down");
const slidesLength = slideRight.querySelectorAll("div").length;

let activeSlideIndex = 0;

slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`;

upButton.addEventListener("click", () => changeSlide("up"));
downButton.addEventListener("click", () => changeSlide("down"));

function changeSlide(direction) {
  const sliderHeight = sliderContainer.clientHeight;
  if (direction === "up") {
    activeSlideIndex = (activeSlideIndex + 1) % slidesLength;
  } else {
    activeSlideIndex =
      activeSlideIndex > 0 ? activeSlideIndex - 1 : slidesLength - 1;
  }

  const offset = activeSlideIndex * sliderHeight;
  slideRight.style.transform = `translateY(-${offset}px)`;
  slideLeft.style.transform = `translateY(${offset}px)`;
}