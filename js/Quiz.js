class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    background("#c3e9fa");
    question.hide();
    question.title.hide();
    question.input1.hide();
    question.button.hide();
    question.input2.hide();
    question.option1.hide(); 
    question.option2.hide();
    question.option3.hide();
    question.option4.hide();

    push();
    textStyle(BOLD);
    textSize(35);
    fill("BLACK");
    text("RESULT OF THE QUIZ",230, 50 );
    pop();
    
    Contestant.getPlayerInfo();

    if(allContestants !== undefined){
      push();
      textStyle(BOLD);
      textSize(20);
      fill("BLACK");
      text("NOTE: Correct answers are highlighted in green colour", 150, 230);
      pop();
    }

    for(var plr in allContestants){
     var correctAnswer = "2";
     if(correctAnswer === allContestants[plr].answer){
        var correct = allContestants[plr].name;
        push()
        fill("#6fe657");
        textSize(20);
        textStyle(BOLD);
        text("The correct answer is given by: " + correct, 150, 260);
        console.log("Name 1: " + correct);
        text("The correct answer is: Option 2: Envelope", 200, 280);
        pop();
     }
     else if(correctAnswer !== allContestants[plr].answer){
        var notCorrect = allContestants[plr].name;
        fill("#e65c57");
        textSize(20);
        textStyle(BOLD);
        console.log("notCorrect: " + notCorrect);
        text("The answer given by " + notCorrect + " is wrong", 150, 300);
        text("The correct answer is: Option 2: Envelope", 150, 320);
     }
    }
  }
}
