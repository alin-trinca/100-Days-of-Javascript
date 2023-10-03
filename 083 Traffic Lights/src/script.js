const circles = document.querySelectorAll(".light");
let activeLight = 0;

setInterval(changeLight, 1000);

function changeLight() {
  circles[activeLight].classList.remove(
    circles[activeLight].getAttribute("color")
  );
  activeLight = (activeLight + 1) % circles.length;
  circles[activeLight].classList.add(
    circles[activeLight].getAttribute("color")
  );
}
