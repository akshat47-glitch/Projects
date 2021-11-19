
const buttonColors=["red","blue","green","yellow"];
let gamePattern=[];
let userClickedPattern=[];
let randomChosenColor;
let level=0;
let currentLevel=0;

$(document).keydown(()=>{
  if(level==0){
    setTimeout(nextSequence,1000);
    level=1;
  }
});

function nextSequence(event){
  // updating h1
  $("#level-title").text("level "+ level);
  level++;
  // random Number Selections
  let randomNumber=Math.floor(Math.random()*4);
  randomChosenColor = buttonColors[randomNumber];
  //actions
  animate(randomChosenColor);
  playAudio(randomChosenColor);
  gamePattern.push(randomChosenColor);
  //userReset
  userClickedPattern=[];
};

$(".btn").click(function(){
  let userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playAudio(userChosenColor);
  animate(userChosenColor);
  checkAnswer();
});

function checkAnswer(){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
      console.log("success");
      currentLevel++;
      if(userClickedPattern.length==gamePattern.length){
        currentLevel=0;
        setTimeout(nextSequence,1000);
      }
    }
  else{
    level=0;
    gamePattern=[];
    currentLevel=0;
    playAudio("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over. Press Any key to start");
    setTimeout(()=>{
      $("body").removeClass("game-over");
    },200);

  }

  //if i===gamepatterlength-1
}

function animate(chosenColor){
  $("#"+chosenColor).addClass("pressed");
  setTimeout(()=>{
    $("#"+chosenColor).removeClass("pressed");
  },100);
}

function playAudio(name){
  let audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
