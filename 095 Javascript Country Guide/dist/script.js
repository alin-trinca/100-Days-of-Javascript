const searchBtn = document.getElementById("search__btn");
const countryInp = document.getElementById("country-inp");
const result = document.getElementById("result");

searchBtn.addEventListener("click", () => {
  const countryName = countryInp.value.trim();

  if (countryName.length === 0) {
    result.innerHTML = `<h2>The input field cannot be empty</h2>`;
    return;
  }

  const finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

  fetch(finalURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const countryData = data[0];
      result.innerHTML = `
        <div class="result__info">
          <img src="${countryData.flags.svg}" class="flag">
          <h1>${countryData.name.common}</h1>
        </div>

        <div class="result__wrapper">
          <div class="data">
            <h3>Capital:</h3>
            <span>${countryData.capital[0]}</span>
          </div>

          <div class="data">
            <h3>Continent:</h3>
            <span>${countryData.continents[0]}</span>
          </div>

          <div class="data">
            <h3>Population:</h3>
            <span>${countryData.population}</span>
          </div>

          <div class="data">
            <h3>Currency:</h3>
            <span>${
              countryData.currencies[Object.keys(countryData.currencies)[0]]
                .name
            } - ${Object.keys(countryData.currencies)[0]}</span>
          </div>

          <div class="data">
            <h3>Common Languages:</h3> <span>${Object.values(
              countryData.languages
            ).join(", ")}</span>
          </div>
        </div>
      `;
    })
    .catch((error) => {
      result.innerHTML = `<h2>Please enter a valid country name.</h2>`;
      console.error(error);
    });
});