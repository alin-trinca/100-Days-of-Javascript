const toggles = document.querySelectorAll(".toggle");
const [good, cheap, fast] = toggles;

toggles.forEach((toggle) => {
  toggle.addEventListener("change", () => {
    doTheTrick(toggle);
  });
});

function doTheTrick(theClickedOne) {
  const [firstToggle, secondToggle, thirdToggle] = toggles;

  if (firstToggle.checked && secondToggle.checked && thirdToggle.checked) {
    if (good === theClickedOne) {
      thirdToggle.checked = false;
    }

    if (cheap === theClickedOne) {
      firstToggle.checked = false;
    }

    if (fast === theClickedOne) {
      secondToggle.checked = false;
    }
  }
}
