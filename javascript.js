// Select elements
//display current score
const scoreEle = document.querySelector('#score');
//display user name
const userEle = document.querySelector('#userName');
//This one not in use yet, if have time later, can improve this part
const monsterLevel = document.querySelector('#monsterLevel');
//start game button
const start = document.querySelector('#start');
//display question
const question = document.querySelector('#question');
//display feedback
const feedback = document.querySelector('#feedback');
//user input answer
const inputAnswer = document.querySelector('#inputAnswer');
//hidden right answer
const rightAnswer = document.querySelector('#rightAnswer');
//skip current queation button
const skipQuestion = document.querySelector('#skipQuestion');
//submit answer
const submit = document.querySelector('#submit');
//save and quit button
const save = document.querySelector('#save');
//mostermode button
const monster = document.querySelector('#monster');
//get difficulty
const diffi = document.querySelector('#diffi');

// Set variables
var score = 0;
let playing = false;
var user ;
let monsterMode = false;
let difficulty = 1;

//click to start a game
start.onclick = function(){

	user = prompt("What is your name?");
	if(user === null || user == ""){
		user = "anonymous";
	}
	newGame = new MathGame();
	
	var savedItem = window.localStorage.getItem(user);
//If user has saved in the local storage, get all the infomation and diaplay
	if(savedItem != null){
		savedUser = JSON.parse(savedItem);
		userEle.textContent = savedUser.name;
		scoreEle.textContent = savedUser.leftScore;
		score = Number(savedUser.leftScore)
		question.textContent = savedUser.leftQuestion;
		rightAnswer.value = savedUser.leftAnswer;

	}else{
		//if user not in the local storage, create a new user
		userEle.textContent = user;
		newGame.generateQuestion();
	}

	playing = true; 
	//newGame.processGame();

    submit.onclick = newGame.processGame;
   // feedback.textContent = Number(rightAnswer.value);

   
};


var MathGame = function(options = {}) {
	 this.score = 0;
	 playing = true;



};

MathGame.prototype.generateQuestion = function(){
	console.log("here");
	var allFuns;
	monsterMode ? allFuns = [newGame.MonAddition(),newGame.MonSubtraction(),newGame.MonMultiplication(), newGame.MonDivision()] : 
	allFuns = [newGame.Addition(),newGame.Subtraction(),newGame.Multiplication(), newGame.Division()];
		
	var i = Math.floor(Math.random()*allFuns.length);
    console.log(allFuns[i]);
	console.log(i);
	allFuns[i];

};
MathGame.prototype.Addition = function(){
	let num1 = Math.floor(Math.random() *100*difficulty);
    let num2 = Math.floor(Math.random() *(100*difficulty-num1));
    
 question.textContent =  num1 + " + " + num2 + " =";
 rightAnswer.value = (num1 + num2);

};

MathGame.prototype.Subtraction = function(){
	let num1 = Math.floor(Math.random() *100*difficulty);
    let num2 = Math.floor(Math.random() *num1*difficulty);
    
 question.textContent =  num1 + " - " + num2 + " =";
 rightAnswer.value = (num1 + num2);
};

MathGame.prototype.Multiplication = function(){
	let num1 = Math.floor(Math.random() *10*difficulty+1);
    let num2 = Math.floor(Math.random() *10*difficulty+1);
    
 question.textContent =  num1 + " * " + num2 + " =";
 rightAnswer.value = (num1 + num2);
};

MathGame.prototype.Division = function(){
	let num1 = Math.floor(Math.random() *10*difficulty+1);
    let num2 = Math.floor(Math.random() *10*difficulty+1);
    let answer = num1 * num2;
    
 question.textContent =  answer + " / " + num1 + " =";
 rightAnswer.value = num2;
};


MathGame.prototype.processGame = function(){

	if (evaluateAns()) {//if answer is right

		playing = true;
		score++;
		
		feedback.textContent = "You did great!";
		

	}else{

		score--;
		//feedback.textContent = "Try again or skip the question."
		feedback.textContent = "Answer is wrong. keep going for it!"
		//if(skipQuestion.onclick() -> this.Addition)
	}
	inputAnswer.value = "";
	scoreEle.textContent = score;
	newGame.generateQuestion();
	

};

//This emthod is checking if the answer is right
evaluateAns = function(){ 
	answer = Number(rightAnswer.value);
	return answer === Number(inputAnswer.value);
	
};

//click for skip current question
skipQuestion.onclick = function(){ 
	if(playing == true){
		newGame.generateQuestion();
	}
	
}
//click save and quit will save all the infomation to user local storage
//If a user did not type in name at the prompt, the user name will be null
//This part need improvement if we can time later on
save.onclick = function (){
	if(playing  == false || user == "anonymous"){
		return;
	}
  const savedUser = {
  name: user,
  leftScore: score,
  leftQuestion:question.textContent,
  leftAnswer: rightAnswer.value,
  }

localStorage.setItem(user,JSON.stringify(savedUser));
question.textContent = `Bye ${user}. See you next time!`;

};

monster.onclick = function(){
	if(playing == false || diffi.value == "" || diffi.value == null){
		return;
	}
	if(isNaN(Number(diffi.value))){
		console.log(Number(diffi.value));
		feedback.textContent = "Warning: Please enter vaild number!";
		return;
	}
	difficulty = Number(diffi.value);
	newGame.generateQuestion();
	
}
