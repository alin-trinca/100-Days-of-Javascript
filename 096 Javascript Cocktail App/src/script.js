const result = document.getElementById("result");
const searchBtn = document.getElementById("search__btn");
const apiUrl = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";

const displayError = (message) => {
  result.innerHTML = `<h3 class="error">${message}</h3>`;
};

const fetchCocktailData = async (cocktailName) => {
  try {
    if (!cocktailName) {
      throw new Error("The input field cannot be empty");
    }

    const response = await fetch(apiUrl + cocktailName);
    const data = await response.json();

    if (data.drinks && data.drinks.length > 0) {
      const drink = data.drinks[1];
      const ingredients = [];

      for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];

        if (ingredient && measure) {
          ingredients.push(`${measure} ${ingredient}`);
        }
      }

      result.innerHTML = `
                <div class="result__info">
                    <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                    <h1>${drink.strDrink}</h1>
                </div>
                <div class="result__wrapper">
                    <h3>Ingredients:</h3>
                    <ul class="ingredients">${ingredients
                      .map((item) => `<li>${item}</li>`)
                      .join("")}</ul>
                    <h3>Instructions:</h3>
                    <p>${drink.strInstructions}</p>
                </div>
            `;
    } else {
      throw new Error("No cocktail found with that name");
    }
  } catch (error) {
    displayError(error.message);
  }
};

const getInfo = () => {
  const userInput = document.getElementById("user-inp").value.trim();
  fetchCocktailData(userInput);
};

window.addEventListener("load", getInfo);
searchBtn.addEventListener("click", getInfo);
