function shareToFacebook() {
  var recipeTitle = document.getElementById("mealTitle").innerText;
  var recipeUrl = document.getElementById("visitSiteBtnModal").href;
  var customMessage = "Check out this delicious recipe from White Panther!";

  // Log the values to the console for debugging
  console.log("Recipe Title:", recipeTitle);
  console.log("Recipe URL:", recipeUrl);
  console.log("Custom Message:", customMessage);

  // Open Facebook Share Dialog
  window.open(
    "https://www.facebook.com/sharer/sharer.php?u=" +
      encodeURIComponent(recipeUrl) +
      "&quote=" +
      encodeURIComponent(customMessage + "\n\n" + recipeTitle),
    "_blank"
  );
}
