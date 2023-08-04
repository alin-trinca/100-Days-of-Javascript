const sounds = ["applause", "barking", "gasp", "birds", "laugh", "sad"];
const buttonContainer = document.getElementById("buttons");

const fragment = document.createDocumentFragment();

sounds.forEach((sound) => {
  const btn = document.createElement("button");
  btn.classList.add("btn");
  btn.textContent = sound;

  btn.addEventListener("click", () => {
    stopSounds();
    document.getElementById(sound).play();
  });

  fragment.appendChild(btn);
});

buttonContainer.appendChild(fragment);

function stopSounds() {
  sounds.forEach((sound) => {
    const soundElement = document.getElementById(sound);
    soundElement.pause();
    soundElement.currentTime = 0;
  });
}