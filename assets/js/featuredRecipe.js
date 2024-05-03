// Function to fetch featured recipes from Spoonacular API
function fetchFeaturedRecipes() {
  // Replace 'YOUR_API_KEY' with your actual Spoonacular API key
  const apiKey = API_KEY;
  const numberOfRecipes = 3; // Number of featured recipes to display
  const baseUrl = "https://api.spoonacular.com/recipes/random";

  // Construct the API URL
  const apiUrl = `${baseUrl}?apiKey=${apiKey}&number=${numberOfRecipes}`;

  // Fetch data from Spoonacular API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Iterate through the fetched recipes and dynamically create HTML content
      data.recipes.forEach((recipe) => {
        const recipeHtml = `
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="card">
              <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
              <div class="card-body">
                <h5 class="card-title">${recipe.title}</h5>
                <div class="card-body">
  <h5 class="card-title">${recipe.title}</h5>
  <button class="btn btn-info btn-sm similar-btn" data-id="${recipe.id}" onclick="showSimilarRecipe(${recipe.id})">Similar</button>
    



  <a href="${recipe.sourceUrl}" class="btn btn-warning" target="_blank">View Recipe</a>
  <button type="button" class="btn btn-primary" onclick="shareRecipeToFacebook('${recipe.title}', '${recipe.sourceUrl}')"><i class="bi bi-facebook"></i>Share</button>
</div>

              </div>
            </div>
          </div>
        `;
        // Append the recipe HTML to the 'featuredRecipes' div
        document.getElementById("featuredRecipes").innerHTML += recipeHtml;
      });
    })
    .catch((error) => console.error("Error fetching recipes:", error));
}

{/* <button
  class="btn btn-info btn-sm similar-btn"
  data-id="${recipe.id}"
  onclick="viewInformation(${recipe.id})"
>
  View More
</button>; */}

// Function to share recipe to Facebook
function shareRecipeToFacebook(title, sourceUrl) {
  var customMessage = "Check out this delicious recipe from White Panther!";
  // Open Facebook Share Dialog
  window.open(
    "https://www.facebook.com/sharer/sharer.php?u=" +
      encodeURIComponent(sourceUrl) +
      "&quote=" +
      encodeURIComponent(customMessage + "\n\n" + title),
    "_blank"
  );
}

// Call the function to fetch featured recipes when the page loads
window.onload = fetchFeaturedRecipes;

