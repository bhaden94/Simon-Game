const BUTTON_COLORS = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var gameStarted = false;
var level = 0;

/*
function to handle the next level of the simon says game
picks a random color to add into sequence, then shows current sequence
*/
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = BUTTON_COLORS[randomNumber];

  level = ++level;
  $("#level-title").text("Level " + level);

  gamePattern.push(randomChosenColor);

  // shows full pattern of current gamePattern to player with a
  // 500 millisecond delay in between loops
  $.each(gamePattern, function(i, value) {
    setTimeout(function() {
      $("#" + value).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(value);
      animatePress(value);
    }, i * 500);
  });
  // resets the users pattern every level
  userClickedPattern = [];
}

/*
handles the users clicks.
We first get the color clicked and add it to the nextSequence.
When our clicked sequence is the same length as the current game nextSequence
then we check if the player was correct.
If they are correct then we continue onto the next sequence, if not then it
is game over.
*/
$(document).ready(function() {
$(".game-btn").click(function() {
    userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    if (userClickedPattern.length === gamePattern.length) {
      if (checkAnswer()) {
        setTimeout (function() {
          nextSequence();
        }, 1000);
      }
      else {
        gameOver();
      }
    }
});
});

/*
Plays the sound of the button chosen or clicked
*/
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/*
Animates the button chosen or clicked
*/
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

/*
Handles starting a new game with any keyboard press
*/
function start() {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
}

/*
Loops through the current game pattern and checks it against the players
patter. If the plkayer has all correct then we return true, otherwise
return false.
*/
function checkAnswer() {
  var isCorrect = true;
  $.each(gamePattern, function(i, value) {
    if (value !== userClickedPattern[i]) {
      isCorrect = false;
    }
  });
  return isCorrect;
}

/*
Handles game over state by flashing screen red and adding game Over
annotation.
*/
function gameOver() {
  $("body").addClass("game-over").delay(100).queue(function(){
    $(this).removeClass("game-over").dequeue();
  });
  $("h1").text("Game Over")
  restart();
}

/*
We use this function to start a new game after one or more have been played.
It resets values back to original states.
*/
function restart() {
  gameStarted = false;
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
}
