function spinme() {
  var image = document.getElementById("rotateImage");
  image.classList.remove("spin"); // Remove the 'spin' class
  image.classList.add("animated"); // Add the 'animated' class back

  image.style.transition = "none"; // Remove transition for immediate rotation
  image.style.transform = "rotate(180deg)"; // Apply slow rotation immediately

  // Apply fast rotation animation after a brief delay
  setTimeout(function () {
    image.style.animation = "rotate-fast 2s linear infinite"; // Apply fast rotation animation
  }, 1000); // 1 second delay

  // Play the sound after 1 second delay
  setTimeout(function () {
    var spinSound = document.getElementById("spinSound");
    spinSound.play();
  }, 1000); // 1 second delay
}

function spinRoulette() {
  spinme(); // Initiate the spinning animation
  let spinTimeout;
  // Set a timeout to show the modal after the spinning animation has completed (5 seconds)
  setTimeout(function () {
    getRecipeByRandom();
    $("#exampleModalCenter").modal("show"); // Show the modal
  }, 3000); // 5000 milliseconds = 5 seconds
}
