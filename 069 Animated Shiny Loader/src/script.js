document.addEventListener("DOMContentLoaded", function () {
  const outer = document.querySelector(".outer");
  const inner = document.querySelector(".inner");
  const percent = document.querySelector("span");
  let count = 0;
  let loading;

  loading = setInterval(function () {
    if (count === 100) {
      clearInterval(loading);
      outer.classList.remove("active-loader");
      outer.classList.add("active-loader-2");
    } else {
      count++;
      percent.textContent = count + "%";
      outer.classList.add("active-loader");
    }
  }, 100);
});
