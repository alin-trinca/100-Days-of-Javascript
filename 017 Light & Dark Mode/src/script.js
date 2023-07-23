const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const textBox = document.getElementById("text-box");

const DARK_THEME = "dark";
const LIGHT_THEME = "light";

// Apply Dark Mode Styles
const applyDarkModeStyles = () => {
  nav.style.backgroundColor = "rgb(0 0 0 / 50%)";
  textBox.style.backgroundColor = "rgb(255 255 255 / 50%)";
  toggleIcon.children[0].textContent = "Dark Mode";
  toggleIcon.children[1].classList.replace("fa-sun", "fa-moon");
};

// Apply Light Mode Styles
const applyLightModeStyles = () => {
  nav.style.backgroundColor = "rgb(255 255 255 / 50%)";
  textBox.style.backgroundColor = "rgb(0 0 0 / 50%)";
  toggleIcon.children[0].textContent = "Light Mode";
  toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
};

// Switch Theme Dynamically
const switchTheme = (event) => {
  const theme = event.target.checked ? DARK_THEME : LIGHT_THEME;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  if (theme === DARK_THEME) {
    applyDarkModeStyles();
  } else {
    applyLightModeStyles();
  }
};

// Event Listener
toggleSwitch.addEventListener("change", switchTheme);

// Check Local Storage For Theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  toggleSwitch.checked = currentTheme === DARK_THEME;
  if (currentTheme === DARK_THEME) {
    applyDarkModeStyles();
  } else {
    applyLightModeStyles();
  }
}
