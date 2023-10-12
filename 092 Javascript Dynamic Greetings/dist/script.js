const card = document.querySelector(".card");
const timeNow = new Date().getHours();
let greeting;

if (timeNow >= 6 && timeNow < 12) {
  greeting = "Good Morning";
} else if (timeNow >= 12 && timeNow < 17) {
  greeting = "Good Afternoon";
} else {
  greeting = "Good Evening";
}

card.innerHTML = `<h1>${greeting}</h1>`;