// Ensure the DOM has loaded
$(document).ready(function() {
  console.log('DOM is ready!');

  // Check for character length only after Write a new tweet button is pressed
  $('#compose-tweet').on('click', function() {
    // Update character counter left when typing
    $("#tweet-text").keyup(function() {
      const count = 140 - $(this).val().length;
      $(this).next().children(".counter").text(count);
      if (count < 0) {
        $(this).next().children(".counter").addClass("exceed");
      } else {
        $(this).next().children(".counter").removeClass("exceed");
      }
    });
  });
});