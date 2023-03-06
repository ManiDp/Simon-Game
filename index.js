var buttonColors = ["red" , "blue", "green","yellow"];
var gamePattern =[];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function(){
    if(level === 0){    
        gamePattern=[];
        userClickedPattern = [];
        nextSequence();
    } 
})

function nextSequence(){

    ++level;

    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4); 
    randomChosenColor = buttonColors[randomNumber];

    $("#"+buttonColors[randomNumber]).fadeOut(100).fadeIn(100);

    gamePattern.push(randomChosenColor);

    started = true;
       // Music

    playSound(randomChosenColor);

    userClickedPattern = [];
    
}


$(".btn").click(function(){

    if(started){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length -1 );

    }
})

function checkAnswer(index){


    if(gamePattern[index] !== userClickedPattern[index]) gameOver();

    ++index;

    if(started && gamePattern.length === index){
        started = false;
        setTimeout(function(){
            nextSequence();
        },1000);
    }

}

function gameOver(){
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    
    level = 0;
    started = false;

    setTimeout(function(){
        $("body").removeClass("game-over");
    },2000);


    playSound("wrong");

}

function playSound(name){
    var Sound = new Audio("sounds/"+name+".mp3");
    Sound.play();
}

function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
    
}

