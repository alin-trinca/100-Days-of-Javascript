const updateCount = (el) => {
  const value = parseInt(el.dataset.value);
  const increment = Math.ceil(value / 1000);
  let initialValue = 0;

  const increaseCount = () => {
    initialValue += increment;
    if (initialValue > value) {
      el.textContent = `${value}+`;
    } else {
      el.textContent = `${initialValue}+`;
      requestAnimationFrame(increaseCount);
    }
  };

  increaseCount();
};

const items = [...document.querySelectorAll(".number")];

items.forEach(updateCount);
