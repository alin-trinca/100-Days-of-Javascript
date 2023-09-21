const textarea = document.querySelector("textarea");
const voiceList = document.querySelector("select");
const speechBtn = document.querySelector("button");

let synth = speechSynthesis;
let isSpeaking = true;

// Initialize voices and populate the voice list
function voices() {
  voiceList.innerHTML = "";
  synth.getVoices().forEach((voice) => {
    const selected = voice.name === "Google US English" ? "selected" : "";
    const option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option);
  });
}

voices();

// Event listener for voiceschanged event
synth.addEventListener("voiceschanged", voices);

// Function to convert text to speech
function textToSpeech(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  const selectedVoice = voiceList.value;

  utterance.voice = synth
    .getVoices()
    .find((voice) => voice.name === selectedVoice);
  synth.speak(utterance);
}

// Event listener for speechBtn click
speechBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (textarea.value !== "") {
    if (!synth.speaking) {
      textToSpeech(textarea.value);
      if (textarea.value.length > 80) {
        setInterval(() => {
          if (!synth.speaking && !isSpeaking) {
            isSpeaking = true;
            speechBtn.innerText = "Convert To Speech";
          }
        }, 500);

        if (isSpeaking) {
          synth.resume();
          isSpeaking = false;
          speechBtn.innerText = "Pause Speech";
        } else {
          synth.pause();
          isSpeaking = true;
          speechBtn.innerText = "Resume Speech";
        }
      } else {
        speechBtn.innerText = "Convert To Speech";
      }
    }
  }
});
