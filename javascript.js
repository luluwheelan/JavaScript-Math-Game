
const scoreEle = document.querySelector('#score');
const question = document.querySelector('#question');
const answer = document.querySelector('#answer');
const rightAnswer = document.querySelector('#rightAnswer');
const hint = document.querySelector('#hint');

var score = 0;


function evaluateAnswer(){ // Begin evaluateGuess
  // a) Compare the guess to the current number. If the guess is correct, return true, otherwise return false.
    return rightAnswer === Number(answer.value);
  
}


function startAddition() {
    addition();
}

function startSubtraction() {
    subtraction();
}

function startMultiplication() {
    multiplication();
}

function startDivision() {
    division();
}


function addition() {
    let num1 = Math.floor(Math.random() *100);
    let num2 = Math.floor(Math.random() *(100-num1));
    
 question.textContent =  num1 + " + " + num2 + " =";
 rightAnswer.value = (num1 + num2);
}

function subtraction() {
    let num1 = Math.floor(Math.random() *100);
    let num2 = Math.floor(Math.random() *num1);
    
 question.textContent =  num1 + " - " + num2 + " =";
 rightAnswer.value = (num1 + num2);
}


function multiplication() {
    let num1 = Math.floor(Math.random() *10+1);
    let num2 = Math.floor(Math.random() *10+1);
    
 question.textContent =  num1 + " * " + num2 + " =";
 rightAnswer.value = (num1 + num2);
}

function division() {

    let num1 = Math.floor(Math.random() *10+1);
    let num2 = Math.floor(Math.random() *10+1);
    let answer = num1 * num2;
    
 question.textContent =  answer + " / " + num1 + " =";
 rightAnswer.value = num2;
}
