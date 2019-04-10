// Select elements
const scoreEle = document.querySelector('#score');
const monsterLevel = document.querySelector('#monsterLevel');
const start = document.querySelector('#start');
const question = document.querySelector('#question');
const feedback = document.querySelector('#feedback');
const inputAnswer = document.querySelector('#inputAnswer');
const rightAnswer = document.querySelector('#rightAnswer');
const skipQuestion = document.querySelector('#skipQuestion');
const submit = document.querySelector('#submit');

// Set variables
var score = 0;
var playing = false;

//click to start a game
start.onclick = function(){
	playing = true;
     newGame = new MathGame();

    newGame.Addition();

    submit.onclick = newGame.processGame;
   // feedback.textContent = Number(rightAnswer.value);

   
}


var MathGame = function(options = {}) {
	// this.score = 0;
	// this.playing = true;



};

MathGame.prototype.generateQuestion = function(){
	var allFuns = ['Addition','Subtraction','tMultiplication', 'Division'];
	var i = Math.floor(Math.random()*allFuns.length);

	allFuns[i]();

}
MathGame.prototype.Addition = function(){
	let num1 = Math.floor(Math.random() *100);
    let num2 = Math.floor(Math.random() *(100-num1));
    
 question.textContent =  num1 + " + " + num2 + " =";
 rightAnswer.value = (num1 + num2);

}

MathGame.prototype.Subtraction = function(){
	let num1 = Math.floor(Math.random() *100);
    let num2 = Math.floor(Math.random() *num1);
    
 question.textContent =  num1 + " - " + num2 + " =";
 rightAnswer.value = (num1 + num2);
}

MathGame.prototype.Multiplication = function(){
	let num1 = Math.floor(Math.random() *10+1);
    let num2 = Math.floor(Math.random() *10+1);
    
 question.textContent =  num1 + " * " + num2 + " =";
 rightAnswer.value = (num1 + num2);
}

MathGame.prototype.Division = function(){
	let num1 = Math.floor(Math.random() *10+1);
    let num2 = Math.floor(Math.random() *10+1);
    let answer = num1 * num2;
    
 question.textContent =  answer + " / " + num1 + " =";
 rightAnswer.value = num2;
}


MathGame.prototype.processGame = function(){

	if (this.evaluateAns {//if answer is right

		playing = true;
		score++;
		feedback.textContent = "You did great!";

	}else{

		score--;
		feedback.textContent = "Try again or skip the queation."
		//if(skipQuestion.onclick() -> this.Addition)
	}
	scoreEle.textContent = score;

}

MathGame.prototype.evaluateAns = function(){ 
	answer = Number(rightAnswer.value);
	return answer === Number(inputAnswer.value);
}
