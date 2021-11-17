// Ensure the DOM has loaded
$(document).ready(function() {
  console.log('DOM is ready!');

  // // Reduce characters left when typing
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