/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  console.log("Client is Ready");

  const escape = function (str) {
    //creates a new HTML div element in memory
    let div = document.createElement("div");
    // creates a new text node containing the content of the str argument and appends it as a child node to the div element. 
    div.appendChild(document.createTextNode(str));
      // this line retrieves the HTML content of the div element
    //The HTML content will contain the escaped version of the input string, with any HTML special characters (such as <, >, &, etc.) converted to their respective HTML entity representations (e.g., &lt;, &gt;, &amp;).
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
    $(".tweets-container").html(""); //clear the entire HTML
    // loops through tweets
    for (let i = 0; i < tweets.length; i++) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweets[i]);
      // takes return value and appends it to the tweets container
      $('.tweets-container').prepend($tweet);
    }
  };

  function createTweetElement(tweetInfo) {
    /* Your code for creating the tweet element */
    let $tweet = $(`
  <div class="tweets">
    <article class="tweet-header"> 
      <div class="user">
        <img class="avatar-outline" src="${tweetInfo.user.avatars}" aria-hidden="true" style="height:4vh;"> 
        ${tweetInfo.user.name}
      </div>
      <div class="handle"> ${tweetInfo.user.handle}</div>
    </article>
    <article class="tweet-body"> ${escape(tweetInfo.content.text)} </article>
    <article class="tweet-footer"> 
      ${timeago.format(tweetInfo.created_at)}
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
    const $msg = $(".error-message");
    if ($form.children("textarea").val() === "") {
      $msg.text("❗⚡⚡🔥🔥🔥No text was entered🔥🔥🔥⚡⚡❗").slideDown(800);
      setTimeout(function() {
        $msg.slideUp(500);
      }, 5000);
    }
    if ($form.children("textarea").val().length > 140) {
      $msg.text("❗❗❗You have exceeded the maximum amount of characters❗❗❗").slideDown(800);
      setTimeout(function() {
        $msg.slideUp(500);
      }, 5000);
      //if > 140 return (stop)
      return;
    }

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
        console.log("formData function Error: ", error.message);
      });
  });

  //the loadTweets function performa a get request from the .tweets then gives it to .then,it then renders the data using the renderTweets function
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    })
      .then(function(tweets) {
        $form.children("textarea").val("");
        renderTweets(tweets);
        console.log(tweets, "loadtweets");
      })
      .catch((error) => {
        console.log("loadTweets function Error: ", error.message);
      });
  };

  loadTweets();



});