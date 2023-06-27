const degree = 6;
const hr = document.getElementById("hr");
const min = document.getElementById("min");
const sec = document.getElementById("sec");

setInterval(() => {
  const date = new Date();
  const hh = date.getHours() * 30;
  const mm = date.getMinutes() * degree;
  const ss = date.getSeconds() * degree;

  console.log(date.getHours());

  hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
  min.style.transform = `rotateZ(${mm}deg)`;
  sec.style.transform = `rotateZ(${ss}deg)`;
});