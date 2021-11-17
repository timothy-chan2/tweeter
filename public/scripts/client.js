/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const createTweetElement = (tweet) => {
    return `
      <article class="single-tweet">
        <header>
          <div class="user">
            <img src=${tweet.user.avatars}>
            <span>${tweet.user.name}</span>
          </div>
          <span class="handle">${tweet.user.handle}</span>
        </header>
        <p class="show-tweet">${tweet.content.text}</p>
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
      container.append($tweet); // to add it to the page by appending it inside element with id="tweets-container"
    }
  };

  renderTweets(data);
});