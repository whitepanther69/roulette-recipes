$(document).ready(function () {
  function fetchMealOfTheDay() {
    $.ajax({
      url:
        "https://api.spoonacular.com/recipes/random?apiKey=" +
        API_KEY +
        "&number=1",
      success: function (res) {
        var meal = res.recipes[0];
        // Set the title in the card
        $(".card-title").text(meal.title);

        // Set other details (description, image, etc.)
        $(".card-text").html("Ready in " + meal.readyInMinutes + " minutes.");
        $(".card-img-top").attr("src", meal.image);

        // Set the href attribute of the "Link to Preparation" button
        $("#visitSite").attr("href", meal.sourceUrl);
        $("#visitSite").text("Link to Preparation");
        $("#visitSite").removeClass("disabled");
        $("#visitSite").removeAttr("disabled");
      },
    });
  }

  // Initial call to fetch meal of the day
  fetchMealOfTheDay();
});

function shareToFacebook() {
  var url = window.location.href; // URL to share
  var shareUrl =
    "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
  window.open(shareUrl, "_blank");
}
