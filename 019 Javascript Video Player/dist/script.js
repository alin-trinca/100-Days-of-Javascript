const player = document.querySelector(".player");
const video = document.querySelector(".video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const speed = document.querySelector(".player-speed");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");

let fullscreen = false;

const showPlayIcon = () => {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
};

const togglePlay = () => {
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    video.pause();
    showPlayIcon();
  }
};

const displayTime = (time) => {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
};

const updateProgress = () => {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
};

const setProgress = (e) => {
  const newTime = (e.offsetX / progressRange.offsetWidth) * video.duration;
  video.currentTime = newTime;
};

const toggleMute = () => {
  if (video.volume) {
    video.volume = 0;
    volumeIcon.classList.replace("fa-volume-up", "fa-volume-mute");
    volumeIcon.setAttribute("title", "Unmute");
    volumeBar.style.width = 0;
  } else {
    video.volume = 1;
    volumeIcon.classList.replace("fa-volume-mute", "fa-volume-up");
    volumeIcon.setAttribute("title", "Mute");
    volumeBar.style.width = "100%";
  }
};

const changeVolume = (e) => {
  const volume = e.offsetX / volumeRange.offsetWidth;
  video.volume = volume;
  volumeBar.style.width = `${volume * 100}%`;
  volumeIcon.className = "";
  if (volume > 0.7) {
    volumeIcon.classList.add("fa-solid", "fa-volume-up");
  } else if (volume > 0) {
    volumeIcon.classList.add("fa-solid", "fa-volume-down");
  } else {
    volumeIcon.classList.add("fa-solid", "fa-volume-off");
  }
};

const changeSpeed = () => {
  video.playbackRate = speed.value;
};

const toggleFullscreen = () => {
  if (!fullscreen) {
    if (player.requestFullscreen) {
      player.requestFullscreen();
    } else if (player.mozRequestFullScreen) {
      player.mozRequestFullScreen();
    } else if (player.webkitRequestFullscreen) {
      player.webkitRequestFullscreen();
    } else if (player.msRequestFullscreen) {
      player.msRequestFullscreen();
    }
    video.classList.add("video-fullscreen");
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    video.classList.remove("video-fullscreen");
  }
  fullscreen = !fullscreen;
};

playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", changeSpeed);
fullscreenBtn.addEventListener("click", toggleFullscreen);
video.addEventListener("ended", showPlayIcon);