function getRecipeByRandom() {
  $("#rotateImage").removeClass("spin");

  $("#spinner-modal").removeClass("visually-hidden"); // Show spinner
  $.ajax({
    url:
      "https://api.spoonacular.com/recipes/random?apiKey=" +
      API_KEY +
      "&number=1",
    success: function (res) {
      var recipeId = res.recipes[0].id;
      getMealDetails(recipeId);
    },
  });
  // clearTimeout(spinTimeout);
}
