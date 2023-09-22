function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  const leftPosition = Math.random() * 100 + "vw";
  const animationDuration = Math.random() * 2 + 3 + "s";

  heart.style.left = leftPosition;
  heart.style.animationDuration = animationDuration;

  heart.innerText = "💜";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

setInterval(createHeart, 300);