const container = document.getElementById("card");
const img = document.querySelector("img");

container.addEventListener("mousemove", (e) => {
  const { clientX, clientY, target } = e;
  const x = clientX - target.offsetLeft;
  const y = clientY - target.offsetTop;

  img.style.transformOrigin = `${x}px ${y}px`;
  img.style.transform = "scale(2.2)";
});

container.addEventListener("mouseleave", () => {
  img.style.transformOrigin = "center center";
  img.style.transform = "scale(1)";
});
