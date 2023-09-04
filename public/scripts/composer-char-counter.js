$(document).ready(function() { //Without this, we try to access HTML elements on the page that the browser didnt load yet
  console.log("Character Counter is Loaded and Ready");

  const textinput = document.getElementById("tweet-text"); //grab the input from the user by targeting the element. -> textarea <- Be specific, access it by its ID.

  //Notes below on events - input, keyup, keypress, keydown, textarea
  textinput.addEventListener("input", function(event) {  
    console.log('* this >>', this);
    console.log('this.val >>', this.val);  //NOTICE NO RESULT HERE!!! - why below
    console.log("_______________________")

    console.log('** $(this) >>', $(this));
    console.log('* $(this).val() >>', $(this).val()); //NOTICE RESULTS HERE!
    console.log("_______________________")

    //this vs $(this)
    //Both are the same. But when this keyword is used inside $(), then it becomes a jQuery object, and now we can use all properties of jQuery on this method.

    const inputChars = $(this).val().length;
    //Remember that if you use an arrow function, the keyword this is not bound to that element. If we use a regular function, the keyword this will be bound to the element we clicked! console.log(this) for the arrow function vs the normal function and see
    const maxChars = 140;
    const remainingChars = maxChars - inputChars;

    console.log('** Remaining Characters >>', remainingChars);

    //Why traverse the DOM instead of calling the element -> selector method?
    //its way quicker when there are many levels in the DOM and its best practice
    let count = $(this).parent().children("div").children(".counter");
    console.log("* Count >>", count);
    count.text(remainingChars);  //assigning the result of remianingChars to show on the page

    if (remainingChars < 0) {
      count.addClass("red");
    } else {
      count.removeClass("red");
    }

  }, false);
});


//EVENTS
//input - fires when the value of an <input> or a <textarea> changes (doesn’t fire for deleting in IE9). You can use keydown as a fallback in older browsers.

// keypress - fires when the user presses a key that results in printing a character on the screen. Will fire repeatedly if user holds down the key. This event will not fire for the 1.enter, 2.tab, or 3.arrow keys BUT THE KEYDOWN EVENT WOULD

//keyup - fires when the user releases a key on the keyboard.

//keydown - fires when the user presses ANY key in the keyboard. If the user holds down the key, this event fires repeatedly.


//blur - fires, for a specific DOM node, when an element loses focus.

//change - fires when the status of various form elements change. This is a better option than using the click event because clicking is not the only way users interact with the form.