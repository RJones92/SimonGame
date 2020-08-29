var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

function nextSequence() {
  userClickedPattern = []; //empty the userClickedPattern so they have to click all buttons again
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log("gamePattern: " + gamePattern);
  //button animation & sound on a time delay
  setTimeout(function() {
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100); //button animation
    playSound(randomChosenColour); //Colour sound
  }, 1000);
  level++;
  $("h1#level-title").text("Level " + level);
}

//User clicks a button
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  console.log("userClickedPattern: " + userClickedPattern);
  checkAnswer(userClickedPattern.length - 1);
});

//Play sound
function playSound(name) {
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}

//Animate button press
function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

//Detect keyboard press to start game
$(document).keypress(function(event) {
  if (gameStarted == false) {
    nextSequence();
    gameStarted = true;
  }
});

//Check the users answers
function checkAnswer(currentLevel) {
  for (var i = 0; i < (currentLevel +1); i++) {
    if (userClickedPattern[i] == gamePattern[i]) {
      console.log("success");
      if (i == (gamePattern.length -1)) { //if the latest button clicked is the last
        setTimeout(nextSequence(), 1000);
      }
    } else if (userClickedPattern[i] != gamePattern[i]){
      wrongAnswer();
      startOver();
    } else {
      console.log("sequence not complete yet");
    }
  }
}

function wrongAnswer(){
  playSound("wrong"); // wrong sound
  //red background
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  console.log("wrong");
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
