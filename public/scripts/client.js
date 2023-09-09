/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  console.log("Client is Ready");


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
      ${(timeago.format(tweetInfo.created_at))}
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

  // renderTweets(tweetData);

  const $form = $(".tweet-form");
  $form.on("submit", function(event) {
    event.preventDefault();
    console.log("Tweet button was clicked");
    
    const $formData = $form.serialize(); // Serialize form data
    
    //Use the jQuery library to submit a POST request that sends the serialized data to the server
    $.ajax({
      url: "/tweets",
      method: 'POST',
      data: $formData
    })
    .then(function() {
      loadTweets();
    })
    .catch((error) => {
      console.log("formData function Error: ",error.message);
    })
    
  });

  //the loadTweets function performa a get request from the .tweets then gives it to .then,it then renders the data using the renderTweets function
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    })
      .then(function(tweets) {
        renderTweets(tweets);
        console.log(tweets,"loadtweets");
      })
      .catch((error) => {
        console.log("loadTweets function Error: ", error.message);
      });
  };
  loadTweets();



});