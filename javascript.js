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
const diffis = document.querySelector('#diffi');

// Set variables
var score = 0;
let playing = false;
var user ;
//let monsterMode = false;
let difficulty = 1;

//click to start a game
start.onclick = function() {

	user = prompt("What is your name? We will save your record by name. Or your record will not be saved.");
	if(user === null || user === ""){
		user = "Anonymous Monster";
	}

	newGame = new MathGame();

	newGame.getUser();
};

//MathGmae constructor
var MathGame = function() {
	 this.score = 0;
	 playing = true;

};
//This function generate a random equation
MathGame.prototype.generateQuestion = function(){
	var allFuns;	
	allFuns = [this.Addition,this.Subtraction,this.Multiplication, this.Division];
		
	var i = Math.floor(Math.random()*allFuns.length);
	allFuns[i]();

};
//This function is generate adding function
MathGame.prototype.Addition = function(){
	let num1 = Math.floor(Math.random() *100*difficulty);
    let num2 = Math.floor(Math.random() *(100*difficulty-num1));
    
 question.textContent =  num1 + " + " + num2 + " =";
 rightAnswer.value = (num1 + num2);

};
//This function is generate subtracting function
MathGame.prototype.Subtraction = function(){
	let num1 = Math.floor(Math.random() *100*difficulty);
    let num2 = Math.floor(Math.random() *num1*difficulty);
    
 question.textContent =  num1 + " - " + num2 + " =";
 rightAnswer.value = (num1 - num2);
};
//This function is generate multiplying function
MathGame.prototype.Multiplication = function(){
	let num1 = Math.floor(Math.random() *10*difficulty+1);
    let num2 = Math.floor(Math.random() *10*difficulty+1);
    
 question.textContent =  num1 + " x " + num2 + " =";
 rightAnswer.value = (num1 * num2);
};
//This function is generate divising function
MathGame.prototype.Division = function(){
	let num1 = Math.floor(Math.random() *10*difficulty+1);
    let num2 = Math.floor(Math.random() *10*difficulty+1);
    let answer = num1 * num2;
    
 question.textContent =  answer + " ÷ " + num1 + " =";
 rightAnswer.value = num2;
};


//This emthod is checking if the user input answer is correct
MathGame.prototype.evaluateAns = function(){ 
	answer = Number(rightAnswer.value);
	return answer === Number(inputAnswer.value);
	
};

//This function is generating the game cycle
MathGame.prototype.processGame = function(){

	if (this.evaluateAns()) {//if answer is right
		score += difficulty;
		
		feedback.textContent = "You did great!";
		this.generateQuestion();

	}
	else{
		score -= difficulty;
		feedback.textContent = "Answer is wrong. keep going for it!"
	}
	inputAnswer.value = "";
	scoreEle.textContent = score;
	

};

//This function gets user from local storage
MathGame.prototype.getUser = function() {
	var savedItem = window.localStorage.getItem(user);
//If user has saved in the local storage, get all the infomation and diaplay
	if(savedItem != null){
		savedUser = JSON.parse(savedItem);
		userEle.textContent = savedUser.name;
		scoreEle.textContent = savedUser.leftScore;
		score = Number(savedUser.leftScore);
		question.textContent = savedUser.leftQuestion;
		rightAnswer.value = savedUser.leftAnswer;

	}else{
		//if user not in the local storage, create a new user and generate a question
		userEle.textContent = user;
		this.generateQuestion();
	}

	playing = true; 
//Here is the trick part -- BIND. Big thanks goes for Shaun.
	skipQuestion.addEventListener('click', this.generateQuestion.bind(this));
    submit.addEventListener('click', this.processGame.bind(this));
    monster.addEventListener('click', this.getDiffi.bind(this));
    save.addEventListener('click', this.saveAndLeave.bind(this));

}


//click save and quit will save all the infomation to user local storage
//If a user did not type in a name at the prompt, user info will not be saved

MathGame.prototype.saveAndLeave = function (){
	if(playing  == false || user == "Anonymous Monster"){
		question.textContent = 'Bye... See you next time!';
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

//This function get the difficulty level from user input
MathGame.prototype.getDiffi = function(){
	if(playing == false || diffi.value == "" || diffi.value == null){
		return;
	}
	if(isNaN(Number(diffi.value))){
		feedback.textContent = "Warning: Please enter vaild number!";
		return;
	}
	difficulty = Number(diffi.value);
	this.generateQuestion();
	
}

//Enter key for submit a answer
inputAnswer.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    submit.click();
  }
});

//Space key for skip a question
inputAnswer.addEventListener("keyup", function(event) {
  // Number 32 is the "Spacer" key on the keyboard
  if (event.keyCode === 32) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    skipQuestion.click();
  }
});

//Enter key for submit difficulty level
diffis.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    monster.click();
  }
});