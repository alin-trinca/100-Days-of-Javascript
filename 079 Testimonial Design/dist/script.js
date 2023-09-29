const authorsEl = document.querySelectorAll(".author");
const container = document.querySelector(".testimonials");
const nameEl = document.querySelector(".name");
const textEl = document.querySelector(".text");

const testimonials = [
  {
    text:
      "Red Five standing by. Hokey religions and ancient weapons are no match for a good blaster at your side, kid. Escape is not his plan. I must face him, alone. The more you tighten your grip, Tarkin, the more star systems will slip through your fingers.",
    name: "Nicole Stephens",
    color: "#4A89DC"
  },
  {
    text:
      "The Force is strong with this one. I have you now. In my experience, there is no such thing as luck. I find your lack of faith disturbing. Hokey religions and ancient weapons are no match for a good blaster at your side, kid.",
    name: "Lisa Shaw",
    color: "#37BC9B"
  },
  {
    text:
      "All right. Well, take care of yourself, Han. I guess that's what you're best at, ain't it? I suggest you try it again, Luke. This time, let go your conscious self and act on instinct. No! Alderaan is peaceful. We have no weapons. You can't possibly…",
    name: "Jeanne Taylor",
    color: "#DA4453"
  },
  {
    text:
      "Don't be too proud of this technological terror you've constructed. The ability to destroy a planet is insignificant next to the power of the Force. Leave that to me. Send a distress signal, and inform the Senate that all on board were killed.",
    name: "Bobby Wheeler",
    color: "#967ADC"
  },
  {
    text:
      "Kid, I've flown from one side of this galaxy to the other. I've seen a lot of strange stuff, but I've never seen anything to make me believe there's one all-powerful Force controlling everything. There's no mystical energy field that controls my destiny. It's all a lot of simple tricks and nonsense. You're all clear, kid. Let's blow this thing and go home!",
    name: "Landon Castro",
    color: "#D770AD"
  }
];

addTestimonial(0);

authorsEl.forEach((author, idx) => {
  author.addEventListener("click", (e) => {
    addTestimonial(idx);
    author.classList.add("selected");
  });
});

function addTestimonial(idx) {
  const testimonial = testimonials[idx];

  nameEl.innerHTML = testimonial.name;
  textEl.innerHTML = testimonial.text;
  container.style.background = testimonial.color;

  authorsEl.forEach((author) => {
    author.classList.remove("selected");
  });
}