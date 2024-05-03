
function searchRecipes() {
  var searchQuery = document.getElementById("searchQuery").value;
  var cuisineType = document.getElementById("cuisineType").value;
  var difficultyLevel = document.getElementById("difficultyLevel").value;
  var ingredients = document.getElementById("ingredients").value;
  var cookingTime = document.getElementById("cookingTime").value;
  var vegetarian = document.getElementById("vegetarian").checked;
  var glutenFree = document.getElementById("glutenFree").checked;

  var apiUrl = "https://api.spoonacular.com/recipes/complexSearch?";
  apiUrl += "query=" + encodeURIComponent(searchQuery);
  if (cuisineType) {
    apiUrl += "&cuisine=" + cuisineType;
  }
  if (difficultyLevel) {
    apiUrl += "&difficulty=" + difficultyLevel;
  }
  if (ingredients) {
    apiUrl += "&includeIngredients=" + encodeURIComponent(ingredients);
  }
  if (cookingTime) {
    apiUrl += "&maxReadyTime=" + cookingTime;
  }
  if (vegetarian) {
    apiUrl += "&diet=vegetarian";
  }
  if (glutenFree) {
    apiUrl += "&diet=glutenFree";
  }

  // Set the number of results to fetch
  apiUrl += "&number=3";

  // Replace YOUR_API_KEY with your actual Spoonacular API key
  apiUrl += "&apiKey=" + API_KEY;

  // Send fetch request
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Handle the response here
      displayResults(data.results);
      // Scroll to the div that shows the search results
      document.getElementById("resultContainer").scrollIntoView({
        behavior: "smooth",
      });
      console.log(data);
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
    });
}

function displayResults(results) {
  var resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = ""; // Clear previous results

  // Create a flex container for the row
  var rowContainer = document.createElement("div");
  rowContainer.classList.add("row");

  if (results.length === 0) {
    // If no results are found, display a message
    var messageElement = document.createElement("h4");
    messageElement.textContent = "No results found for your search.";
    resultContainer.appendChild(messageElement);
  } else {
    // Iterate through limited results and create HTML elements to display them
    results.forEach((recipe) => {
      var recipeElement = document.createElement("div");
      recipeElement.classList.add("recipe", "col-lg-4"); // Bootstrap column class

      var titleElement = document.createElement("h3");
      titleElement.textContent = recipe.title;

      var imageElement = document.createElement("img");
      imageElement.src = recipe.image;

      var summaryElement = document.createElement("p");
      summaryElement.textContent = recipe.summary;

      var button = document.createElement("button");
      button.textContent = "View More";
      button.classList.add("btn", "btn-primary", "mt-3");
      button.onclick = function () {
        viewInformation(recipe.id);
      };

      recipeElement.appendChild(titleElement);
      recipeElement.appendChild(imageElement);
      recipeElement.appendChild(summaryElement);
      recipeElement.appendChild(button);

      rowContainer.appendChild(recipeElement);
    });

    // Append the row container to the result container
    resultContainer.appendChild(rowContainer);
  }

  function viewInformation(recipeId) {
    console.log("Fetching recipe information for recipe ID:", recipeId);
    fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Recipe information fetched successfully:", data);
        // Once the data is fetched, display the recipe details
        displayRecipeDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching recipe data:", error);
      });
  }
}

function displayRecipeDetails(recipe) {
  const recipeDetailsDiv = document.getElementById("recipeDetails");
  recipeDetailsDiv.innerHTML = `
      <h2>${recipe.title}</h2>
      <img src="${recipe.image}" alt="Recipe Image">
      <p><strong>Servings:</strong> ${recipe.servings}</p>
      <p><strong>Ready in Minutes:</strong> ${recipe.readyInMinutes}</p>
      <p><strong>Health Score:</strong> ${recipe.healthScore}</p>
      <p><strong>Spoonacular Score:</strong> ${recipe.spoonacularScore}</p>
      <p><strong>Price Per Serving:</strong> $${recipe.pricePerServing}</p>
      <p><strong>License:</strong> ${recipe.license}</p>
      <p><strong>Source Name:</strong> ${recipe.sourceName}</p>
      <p><strong>Source URL:</strong> <a href="${
        recipe.sourceUrl
      }" target="_blank">${recipe.sourceUrl}</a></p>
      <p><strong>Spoonacular Source URL:</strong> <a href="${
        recipe.spoonacularSourceUrl
      }" target="_blank">${recipe.spoonacularSourceUrl}</a></p>
      <p><strong>Credits Text:</strong> ${recipe.creditsText}</p>
      <p><strong>Cuisines:</strong> ${
        recipe.cuisines ? recipe.cuisines.join(", ") : "N/A"
      }</p>
      <p><strong>Dish Types:</strong> ${
        recipe.dishTypes ? recipe.dishTypes.join(", ") : "N/A"
      }</p>
      <p><strong>Summary:</strong> ${recipe.summary}</p>
      <h3>Ingredients:</h3>
      <ul>
        ${recipe.extendedIngredients
          .map(
            (ingredient) =>
              `<li>${ingredient.amount} ${ingredient.unit} ${ingredient.name}</li>`
          )
          .join("")}
      </ul>
      <h3>Wine Pairing:</h3>
      <p>${recipe.winePairing.pairingText}</p>
    `;
}
