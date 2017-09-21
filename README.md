# matching-game
A classic matching game, otherwise known as memory. Open cards one at a time and try to find the matching image. 
When all the cards are matched, the game is **won**!

## Resources
- [Animate.css](https://github.com/daneden/animate.css) Animations are called by appending "animated (nameOfAnimation)" to the 
end of a class.
  - Example: 
  ```
  <div class = "className">No animation</div>
  <div class = "className animated (animationName)">With Animation</div>
  ```
  - [Sample animations](https://daneden.github.io/animate.css/)
- [Jquery](http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js) Used for DOM manipulations

## Installation
Clone the GitHub repository and use the `index.html` file to open the game.

## How To Play

Once the game is open the timer will start when the first card is flipped. A move is counted each time two cards are opened. 
If the cards match they will stay visible and turn green. If the cards do not match, they will flash red and flip back over. 
Stars are lost after a specific number of moves and aren't lost from time. The game is won when all cards are matched, you will then 
see a pop up with your final move count, time and stars. Try to get the fewest number of moves in the least amount of time to maximize 
your score.

## To Do List

* Top Scores
* More Exciting Win screen

