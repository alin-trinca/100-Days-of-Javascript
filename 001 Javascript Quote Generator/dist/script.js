const quoteWrapper = document.getElementById("quoteWrapper");
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const quoteButton = document.getElementById("quoteButton");
const loader = document.getElementById("loader");

let apiQuotes = [];

const showLoader = function () {
  loader.hidden = false;
  quoteWrapper.hidden = true;
};
const hideLoader = function () {
  loader.hidden = true;
  quoteWrapper.hidden = false;
};

const newQuote = function () {
  showLoader();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check Quote lenght
  if (quote.text.length > 80) {
    quoteText.classList.add("quote__text--long");
  } else {
    quoteText.classList.remove("quote__text--long");
  }

  // Check Author
  if (!quote.author) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = quote.author;
  }

  quoteText.textContent = quote.text;
  hideLoader();
};

// Get Quotes
const getQuotes = async function () {
  showLoader();
  const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    hideLoader();
    quoteText.textContent = "Nothing to show";
  }
};

// On Click
quoteButton.addEventListener("click", newQuote);

// On Load
getQuotes();