// Function to fetch similar recipe
function fetchSimilarRecipe(recipeId) {
  // Replace 'YOUR_API_KEY' with your actual Spoonacular API key
  const apiKey = API_KEY;
  const baseUrl = `https://api.spoonacular.com/recipes/${recipeId}/similar`;

  // Construct the API URL
  const apiUrl = `${baseUrl}?apiKey=${apiKey}&number=1`;

  // Fetch data from Spoonacular API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Check if similar recipes are found
      if (data && data.length > 0) {
          const similarRecipe = data[0]; // Get the first similar recipe
                    console.log(similarRecipe.image);
          console.log(similarRecipe.title);

        // Construct HTML content for the similar recipe
        const similarRecipeHtml = `
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="card">
              <img src="https://spoonacular.com/recipeImages/${similarRecipe.id}-556x370.${similarRecipe.imageType}" class="card-img-top" alt="${similarRecipe.title}">
              <div class="card-body">
                <h5 class="card-title">${similarRecipe.title}</h5>
                <a href="${similarRecipe.sourceUrl}" class="btn btn-warning" target="_blank">View Recipe</a>
                <button type="button" class="btn btn-primary" onclick="shareRecipeToFacebook('${similarRecipe.title}', '${similarRecipe.sourceUrl}')"><i class="bi bi-facebook"></i>Share</button>
              </div>
            </div>
          </div>
        `;
        // Replace the content of 'similarRecipeContainer' with the similar recipe HTML
        document.getElementById("similarRecipeContainer").innerHTML =
          similarRecipeHtml;
      } else {
        // If no similar recipes are found, display a message
        document.getElementById("similarRecipeContainer").innerHTML =
          "<p>No similar recipes found.</p>";
      }
    })
    .catch((error) => console.error("Error fetching similar recipe:", error));
}

// Function to handle click event for "Similar" button
function showSimilarRecipe(recipeId) {
  // Call fetchSimilarRecipe with the provided recipe ID
  fetchSimilarRecipe(recipeId);
}
