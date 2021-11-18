/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // Use to prevent cross-site scripting
  const escape = function (puts) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(puts));
    return div.innerHTML;
  };  
  
  const createTweetElement = (tweet) => {
    return `
      <article class="single-tweet">
        <header>
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
    const revTweets = tweets.reverse();
    const container = $('#tweets-container');
    container.empty(); // Make sure the element with with id="tweets-container" has no text inside it
    for (let tweetData of revTweets) {
      const $tweet = createTweetElement(tweetData);
      container.append($tweet); // to add it to the page by appending it inside element with id="tweets-container"
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

  $('form').submit((event) => {
    event.preventDefault(); // To prevent the default form submission behaviour
  });

  $('#submit-tweet').on('click', function() {
    const len = $(this).parent().prev().val().length;
    const val = $(this).parent().prev().val();
    if (len === 0 || len === null) {
      alert('Tweet content is not present!');
    } else if (140 - len < 0) {
      alert('Tweet content is too long!');
    } else {
      const str = $('form').serialize(); // Turns a set of form data into a query string
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: str,
        success: function(data) {
          console.log('Data returned: ', data);
          $('#tweet-text').val(''); // Successfully submitted messages are deleted from textarea
          loadTweets();
        },
        error: function(err) {
          console.log(err);
        }
      });
    }
  });
});