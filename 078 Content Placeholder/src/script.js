const elements = {
  header: document.getElementById("header"),
  title: document.getElementById("title"),
  excerpt: document.getElementById("excerpt"),
  profileImg: document.getElementById("author_img"),
  name: document.getElementById("name"),
  date: document.getElementById("date"),
  animatedBgs: document.querySelectorAll(".animated__bg"),
  animatedBgTexts: document.querySelectorAll(".animated__bg")
};

setTimeout(getData, 2500);

function getData() {
  elements.header.querySelector("img").style.display = "block";
  elements.title.innerHTML = "Yar Pirate Ipsum";
  elements.excerpt.innerHTML =
    "Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow's nest nipperkin grog.";
  elements.profileImg.innerHTML = `<img src="https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />`;
  elements.name.innerHTML = "John Hancock";
  elements.date.innerHTML = "Developer";

  elements.animatedBgs.forEach((bgs) => {
    bgs.classList.remove("animated__bg");
  });
  elements.animatedBgTexts.forEach((bgs) => {
    bgs.classList.remove("animated__bg--text");
  });
}
