const reviews = [
  {
    id: 1,
    name: "Penny Carroll",
    job: "web developer",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    text:
      "Yuccie la croix pork belly venmo chambray gochujang cronut. Messenger bag irony deep v vibecession drinking vinegar whatever umami. Celiac keytar food truck marfa jean shorts hot chicken keffiyeh swag meggings freegan coloring book."
  },
  {
    id: 2,
    name: "Anna Olson",
    job: "web designer",
    img: "https://randomuser.me/api/portraits/women/73.jpg",
    text:
      "Viral gastropub locavore, activated charcoal vibecession plaid DSA tousled shaman kombucha polaroid subway tile jianbing. Ascot venmo fashion axe, before they sold out bitters chillwave 8-bit health goth VHS."
  },
  {
    id: 3,
    name: "Bradley Silva",
    job: "intern",
    img: "https://randomuser.me/api/portraits/men/44.jpg",
    text:
      "Cornhole locavore health goth, ethical gentrify poke fingerstache mumblecore roof party. Humblebrag lo-fi listicle messenger bag vexillologist enamel pin ramps solarpunk fam twee activated charcoal blue bottle."
  },
  {
    id: 4,
    name: "Floyd Allen",
    job: "the boss",
    img: "https://randomuser.me/api/portraits/men/84.jpg",
    text:
      "Everyday carry polaroid XOXO, migas helvetica vinyl literally cloud bread solarpunk. Beard waistcoat succulents whatever fashion axe yuccie cronut sartorial banh mi marfa. Af stumptown sartorial jean shorts tote bag hell of. "
  }
];

const img = document.getElementById("profile");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

const prevBtn = document.querySelector(".buttons__prev");
const nextBtn = document.querySelector(".buttons__next");
const randomBtn = document.querySelector(".random");

let currentItem = 0;

function showPerson(person) {
  const item = reviews[person];
  img.src = item.img;
  author.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
}

window.addEventListener("DOMContentLoaded", function () {
  showPerson(currentItem);
});

function updateCurrentItem(action) {
  if (action === "next") {
    currentItem++;
    if (currentItem > reviews.length - 1) {
      currentItem = 0;
    }
  } else if (action === "prev") {
    currentItem--;
    if (currentItem < 0) {
      currentItem = reviews.length - 1;
    }
  } else if (action === "random") {
    currentItem = Math.floor(Math.random() * reviews.length);
  }
  showPerson(currentItem);
}

nextBtn.addEventListener("click", () => {
  updateCurrentItem("next");
});

prevBtn.addEventListener("click", () => {
  updateCurrentItem("prev");
});

randomBtn.addEventListener("click", () => {
  updateCurrentItem("random");
});
