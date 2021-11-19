/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  let alertVisible = false;
  let composeVisible = false;

  // Use to prevent cross-site scripting
  const escape = function(puts) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(puts));
    return div.innerHTML;
  };
  
  const createTweetElement = (tweet) => {
    return `
      <article class="single-tweet">
        <header class="tweet-header">
          <div class="user">
            <img src=${escape(tweet.user.avatars)}>
            <span>${escape(tweet.user.name)}</span>
          </div>
          <span class="handle">${escape(tweet.user.handle)}</span>
        </header>
        <p class="show-tweet">${escape(tweet.content.text)}</p>
        <footer>
          <span class="days-since">${timeago.format(tweet.created_at)}</span>
          <div class="tweet-icons">
            <i class="fas fa-flag icon"></i>
            <i class="fas fa-retweet icon"></i>
            <i class="fas fa-heart icon"></i>
          </div>
        </footer>
      </article>
    `;
  };

  const renderTweets = (tweets) => {
    const container = $('#tweets-container');
    container.empty(); // Make sure the element with with id="tweets-container" has no text inside it
    for (let tweetData of tweets) {
      const $tweet = createTweetElement(tweetData);
      container.prepend($tweet); // To add it to the page by prepending it inside element with id="tweets-container"
    }
  };

  const loadTweets = () => {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: function(data) {
        renderTweets(data);
      },
      error: function(err) {
        console.log(err);
      }
    });
  };

  loadTweets();

  const asyncSubmit = () => {
    $('form').submit((event) => {
      event.preventDefault(); // To prevent the default form submission behaviour
    });
  
    $('#submit-tweet').on('click', function() {
      // Slide error message up before validating again
      if (alertVisible === true) {
        $('#alert-msg')
          .empty()
          .slideUp();
        alertVisible = false;
      }
      
      // Find the length of string in form textarea
      const len = $(this).parent().prev().val().length;
      if (len === 0 || len === null) {
        $('#alert-msg')
          .append('<i class="fas fa-skull-crossbones"></i> Red alert: Tweet content is empty! <i class="fas fa-skull-crossbones"></i>')
          .slideDown();
        alertVisible = true;
      } else if (140 - len < 0) {
        $('#alert-msg')
          .append('<i class="fas fa-skull-crossbones"></i> Red alert: Tweet content exceeds 140 characters! <i class="fas fa-skull-crossbones"></i>')
          .slideDown();
        alertVisible = true;
      } else {
        const str = $('form').serialize(); // Turns a set of form data into a query string
        $.ajax({
          method: 'POST',
          url: '/tweets',
          data: str,
          success: function(data) {
            console.log('Data returned: ', data);
            $('#tweet-text').val(''); // Successfully submitted messages are deleted from textarea
            $("#submit-tweet").next().text(140); // Update the counter to 140 since textarea is now empty
            loadTweets();
          },
          error: function(err) {
            console.log(err);
          }
        });
      }
    });
  };

  const createComposeTweet = `
    <h2>Compose Tweet</h2>
    <p id="alert-msg"></p>
    <form method="POST" action="/tweets/">
      <label for="tweet-text">What are you humming about?</label>
      <textarea name="text" id="tweet-text"></textarea>
      <div>
        <button id="submit-tweet" type="submit">Tweet</button>
        <output name="counter" class="counter" for="tweet-text">140</output>
      </div>
    </form>
  `;

  // To show or hide the compose tweet section
  $('#compose-tweet').on('click', function() {
    if (composeVisible === true) {
      $('.new-tweet')
        .slideUp()
        .empty();
      composeVisible = false;
    } else {
      $('.new-tweet')
        .append(createComposeTweet)
        .slideDown();
      $('#tweet-text').focus();
      composeVisible = true;
      // React to Tweet button being clicked
      asyncSubmit();
    }
  });
});