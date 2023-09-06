const value = document.querySelector("#value");
const btns = document.querySelectorAll(".btn");

let count = 0;

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const action = e.currentTarget.dataset.action;
    count = updateCount(action);
    updateValueAndColor(count);
  });
});

function updateCount(action) {
  switch (action) {
    case "decrease":
      return count - 1;
    case "increase":
      return count + 1;
    default:
      return 0;
  }
}

function updateValueAndColor(count) {
  value.textContent = count;
  if (count > 0) {
    value.style.color = "#8CC152";
  } else if (count < 0) {
    value.style.color = "#E9573F";
  } else {
    value.style.color = "#fff";
  }
}