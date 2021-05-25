var canvas, backgroundImage;

var gameState = 0;
var contestantCount;
var allContestants;
var answer;
var database;

var question, contestant, quiz;


function setup(){
  canvas = createCanvas(850,400);
  database = firebase.database();
  quiz = new Quiz();
  quiz.getState();
  quiz.start();
}


function draw(){
  background("#e4c8fa");
  if(contestantCount === 2){
    contestant.update();
    contestant.updateCount(2);
    quiz.update(1);
  }
  if(gameState === 1){
    clear();
    //noLoop();
    quiz.play();
  }
  console.log("Contestant Count: " + contestantCount);
}
