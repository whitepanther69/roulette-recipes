function viewInformation(recipeId) {
  console.log("Fetching recipe information for recipe ID:", recipeId);
  fetch(
    `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=API_KEY`
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

// Function to display recipe details
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
      <p><strong>Cuisines:</strong> ${recipe.cuisines.join(", ")}</p>
      <p><strong>Dish Types:</strong> ${recipe.dishTypes.join(", ")}</p>
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


// Call viewInformation() function when the button is clicked
document.querySelectorAll(".similar-btn").forEach((item) => {
  item.addEventListener("click", (event) => {
    const recipeId = item.dataset.id;
    console.log("Button clicked. Recipe ID:", recipeId);
    viewInformation(recipeId);
  });
});
