$(document).ready(function() { //Without this, we try to access HTML elements on the page that the browser didnt load yet
  console.log("Character Counter is Loaded and Ready");

  const textinput = document.getElementById("tweet-text"); //grab the input from the user by targeting the element. -> textarea <- Be specific, access it by its ID.

  //Notes to the bottom of the code on events - input, keyup, keypress, keydown, textarea
  textinput.addEventListener("input", function(event) {  
    //Remember that if you use an arrow function, the keyword this is not bound to that element. If we use a regular function, the keyword this will be bound to the element we clicked! console.log(this) for the arrow function vs the normal function and see

    const inputChars = $(this).val().length;
    const maxChars = 140;
    const remainingChars = maxChars - inputChars;

    //Why traverse the DOM instead of using the regular CSS element selector method??
    //^^Its way quicker when there are many levels in the DOM and its best practice
    let count = $(this).parent().children("div").children(".counter");
    count.text(remainingChars);  //assigning the result of remianingChars to show on the page

    if (remainingChars < 0) {
      count.addClass("redText");
    } else {
      count.removeClass("redText");
    }
  }, false);

  //Reset counter to 0 when the tweet button is clicked
  //Find button by its ID
  const btn = document.getElementById("submitBtn");
  //Add Listener for when btn is clicked
  btn.addEventListener("click", function(event){
    const maxChar = 140;
    //Find counter
    const newCount = $(this).parent().children(".counter");
    // Reset counter to 140 and remove red css color
    newCount.text(maxChar);
    newCount.removeClass("redText");
  })

});

