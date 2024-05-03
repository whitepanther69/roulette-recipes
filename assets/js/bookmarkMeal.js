// Function to toggle the bookmark status when the bookmark icon is clicked
function toggleBookmark(mealId) {
  // Check if the meal is already bookmarked
  var isBookmarked = isMealBookmarked(mealId);

  // Toggle the bookmark status
  if (isBookmarked) {
    removeBookmark(mealId);
  } else {
    bookmarkMeal(mealId);
  }

  // Update the bookmark icon
  updateBookmarkIcon(mealId);
}

// Function to bookmark a meal
function bookmarkMeal(mealId) {
  // Get the list of bookmarked meals from local storage
  var bookmarkedMeals =
    JSON.parse(localStorage.getItem("bookmarkedMeals")) || [];

  // Add the mealId to the list of bookmarked meals
  if (!bookmarkedMeals.includes(mealId)) {
    bookmarkedMeals.push(mealId);
    localStorage.setItem("bookmarkedMeals", JSON.stringify(bookmarkedMeals));
  }
}

// Function to remove a meal from bookmarks
function removeBookmark(mealId) {
  // Get the list of bookmarked meals from local storage
  var bookmarkedMeals =
    JSON.parse(localStorage.getItem("bookmarkedMeals")) || [];

  // Remove the mealId from the list of bookmarked meals
  var index = bookmarkedMeals.indexOf(mealId);
  if (index !== -1) {
    bookmarkedMeals.splice(index, 1);
    localStorage.setItem("bookmarkedMeals", JSON.stringify(bookmarkedMeals));
  }
}

// Function to check if a meal is bookmarked
function isMealBookmarked(mealId) {
  // Get the list of bookmarked meals from local storage
  var bookmarkedMeals =
    JSON.parse(localStorage.getItem("bookmarkedMeals")) || [];
  return bookmarkedMeals.includes(mealId);
}

// Function to update the bookmark icon based on the bookmark status
function updateBookmarkIcon(mealId) {
  var bookmarkIcon = document.getElementById("bookmarkIcon");

  // Check if the meal is bookmarked
  var isBookmarked = isMealBookmarked(mealId);

  // Update the bookmark icon based on the bookmark status
  if (isBookmarked) {
    bookmarkIcon.classList.add("bi-bookmark-fill");
    bookmarkIcon.classList.remove("bi-bookmark");
  } else {
    bookmarkIcon.classList.remove("bi-bookmark-fill");
    bookmarkIcon.classList.add("bi-bookmark");
  }
}
