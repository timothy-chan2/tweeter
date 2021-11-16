// Ensure the DOM has loaded
$(document).ready(function() {
  console.log('DOM is ready!');

  // // Reduce characters left when typing
  $("#tweet-text").keypress(function() {
    const count = 139 - $(this).val().length;
    $(this).next().children(".counter").text(count);
    if (count < 0) {
      $(this).next().children(".counter").addClass("exceed");
    } else {
      $(this).next().children(".counter").removeClass("exceed");
    }
  });

  // Add characters left when pressing backspace
  $("#tweet-text").keydown(function(event) {
    if (event.originalEvent.key === "Backspace") {
      if (141 - $(this).val().length <= 140) {
        const count = 141 - $(this).val().length;
        $(this).next().children(".counter").text(count);
        if (count > -1) {
          $(this).next().children(".counter").removeClass("exceed");
        }
      }
    }
  });
});