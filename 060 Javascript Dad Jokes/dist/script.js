const apiUrl = "https://icanhazdadjoke.com/";

const jokeBtn = document.querySelector(".joke__btn");
const jokeText = document.querySelector(".joke__text");

jokeBtn.addEventListener("click", fetchDadJoke);

async function fetchDadJoke() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent": "learning app"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch dad joke");
    }

    const data = await response.json();
    jokeText.textContent = data.joke;
  } catch (error) {
    console.error(error);
    jokeText.textContent = "Failed to fetch dad joke.";
  }
}

fetchDadJoke();