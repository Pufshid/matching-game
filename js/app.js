/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 /*These three variables set the initial sizes for the window and container,
 as well as the minimum sizes for the container*/
 var $window = $(window);
 var $container = $('.container')
 var minSize = {
   w: 750,
   h: 500
 }

 /*List of all cards*/
var originalDeck = $(".card").children();
/*Global interval variable to be used in the timer functions*/
var interval = null;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle( array ) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/*Creates a new set of cards using the shuffle function and the old deck as
inputs*/
function createDeck ( originalDeck ) {
  deckList = shuffle(originalDeck);
  return deckList
}

/*Creates list of new classes to replace the old deck's classes and return a new
list of classes*/
function newClass ( newDeck ) {
  var newList = []
  newDeck.each(function () {
    newList.push((this).className)
  })
  return newList
}

/*Creates a new board using the new deck as an inputs*/
function updateDeck ( newDeck ) {
  newClassList = newClass( newDeck )
  var x = 0;
  var oldDeck = $(".card").children()
  oldDeck.each(function() {
    $(this).attr("class",newClassList[x])
    x += 1
  })
}

/*Creates a new board of cards after taking the original array of cards*/
function fullReset ( originalDeck ) {
  newDeck = createDeck(originalDeck);
  resetBoard();
  updateDeck(newDeck);
  stopTimer();
  $(".seconds").text("00.0");
  $(".minutes").text("");
}

/*resets the stars, moves and cards to a new board*/
function resetBoard() {
  $(".card").attr("class","card");
  $(".card").removeAttr("style")
  $(".moves").text(0);
  $(".stars li i").attr("class","fa fa-star");
  $(".container").removeAttr("style");
};

/*Takes the clicked input to reveal that card if less than 2 cards are open and
returns the array of open cards*/
function openCards (input) {
   var openCards = $(".card.open.show");
   var maxOpen = 2;
   if (openCards.length < maxOpen) {
     input.attr("class","card open show")
     input.addClass("animated flipInY")
     return $(".card.open.show")
   } else {
     openCards.removeAttr('style')
     openCards.attr("class","card")
   }
};

/*Takes the array of open cards and checks if they are a match*/
function checkMatch ( array ) {
  if (array.length === 2) {
    moveCount()
    if (array.first().html() === array.last().html()) {
      $(".card.open.show").attr("class","card match")
      $(".card.match").addClass("animated flash")
    } else {
      $(".card.open.show").removeClass("animated flipInY")
      $(".card.open.show").addClass("animated shake")
      $(".card.open.show").css("background","red")
    }
  }
};

/*Counts the number of pairs the user has guessed*/
function moveCount () {
  var moves = parseInt($(".moves").text())
  moves += 1
  $(".moves").text(moves)
  stars( moves )
};

/* Takes the number of tries as an input and will remove a star at chosen
intervals*/
function stars ( number ) {
  var starList = $(".fa.fa-star");
  var firstStar = 12;
  var secondStar = 18;
  var thirdStar = 30;
  if (number === firstStar || number === secondStar || number === thirdStar){
    starList.last().attr("class","fa fa-star-o")
  }
};

/*Returns true if all cards are matched then stops the timer*/
function gameWon () {
  var matchedCards = $(".card.match").length;
  var totalCards = 16;
  if (matchedCards === totalCards) {
    stopTimer();
    return true
  }
};

/*Produces the win screen message taking the number of stars and moves*/
function winMessage () {
  $(".modal-content p").text("You used "+$(".moves").text()+
    " moves "+"in "+$(".minutes").text()+$(".seconds").text()+" and scored "+$(".fa.fa-star").length+" star(s).")
};

/*This function starts the timer in the score panel then updates the html to
show how long it's been running */
function startTimer (){
  var startTime = Date.now();
  var mins = 0
  var underTen = 10
  var minsSecond = 60
  interval = setInterval(function() {
      var elapsedTime = Date.now() - startTime;
      if (elapsedTime / 1000 < underTen) {
        $(".seconds").text("0"+(elapsedTime / 1000).toFixed(1));
      } else {
        $(".seconds").text((elapsedTime / 1000).toFixed(1));
      }
      if (elapsedTime / 1000 > minsSecond) {
        startTime = Date.now()
        mins += 1
        if (mins < underTen) {
          $(".minutes").text("0"+mins+":")
        } else {
          $(".minutes").text(mins+":")
        }
      }
  }, 100);
}

/*Stops the timer*/
function stopTimer(){
  clearInterval(interval);
}

/*Function used to find what scale to use then fits the page to window*/
function updateScale() {
  var winWidth = $window.width();
  var winHeight = $window.height();
  var newScale = 1;
  if (winWidth < minSize.w | winHeight < minSize.h){
    if (winWidth/winHeight < minSize.w/minSize.h) {
      newScale = winWidth / minSize.w;
    } else {
      newScale = winHeight / minSize.h;
    }
  }
  $(".container").css('transform','scale('+newScale+','+newScale+')');
  $(".container").center(false)
}

/*Creates a jquery function to auto re-center objects if false centers in the
window size, if true is inputed centers in the parent*/
jQuery.fn.center = function(parent) {
    if (parent) {
        parent = this.parent();
    } else {
        parent = window;
    }
    this.css({
        "position": "absolute",
        "top": ((($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + "px"),
        "left": ((($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + "px")
    });
return this;
}

/* When a card is clicked calls the other function to check for a match*/
$(".card").click(function() {
  if ($(".seconds").text() === "00.0") {
    startTimer()
  }
  if ($(this).attr("class") != "card match animated flash") {
    checkMatch(openCards($(this)))
  } if (gameWon()) {
    $("#myModal").css("display","block");
    $(".card").css("opacity","0");
    $("#myModal").css("z-index","1")
    winMessage();
  }
});

/*Closes the Win Screen*/
$(".close").click(function(){
  $("#myModal").css("display","none")
});

/*When the restart icon is pressed the game restarts*/
$(".restart").click(function() {
  fullReset(originalDeck);
  $("#myModal").css("display","none");
  $(".card").css("opacity","1");
});

/*Resets the game from the Win Screen*/
$("button").click(function(){
  $("#myModal").css("display","none");
  $(".card").css("opacity","1");
  fullReset(originalDeck);
});
/*When the window is resized, run the updateScale function*/
$(window).resize(updateScale)


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
