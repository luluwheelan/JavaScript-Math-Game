// Select elements
const scoreEle = document.querySelector('#score');
const userEle = document.querySelector('#userName');
const monsterLevel = document.querySelector('#monsterLevel');
const start = document.querySelector('#start');
const question = document.querySelector('#question');
const feedback = document.querySelector('#feedback');
const inputAnswer = document.querySelector('#inputAnswer');
const rightAnswer = document.querySelector('#rightAnswer');
const skipQuestion = document.querySelector('#skipQuestion');
const submit = document.querySelector('#submit');
const save = document.querySelector('#save');

// Set variables
var score = 0;
var playing = false;
var user;

	
	//window.localStorage.getItem('user');


//click to start a game
start.onclick = function(){

	user = prompt("What is your name?");
	newGame = new MathGame();
	
	var savedItem = window.localStorage.getItem(user);
//If user has saved in the local storage, get all the infomation and diaplay
	if(savedItem != null){
		savedUser = JSON.parse(savedItem);
		userEle.textContent = savedUser.name;
		scoreEle.textContent = savedUser.leftScore;
		question.textContent = savedUser.leftQuestion;
	}else{
		userEle.textContent = user;

		newGame.Addition();
	}

	playing = true;
	// while(playing){
		
		

	//}

    submit.onclick = newGame.processGame;
   // feedback.textContent = Number(rightAnswer.value);

   
};


var MathGame = function(options = {}) {
	// this.score = 0;
	// this.playing = true;



};

MathGame.prototype.generateQuestion = function(){
	var allFuns = ['Addition','Subtraction','tMultiplication', 'Division'];
	var i = Math.floor(Math.random()*allFuns.length);

	allFuns[i]();

};
MathGame.prototype.Addition = function(){
	let num1 = Math.floor(Math.random() *100);
    let num2 = Math.floor(Math.random() *(100-num1));
    
 question.textContent =  num1 + " + " + num2 + " =";
 rightAnswer.value = (num1 + num2);

};

MathGame.prototype.Subtraction = function(){
	let num1 = Math.floor(Math.random() *100);
    let num2 = Math.floor(Math.random() *num1);
    
 question.textContent =  num1 + " - " + num2 + " =";
 rightAnswer.value = (num1 + num2);
};

MathGame.prototype.Multiplication = function(){
	let num1 = Math.floor(Math.random() *10+1);
    let num2 = Math.floor(Math.random() *10+1);
    
 question.textContent =  num1 + " * " + num2 + " =";
 rightAnswer.value = (num1 + num2);
};

MathGame.prototype.Division = function(){
	let num1 = Math.floor(Math.random() *10+1);
    let num2 = Math.floor(Math.random() *10+1);
    let answer = num1 * num2;
    
 question.textContent =  answer + " / " + num1 + " =";
 rightAnswer.value = num2;
};


MathGame.prototype.processGame = function(){

	if (evaluateAns()) {//if answer is right

		playing = true;
		score++;
		
		feedback.textContent = "You did great!";
		inputAnswer.value = "";

	}else{

		score--;
		feedback.textContent = "Try again or skip the question."
		//if(skipQuestion.onclick() -> this.Addition)
	}
	scoreEle.textContent = score;

};

//This emthod is checking if the answer is right
evaluateAns = function(){ 
	answer = Number(rightAnswer.value);
	return answer === Number(inputAnswer.value);
	
};


//click save and quit will save all the infomation to user local storage
save.onclick = function (){
  const savedUser = {
  name: user,
  leftScore: score,
  leftQuestion:question.textContent,
  }

localStorage.setItem(user,JSON.stringify(savedUser));
question.textContent = `Bye ${user}. See you next time!`;

};



