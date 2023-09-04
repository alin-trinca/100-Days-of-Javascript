const apiUrl =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";
const form = document.querySelector(".form");
const input = document.querySelector(".form__input");
const results = document.querySelector(".results");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchValue = input.value;

  if (!searchValue) {
    displayError("Please enter a valid search term");
  } else {
    try {
      const data = await fetchPages(searchValue);
      if (data.query.search.length < 1) {
        displayError("No matching results. Please try again.");
      } else {
        renderResults(data.query.search);
      }
    } catch (error) {
      console.error(error);
      displayError("There was an error...");
    }
  }
});

const fetchPages = async (searchValue) => {
  results.innerHTML = `<div class="loading"></div>`;

  const response = await fetch(`${apiUrl}${searchValue}`);
  return await response.json();
};

const displayError = (message) => {
  results.innerHTML = `<div class='error'>${message}</div>`;
};

const renderResults = (list) => {
  const cardsList = list
    .map((item) => {
      const { title, snippet, pageid } = item;
      return `<a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
            <h4>${title}</h4>
            <p>
              ${snippet}
            </p>
          </a>`;
    })
    .join("");

  results.innerHTML = `<div class="articles">${cardsList}</div>`;
};