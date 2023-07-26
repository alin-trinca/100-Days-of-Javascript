const resultContainer = document.getElementById("result");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const searchContainer = document.querySelector(".search");

// Api url to fetch meal data
const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// Event listeners for search and input (when press enter)
searchBtn.addEventListener("click", searchMeal);
searchInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    searchMeal();
  }
});

// Handle meal function
function searchMeal() {
  const userInput = searchInput.value.trim();
  if (!userInput) {
    resultContainer.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
    return;
  }
  // Fetch meal data using api with user input
  fetch(apiUrl + userInput)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      // Handle where no meal found
      if (!meal) {
        resultContainer.innerHTML = `<h3>No Meal Found, Please Try Again!</h3>`;
        return;
      }
      const ingredients = getIngredients(meal);
      // Generate Html to display meal data
      const recipeHtml = `
            <div class="recipe">
              <div class="recipe__info">
                <h2>${meal.strMeal}</h2>
                <h4>${meal.strArea}</h4>
              </div>  
                <img src=${meal.strMealThumb} alt=${meal.strMeal} />
            
            <div class="recipe__ingredients">
                <h3>Ingredients:</h3>
                <ul>${ingredients}</ul>
            </div>
            
            <div id="recipe">
                <button id="hide-recipe">X</button>
                <div id="instructions">${meal.strInstructions}</div>
            </div>
            <button id="show-recipe">View Recipe</button></div>
        `;
      resultContainer.innerHTML = recipeHtml;

      const hideRecipeBtn = document.getElementById("hide-recipe");
      hideRecipeBtn.addEventListener("click", hideRecipe);
      const showRecipeBtn = document.getElementById("show-recipe");
      showRecipeBtn.addEventListener("click", showRecipe);
      searchContainer.style.opacity = "0";
      searchContainer.style.display = "none";
    })
    // Handle error
    .catch(() => {
      searchContainer.style.opacity = "1";
      searchContainer.style.display = "grid";
      resultContainer.innerHTML = `<h3>Error fetching data!</h3>`;
    });
}

// Generate html for list of ingredients
function getIngredients(meal) {
  let ingreHtml = "";
  // There can be maximum of 20 ingredients
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingreHtml += `<li>${measure} ${ingredient}</li>`;
    }
    // If ingredient doesn't exist, exit loop
    else {
      break;
    }
  }
  return ingreHtml;
}

// Handle show and hide recipe for a meal
function hideRecipe() {
  const recipe = document.getElementById("recipe");
  recipe.style.display = "none";
}
function showRecipe() {
  const recipe = document.getElementById("recipe");
  recipe.style.display = "block";
}
