function initBattery() {
  const batteryLiquid = document.querySelector(".battery__liquid");
  const batteryStatus = document.querySelector(".battery__status");
  const Bpercentage = document.querySelector(".battery__percentage");

  navigator.getBattery().then((batt) => {
    function updateBattery() {
      const level = Math.floor(batt.level * 100);
      Bpercentage.innerHTML = `${level}%`;
      batteryLiquid.style.height = `${level}%`;

      if (level === 100) {
        batteryStatus.innerHTML = `Battery Full <i class="fa-solid fa-bolt green-color"></i>`;
        batteryLiquid.style.height = "103%";
      } else if (level <= 20 && !batt.charging) {
        batteryStatus.innerHTML = `Low Charge <i class="fa-solid fa-plug animated-red"></i>`;
      } else if (batt.charging) {
        batteryStatus.innerHTML = `Charging ... <i class="fa-solid fa-plug-circle-bolt animated-green"></i>`;
      } else {
        batteryStatus.innerHTML = "";
      }

      updateLiquidGradient(level);
    }

    function updateLiquidGradient(level) {
      if (level <= 20) {
        batteryLiquid.classList.add("gradient-red");
        batteryLiquid.classList.remove(
          "gradient-green",
          "gradient-orange",
          "gradient-yellow"
        );
      } else if (level <= 48) {
        batteryLiquid.classList.add("gradient-orange");
        batteryLiquid.classList.remove(
          "gradient-green",
          "gradient-red",
          "gradient-yellow"
        );
      } else if (level <= 80) {
        batteryLiquid.classList.add("gradient-yellow");
        batteryLiquid.classList.remove(
          "gradient-green",
          "gradient-orange",
          "gradient-red"
        );
      } else {
        batteryLiquid.classList.add("gradient-green");
        batteryLiquid.classList.remove(
          "gradient-red",
          "gradient-orange",
          "gradient-yellow"
        );
      }
    }

    updateBattery();
    batt.addEventListener("chargingchange", updateBattery);
    batt.addEventListener("levelchange", updateBattery);
  });
}

initBattery();