const container = document.querySelector(".box");
const search = document.querySelector(".box__search button");
const weatherBox = document.querySelector(".box__weather");
const weatherDetails = document.querySelector(".box__details");
const error404 = document.querySelector(".box__404");
const input = document.querySelector(".box__search input");
const image = document.querySelector(".box__weather img");
const temperature = document.querySelector(".box__weather .temperature");
const description = document.querySelector(".box__weather .description");
const humidity = document.querySelector(".box__details .humidity span");
const wind = document.querySelector(".box__details .wind span");

const APIKey = "91e0bccb672b8370c81814988bd899cc";

search.addEventListener("click", () => {
  const city = input.value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "https://cdn-icons-png.flaticon.com/512/7755/7755606.png";
          break;

        case "Rain":
          image.src = "https://cdn-icons-png.flaticon.com/256/2059/2059322.png";
          break;

        case "Snow":
          image.src = "https://cdn-icons-png.flaticon.com/256/1387/1387108.png";
          break;

        case "Clouds":
          image.src = "https://cdn-icons-png.flaticon.com/256/5797/5797064.png";
          break;

        case "Thunderstorm":
          image.src = "https://cdn-icons-png.flaticon.com/256/1714/1714817.png";
          break;

        case "Mist":
          image.src = "https://cdn-icons-png.flaticon.com/256/1762/1762580.png";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "500px";
    });
});