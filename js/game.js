var gamePattern = [];
var userClickedPattern = [];
var buttonColours =["red", "blue", "green", "yellow"];
var level = 0;

// Detect when any of the buttons are clicked
$('.btn').on('click', function(){
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  // console.log('user: '+userClickedPattern);
  // console.log('game: '+gamePattern);
  if(level==0){
    gameOver();
  } else if (JSON.stringify(gamePattern)==JSON.stringify(userClickedPattern)){
    setTimeout(()=>{nextSequence();}, 500);
  } else if (gamePattern[userClickedPattern.length-1]!=userChosenColour) {
    gameOver();
  }
});

// Detect when a keyboard key has been pressed and call nextSequence() when that happens for the first time.
$(document).on('keydown', function(e){
  if (level == 0){
    nextSequence();
  }
});

function nextSequence(){

  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern=[];

  // Increase the level by 1 every time nextSequence() is called.
  level+=1;

  // Update the h1 with this change in the value of level.
  $('#level-title').text('Level '+level);

  // Generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random()*4);

  // Use the randomNumber to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // Animate a flash to the button selected
  $('#'+randomChosenColour).fadeOut(120).fadeIn(120);
  playSound(randomChosenColour);
}

function playSound(name){
  new Audio('sounds/'+name+'.mp3').play();
}

function animatePress(currentColour){

  // Add the pressed class to the button that gets clicked Before deleting it after 100ms.
  $('.'+currentColour).addClass('pressed');
  setTimeout(()=>{$('.'+currentColour).removeClass('pressed');}, 100);
}

function gameOver(){
  level=0;
  gamePattern =[];
  new Audio('sounds/wrong.mp3').play();
  $('#level-title').text('Game Over, Press Any Key to Restart');
  $('body').addClass('game-over');
  setTimeout(()=>{$('body').removeClass('game-over');}, 200);
}
