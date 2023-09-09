/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  console.log("Client is Ready");


  const tweetData = [
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
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = function(tweets) {
    // loops through tweets
    for (let i = 0; i < tweets.length; i++) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweets[i]);
      // takes return value and appends it to the tweets container
      $('.tweets-container').append($tweet);
    }
  };

  function createTweetElement(tweetInfo) {
    /* Your code for creating the tweet element */
    let $tweet = $(`
  <div class="tweets">
    <article class="tweet-header"> 
      <div class="user">
        <img class="avatar-outline" src="${(tweetInfo.user.avatars)}" aria-hidden="true" style="height:4vh;"> 
        ${(tweetInfo.user.name)}
      </div>
      <div class="handle"> ${(tweetInfo.user.handle)}</div>
    </article>
    <article class="tweet-body"> ${(tweetInfo.content.text)} </article>
    <article class="tweet-footer"> 
      10 days ago 
      <div class="tweet-footer-icons">
        <i class="fas fa-sharp fas fa-solid fas fa-flag"></i>
        <i class="fas fa-solid fas fa-retweet"></i>
        <i class="fas fa-sharp fas fa-solid fas fa-heart"></i>
      </div>
    </article>
  </div>
`);
    return $tweet;
  }

  renderTweets(tweetData);

  const $form = $(".tweet-form");
  $form.on("submit", function(event) {
    event.preventDefault();
    console.log("Tweet button was clicked");
    
    const $formData = $form.serialize(); // Serialize form data
    
    //Use the jQuery library to submit a POST request that sends the serialized data to the server
    $.ajax({
      url: "/tweets",
      type: 'POST',
      data: $formData
    })
    .then(function(tweets) {
      renderTweets(tweets);
    })
    .catch((error) => {
      console.log("formData function Error: ".error.message);
    })
    
  });



});