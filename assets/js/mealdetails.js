function getMealDetails(id) {
  $.ajax({
    url:
      "https://api.spoonacular.com/recipes/" +
      id +
      "/information?apiKey=" +
      API_KEY,
    success: function (res) {
      // Set the title in the modal
      $(".modal-title").html(res.title);

      // Set other details (description, image, etc.)
      document.getElementById("mealDescription").innerHTML =
        "Ready in " +
        res.readyInMinutes +
        " minutes. <a href='" +
        res.sourceUrl +
        "'>Link to preparation</a>";
      document.getElementById("mealImage").src = res.image;

      // Attach load event listener to the image
      $("#mealImage").on("load", function () {
        $("#spinner-modal").addClass("visually-hidden"); // Hide spinner once image is loaded
      });

      // Set the href attribute of the "Link to Preparation" button
      document.getElementById("visitSiteBtnModal").href = res.sourceUrl;
    },
    complete: function () {
      $("#spinner-modal").addClass("visually-hidden"); // Hide spinner regardless of success or failure
    },
  });
}
