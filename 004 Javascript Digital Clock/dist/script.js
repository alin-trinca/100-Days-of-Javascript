function clock() {
  let d = new Date(),
    h = d.getHours(),
    m = d.getMinutes(),
    s = d.getSeconds();

  if (h < 10) h = `0${h}`;
  if (m < 10) m = `0${m}`;
  if (s < 10) s = `0${s}`;

  document.querySelector(".hour").textContent = h;
  document.querySelector(".min").textContent = m;
  document.querySelector(".sec").textContent = s;

  setTimeout(clock, 1000);
}

clock();